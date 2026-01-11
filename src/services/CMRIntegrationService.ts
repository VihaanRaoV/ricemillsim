import { CMRDeliveryService, CMRDelivery } from './CMRDeliveryService';
import { ACKProductionService } from './ACKProductionService';
import { LorryFreightService } from './LorryFreightService';
import type { ACKProduction, LorryFreight } from '../types';

interface CMRImportData {
  ackNumber: string;
  dispatchDate: string;
  vehicleNumber: string;
  netRiceQty: number;
  frkQty: number;
  gateInDate: string | null;
  dumpingDate: string | null;
}

interface ImportResult {
  success: boolean;
  created: {
    cmrDelivery?: CMRDelivery;
    ackProduction?: ACKProduction;
    lorryFreight?: LorryFreight;
  };
  skipped?: {
    reason: string;
  };
  error?: string;
}

export class CMRIntegrationService {
  private cmrDeliveryService: CMRDeliveryService;
  private ackProductionService: ACKProductionService;
  private lorryFreightService: LorryFreightService;

  constructor() {
    this.cmrDeliveryService = new CMRDeliveryService();
    this.ackProductionService = new ACKProductionService();
    this.lorryFreightService = new LorryFreightService();
  }

  async importCMRDeliveryWithIntegration(
    data: CMRImportData,
    options: {
      season?: string;
      destination?: 'fci' | 'central' | 'state';
      variety?: 'raw' | 'boiled';
      standardQuantityQtls?: number;
      freightRate?: number;
      skipIfExists?: boolean;
    } = {}
  ): Promise<ImportResult> {
    try {
      const {
        season = 'Rabi 24-25',
        destination = 'fci',
        variety = 'raw',
        standardQuantityQtls = 290,
        freightRate = 40,
        skipIfExists = true
      } = options;

      if (skipIfExists) {
        const existingACK = await this.ackProductionService.getByACKNumber(data.ackNumber);
        if (existingACK) {
          return {
            success: false,
            created: {},
            skipped: {
              reason: `ACK ${data.ackNumber} already exists`
            }
          };
        }
      }

      const paddyConsumed = (data.netRiceQty + data.frkQty) / 0.67;
      const gateInStatus = data.gateInDate ? true : false;
      const dumpingStatus = data.dumpingDate ? 'completed' : 'pending_ds';

      const cmrDelivery = await this.cmrDeliveryService.addDelivery({
        ack_number: data.ackNumber,
        delivery_date: data.dispatchDate,
        destination_pool: destination,
        variety: variety,
        cmr_quantity_qtls: standardQuantityQtls,
        paddy_consumed_qtls: Number(paddyConsumed.toFixed(2)),
        vehicle_number: data.vehicleNumber,
        driver_name: '',
        delivery_status: 'delivered',
        gate_in_status: gateInStatus,
        gate_in_date: data.gateInDate || null,
        dumping_status: dumpingStatus as CMRDelivery['dumping_status'],
        season: season,
        notes: `Net Rice: ${data.netRiceQty} Qtls, FRK: ${data.frkQty} Qtls`,
      });

      const ackProduction = await this.ackProductionService.create({
        ack_number: data.ackNumber,
        production_date: data.dispatchDate,
        rice_type: variety,
        fortified_rice_qty: standardQuantityQtls,
        raw_rice_qty: data.netRiceQty,
        frk_qty: data.frkQty,
        season: season,
        notes: `Auto-imported from CMR delivery ${data.ackNumber}`,
      });

      const totalFreight = standardQuantityQtls * freightRate;
      const lorryFreight = await this.lorryFreightService.createFreightEntry({
        ack_number: data.ackNumber,
        delivery_date: data.dispatchDate,
        vehicle_number: data.vehicleNumber,
        transporter_name: 'FCI Transport',
        quantity_qtls: standardQuantityQtls,
        freight_rate: freightRate,
        total_freight: totalFreight,
        advance_paid: 0,
        balance_due: totalFreight,
        payment_status: 'pending',
        destination: destination.toUpperCase(),
        season: season,
        notes: `Auto-populated from CMR ACK ${data.ackNumber}`,
      });

      return {
        success: true,
        created: {
          cmrDelivery,
          ackProduction,
          lorryFreight
        }
      };
    } catch (error: any) {
      console.error('Error importing CMR delivery with integration:', error);
      return {
        success: false,
        created: {},
        error: error.message || 'Unknown error occurred'
      };
    }
  }

  async bulkImportCMRDeliveries(
    deliveries: CMRImportData[],
    options: Parameters<typeof this.importCMRDeliveryWithIntegration>[1] = {},
    onProgress?: (current: number, total: number, ackNumber: string) => void
  ): Promise<{
    totalProcessed: number;
    successful: number;
    skipped: number;
    failed: number;
    results: ImportResult[];
  }> {
    const results: ImportResult[] = [];
    let successful = 0;
    let skipped = 0;
    let failed = 0;

    for (let i = 0; i < deliveries.length; i++) {
      const delivery = deliveries[i];

      if (onProgress) {
        onProgress(i + 1, deliveries.length, delivery.ackNumber);
      }

      const result = await this.importCMRDeliveryWithIntegration(delivery, options);
      results.push(result);

      if (result.success) {
        successful++;
      } else if (result.skipped) {
        skipped++;
      } else {
        failed++;
      }

      await new Promise(resolve => setTimeout(resolve, 50));
    }

    return {
      totalProcessed: deliveries.length,
      successful,
      skipped,
      failed,
      results
    };
  }

  async syncACKProductionToFreight(ackNumber: string): Promise<boolean> {
    try {
      const ackProduction = await this.ackProductionService.getByACKNumber(ackNumber);
      if (!ackProduction) {
        throw new Error(`ACK Production record not found for ${ackNumber}`);
      }

      const freightRate = 40;
      const standardQty = 290;
      const totalFreight = standardQty * freightRate;

      await this.lorryFreightService.createFreightEntry({
        ack_number: ackNumber,
        delivery_date: ackProduction.production_date,
        vehicle_number: 'TBD',
        transporter_name: 'FCI Transport',
        quantity_qtls: standardQty,
        freight_rate: freightRate,
        total_freight: totalFreight,
        advance_paid: 0,
        balance_due: totalFreight,
        payment_status: 'pending',
        destination: 'FCI',
        season: ackProduction.season || 'Rabi 24-25',
        notes: `Synced from ACK Production ${ackNumber}`,
      });

      return true;
    } catch (error) {
      console.error('Error syncing ACK production to freight:', error);
      return false;
    }
  }

  async getIntegratedACKData(ackNumber: string): Promise<{
    cmrDelivery: CMRDelivery | null;
    ackProduction: ACKProduction | null;
    lorryFreight: LorryFreight | null;
  }> {
    try {
      const userId = await this.cmrDeliveryService['getUserId']();

      const cmrDeliveryResult = await this.cmrDeliveryService['supabase']
        .from('cmr_deliveries')
        .select('*')
        .eq('user_id', userId)
        .eq('ack_number', ackNumber)
        .maybeSingle();

      const ackProduction = await this.ackProductionService.getByACKNumber(ackNumber);

      const lorryFreightResult = await this.lorryFreightService['supabase']
        .from('lorry_freight')
        .select('*')
        .eq('user_id', userId)
        .eq('ack_number', ackNumber)
        .maybeSingle();

      return {
        cmrDelivery: cmrDeliveryResult.data,
        ackProduction,
        lorryFreight: lorryFreightResult.data
      };
    } catch (error) {
      console.error('Error getting integrated ACK data:', error);
      return {
        cmrDelivery: null,
        ackProduction: null,
        lorryFreight: null
      };
    }
  }
}
