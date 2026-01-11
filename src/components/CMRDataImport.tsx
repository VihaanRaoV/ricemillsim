import { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { CMRIntegrationService } from '../services/CMRIntegrationService';

const integrationService = new CMRIntegrationService();

const CMR_DELIVERIES = [
  { ackNumber: 'R 24-25/522898', dispatchDate: '2025-06-05', vehicleNumber: 'AP29TB8258', netRiceQty: 285.22163, frkQty: 2.86669, gateInDate: '2025-06-06', dumpingDate: '2025-06-07' },
  { ackNumber: 'R 24-25/523849', dispatchDate: '2025-06-06', vehicleNumber: 'AP28TE3355', netRiceQty: 286.28086, frkQty: 2.8657, gateInDate: '2025-06-06', dumpingDate: '2025-06-09' },
  { ackNumber: 'R 24-25/525002', dispatchDate: '2025-06-08', vehicleNumber: 'AP29V7825', netRiceQty: 285.01812, frkQty: 2.86174, gateInDate: '2025-06-09', dumpingDate: '2025-06-09' },
  { ackNumber: 'R 24-25/525655', dispatchDate: '2025-06-08', vehicleNumber: 'AP29TA9149', netRiceQty: 286.47129, frkQty: 2.86471, gateInDate: '2025-06-11', dumpingDate: '2025-06-11' },
  { ackNumber: 'R 24-25/527088', dispatchDate: '2025-06-10', vehicleNumber: 'AP29TB8258', netRiceQty: 286.76832, frkQty: 2.86768, gateInDate: '2025-06-12', dumpingDate: '2025-06-13' },
  { ackNumber: 'R 24-25/527813', dispatchDate: '2025-06-11', vehicleNumber: 'AP29TA9149', netRiceQty: 286.27327, frkQty: 2.86273, gateInDate: '2025-06-13', dumpingDate: '2025-06-16' },
  { ackNumber: 'R 24-25/528728', dispatchDate: '2025-06-12', vehicleNumber: 'AP29TB8258', netRiceQty: 286.17426, frkQty: 2.86174, gateInDate: '2025-06-13', dumpingDate: '2025-06-13' },
  { ackNumber: 'R 24-25/536789', dispatchDate: '2025-06-20', vehicleNumber: 'AP29TB8258', netRiceQty: 285.97624, frkQty: 2.85976, gateInDate: '2025-06-21', dumpingDate: '2025-06-23' },
  { ackNumber: 'R 24-25/538577', dispatchDate: '2025-06-22', vehicleNumber: 'AP29TB8258', netRiceQty: 286.07525, frkQty: 2.86075, gateInDate: '2025-06-23', dumpingDate: '2025-06-25' },
  { ackNumber: 'R 24-25/539294', dispatchDate: '2025-06-22', vehicleNumber: 'TS08UG6466', netRiceQty: 285.59619, frkQty: 2.86174, gateInDate: '2025-06-23', dumpingDate: '2025-06-25' },
  { ackNumber: 'R 24-25/541428', dispatchDate: '2025-06-24', vehicleNumber: 'AP29TB8258', netRiceQty: 285.58849, frkQty: 2.85877, gateInDate: '2025-06-26', dumpingDate: '2025-06-27' },
  { ackNumber: 'R 24-25/542779', dispatchDate: '2025-06-25', vehicleNumber: 'TS08UG6466', netRiceQty: 285.8007, frkQty: 2.86669, gateInDate: '2025-06-26', dumpingDate: '2025-06-27' },
  { ackNumber: 'R 24-25/543206', dispatchDate: '2025-06-26', vehicleNumber: 'AP29TB8258', netRiceQty: 286.27327, frkQty: 2.86273, gateInDate: '2025-06-28', dumpingDate: '2025-06-28' },
  { ackNumber: 'R 24-25/544322', dispatchDate: '2025-06-27', vehicleNumber: 'TS08UG6466', netRiceQty: 285.97624, frkQty: 2.85976, gateInDate: '2025-06-28', dumpingDate: '2025-06-28' },
  { ackNumber: 'R 24-25/544952', dispatchDate: '2025-06-27', vehicleNumber: 'TS08UG6466', netRiceQty: 285.97624, frkQty: 2.85976, gateInDate: '2025-06-29', dumpingDate: '2025-06-30' },
  { ackNumber: 'R 24-25/545437', dispatchDate: '2025-06-27', vehicleNumber: 'AP28TE3355', netRiceQty: 285.87723, frkQty: 2.85877, gateInDate: '2025-06-28', dumpingDate: '2025-06-30' },
  { ackNumber: 'R 24-25/547241', dispatchDate: '2025-06-29', vehicleNumber: 'AP29V7825', netRiceQty: 286.17426, frkQty: 2.86174, gateInDate: '2025-07-03', dumpingDate: '2025-07-03' },
  { ackNumber: 'R 24-25/548672', dispatchDate: '2025-07-01', vehicleNumber: 'TS36T6847', netRiceQty: 286.07525, frkQty: 2.86075, gateInDate: '2025-07-03', dumpingDate: '2025-07-03' },
  { ackNumber: 'R 24-25/549673', dispatchDate: '2025-07-02', vehicleNumber: 'AP29V7825', netRiceQty: 285.77822, frkQty: 2.85778, gateInDate: '2025-07-03', dumpingDate: '2025-07-04' },
  { ackNumber: 'R 24-25/550134', dispatchDate: '2025-07-03', vehicleNumber: 'AP28TE3355', netRiceQty: 287.06535, frkQty: 2.87065, gateInDate: '2025-07-04', dumpingDate: '2025-07-05' },
  { ackNumber: 'R 24-25/550889', dispatchDate: '2025-07-03', vehicleNumber: 'TS08UG6466', netRiceQty: 286.5703, frkQty: 2.8657, gateInDate: '2025-07-04', dumpingDate: '2025-07-05' },
  { ackNumber: 'R 24-25/551429', dispatchDate: '2025-07-04', vehicleNumber: 'AP29TB8258', netRiceQty: 285.97624, frkQty: 2.85976, gateInDate: '2025-07-06', dumpingDate: '2025-07-07' },
  { ackNumber: 'R 24-25/553104', dispatchDate: '2025-07-05', vehicleNumber: 'AP29TB8258', netRiceQty: 286.96634, frkQty: 2.86966, gateInDate: '2025-07-07', dumpingDate: '2025-07-08' },
  { ackNumber: 'R 24-25/554130', dispatchDate: '2025-07-06', vehicleNumber: 'AP29V7825', netRiceQty: 286.27327, frkQty: 2.86273, gateInDate: '2025-07-07', dumpingDate: '2025-07-08' },
  { ackNumber: 'R 24-25/554691', dispatchDate: '2025-07-07', vehicleNumber: 'AP28TE3355', netRiceQty: 285.87723, frkQty: 2.85877, gateInDate: '2025-07-08', dumpingDate: '2025-07-09' },
  { ackNumber: 'R 24-25/555580', dispatchDate: '2025-07-08', vehicleNumber: 'AP29V7825', netRiceQty: 286.66931, frkQty: 2.86669, gateInDate: '2025-07-08', dumpingDate: '2025-07-09' },
  { ackNumber: 'R 24-25/556352', dispatchDate: '2025-07-08', vehicleNumber: 'AP28TE3355', netRiceQty: 286.07525, frkQty: 2.86075, gateInDate: '2025-07-09', dumpingDate: '2025-07-10' },
  { ackNumber: 'R 24-25/557753', dispatchDate: '2025-07-09', vehicleNumber: 'AP29V7825', netRiceQty: 286.07525, frkQty: 2.86075, gateInDate: '2025-07-11', dumpingDate: '2025-07-14' },
  { ackNumber: 'R 24-25/558820', dispatchDate: '2025-07-10', vehicleNumber: 'AP28TE3355', netRiceQty: 286.5703, frkQty: 2.8657, gateInDate: '2025-07-11', dumpingDate: '2025-07-14' },
  { ackNumber: 'R 24-25/800113', dispatchDate: '2025-07-11', vehicleNumber: 'AP29V7825', netRiceQty: 286.27327, frkQty: 2.86273, gateInDate: '2025-07-12', dumpingDate: '2025-07-14' },
  { ackNumber: 'R 24-25/801230', dispatchDate: '2025-07-13', vehicleNumber: 'AP28TE3355', netRiceQty: 283.86197, frkQty: 2.86174, gateInDate: '2025-07-14', dumpingDate: '2025-07-15' },
  { ackNumber: 'R 24-25/801862', dispatchDate: '2025-07-13', vehicleNumber: 'AP29TB8258', netRiceQty: 286.28086, frkQty: 2.8657, gateInDate: '2025-07-14', dumpingDate: '2025-07-15' },
  { ackNumber: 'R 24-25/802130', dispatchDate: '2025-07-13', vehicleNumber: 'TS08UG6466', netRiceQty: 285.51117, frkQty: 2.86669, gateInDate: '2025-07-14', dumpingDate: '2025-07-15' },
  { ackNumber: 'R 24-25/808164', dispatchDate: '2025-07-19', vehicleNumber: 'AP28TE3355', netRiceQty: 286.09024, frkQty: 2.86669, gateInDate: '2025-07-22', dumpingDate: '2025-07-22' },
  { ackNumber: 'R 24-25/812165', dispatchDate: '2025-07-23', vehicleNumber: 'AP29TB8258', netRiceQty: 286.66931, frkQty: 2.86669, gateInDate: '2025-07-25', dumpingDate: '2025-07-26' },
  { ackNumber: 'R 24-25/813744', dispatchDate: '2025-07-24', vehicleNumber: 'TS08UG6466', netRiceQty: 284.73527, frkQty: 2.86471, gateInDate: '2025-07-25', dumpingDate: '2025-07-26' },
  { ackNumber: 'R 24-25/814625', dispatchDate: '2025-07-25', vehicleNumber: 'TS08UG6466', netRiceQty: 286.07525, frkQty: 2.86075, gateInDate: '2025-07-28', dumpingDate: '2025-07-30' },
  { ackNumber: 'R 24-25/815662', dispatchDate: '2025-07-27', vehicleNumber: 'AP29TB8258', netRiceQty: 285.97624, frkQty: 2.85976, gateInDate: '2025-07-28', dumpingDate: '2025-07-30' },
  { ackNumber: 'R 24-25/816604', dispatchDate: '2025-07-28', vehicleNumber: 'AP29V7825', netRiceQty: 285.87723, frkQty: 2.85877, gateInDate: '2025-07-30', dumpingDate: '2025-07-30' },
  { ackNumber: 'R 24-25/817310', dispatchDate: '2025-07-29', vehicleNumber: 'AP29TA9149', netRiceQty: 286.07525, frkQty: 2.86075, gateInDate: '2025-07-31', dumpingDate: '2025-07-31' },
  { ackNumber: 'R 24-25/818196', dispatchDate: '2025-07-30', vehicleNumber: 'AP29V7825', netRiceQty: 285.01812, frkQty: 2.86174, gateInDate: '2025-07-31', dumpingDate: '2025-08-01' },
  { ackNumber: 'R 24-25/819540', dispatchDate: '2025-07-31', vehicleNumber: 'AP29V7825', netRiceQty: 285.49738, frkQty: 2.86075, gateInDate: '2025-08-01', dumpingDate: '2025-08-06' },
  { ackNumber: 'R 24-25/820720', dispatchDate: '2025-08-01', vehicleNumber: 'AP29V7825', netRiceQty: 285.79381, frkQty: 2.86372, gateInDate: '2025-08-04', dumpingDate: '2025-08-04' },
  { ackNumber: 'R 24-25/821612', dispatchDate: '2025-08-03', vehicleNumber: 'AP29V7825', netRiceQty: 286.5703, frkQty: 2.8657, gateInDate: '2025-08-05', dumpingDate: '2025-08-06' },
  { ackNumber: 'R 24-25/836884', dispatchDate: '2025-08-22', vehicleNumber: 'AP29TB8258', netRiceQty: 286.27327, frkQty: 2.86273, gateInDate: '2025-08-23', dumpingDate: '2025-08-25' },
  { ackNumber: 'R 24-25/838321', dispatchDate: '2025-08-24', vehicleNumber: 'AP29TB8258', netRiceQty: 285.97624, frkQty: 2.85976, gateInDate: '2025-08-25', dumpingDate: '2025-08-26' },
  { ackNumber: 'R 24-25/838820', dispatchDate: '2025-08-24', vehicleNumber: 'AP23Y3679', netRiceQty: 285.87723, frkQty: 2.85877, gateInDate: '2025-08-25', dumpingDate: '2025-08-26' },
  { ackNumber: 'R 24-25/839660', dispatchDate: '2025-08-25', vehicleNumber: 'AP29V7825', netRiceQty: 285.97624, frkQty: 2.85976, gateInDate: '2025-08-26', dumpingDate: '2025-08-29' },
  { ackNumber: 'R 24-25/840335', dispatchDate: '2025-08-26', vehicleNumber: 'TS08UG6466', netRiceQty: 286.07525, frkQty: 2.86075, gateInDate: '2025-08-26', dumpingDate: '2025-08-29' },
  { ackNumber: 'R 24-25/840743', dispatchDate: '2025-08-26', vehicleNumber: 'AP29V7825', netRiceQty: 285.87723, frkQty: 2.85877, gateInDate: '2025-08-28', dumpingDate: '2025-08-29' },
  { ackNumber: 'R 24-25/841685', dispatchDate: '2025-08-28', vehicleNumber: 'TS08UG6466', netRiceQty: 285.97624, frkQty: 2.85976, gateInDate: '2025-08-29', dumpingDate: '2025-08-30' },
  { ackNumber: 'R 24-25/843365', dispatchDate: '2025-08-29', vehicleNumber: 'AP29V7825', netRiceQty: 286.07525, frkQty: 2.86075, gateInDate: '2025-08-31', dumpingDate: '2025-09-01' },
  { ackNumber: 'R 24-25/843569', dispatchDate: '2025-08-29', vehicleNumber: 'TS08UG6466', netRiceQty: 286.86733, frkQty: 2.86867, gateInDate: '2025-08-31', dumpingDate: '2025-09-01' },
  { ackNumber: 'R 24-25/843998', dispatchDate: '2025-08-30', vehicleNumber: 'AP29V7825', netRiceQty: 286.86733, frkQty: 2.86867, gateInDate: '2025-09-02', dumpingDate: '2025-09-03' },
  { ackNumber: 'R 24-25/845135', dispatchDate: '2025-08-31', vehicleNumber: 'AP29TB8258', netRiceQty: 285.97624, frkQty: 2.85976, gateInDate: '2025-09-02', dumpingDate: '2025-09-03' },
  { ackNumber: 'R 24-25/846239', dispatchDate: '2025-09-01', vehicleNumber: 'AP29V7825', netRiceQty: 286.07525, frkQty: 2.86075, gateInDate: '2025-09-02', dumpingDate: '2025-09-03' },
  { ackNumber: 'R 24-25/847805', dispatchDate: '2025-09-03', vehicleNumber: 'AP29V7825', netRiceQty: 286.47129, frkQty: 2.86471, gateInDate: '2025-09-05', dumpingDate: '2025-09-06' },
  { ackNumber: 'R 24-25/848880', dispatchDate: '2025-09-04', vehicleNumber: 'TS15UD9999', netRiceQty: 286.27327, frkQty: 2.86273, gateInDate: '2025-09-05', dumpingDate: '2025-09-06' },
  { ackNumber: 'R 24-25/858910', dispatchDate: '2025-09-14', vehicleNumber: 'TS08UG6466', netRiceQty: 286.37228, frkQty: 2.86372, gateInDate: '2025-09-15', dumpingDate: '2025-09-16' },
  { ackNumber: 'R 24-25/859229', dispatchDate: '2025-09-15', vehicleNumber: 'AP29V7825', netRiceQty: 285.77822, frkQty: 2.85778, gateInDate: '2025-09-16', dumpingDate: '2025-09-17' },
  { ackNumber: 'R 24-25/859553', dispatchDate: '2025-09-15', vehicleNumber: 'TS08UG6466', netRiceQty: 285.77822, frkQty: 2.85778, gateInDate: '2025-09-18', dumpingDate: '2025-09-19' },
  { ackNumber: 'R 24-25/861035', dispatchDate: '2025-09-17', vehicleNumber: 'AP29V7825', netRiceQty: 285.87723, frkQty: 2.85877, gateInDate: '2025-09-18', dumpingDate: '2025-09-19' },
  { ackNumber: 'R 24-25/863687', dispatchDate: '2025-09-21', vehicleNumber: 'AP29TA9149', netRiceQty: 285.58849, frkQty: 2.85877, gateInDate: '2025-09-22', dumpingDate: '2025-09-23' },
  { ackNumber: 'R 24-25/864106', dispatchDate: '2025-09-22', vehicleNumber: 'AP29TB8258', netRiceQty: 286.76832, frkQty: 2.86768, gateInDate: '2025-09-23', dumpingDate: '2025-09-24' },
  { ackNumber: 'R 24-25/864767', dispatchDate: '2025-09-23', vehicleNumber: 'AP28TE3355', netRiceQty: 286.66931, frkQty: 2.86669, gateInDate: '2025-09-24', dumpingDate: '2025-09-26' },
  { ackNumber: 'R 24-25/865479', dispatchDate: '2025-09-24', vehicleNumber: 'AP29TB8258', netRiceQty: 286.27327, frkQty: 2.86273, gateInDate: '2025-09-25', dumpingDate: '2025-09-27' },
  { ackNumber: 'R 24-25/866356', dispatchDate: '2025-09-25', vehicleNumber: 'AP28TE3355', netRiceQty: 287.06535, frkQty: 2.87065, gateInDate: '2025-09-26', dumpingDate: '2025-09-29' },
  { ackNumber: 'R 24-25/866912', dispatchDate: '2025-09-26', vehicleNumber: 'AP29TB8258', netRiceQty: 286.96634, frkQty: 2.86966, gateInDate: '2025-09-27', dumpingDate: '2025-09-29' },
  { ackNumber: 'R 24-25/867441', dispatchDate: '2025-09-26', vehicleNumber: 'AP28TE3355', netRiceQty: 286.17426, frkQty: 2.86174, gateInDate: '2025-09-30', dumpingDate: '2025-10-04' },
  { ackNumber: 'R 24-25/867709', dispatchDate: '2025-09-27', vehicleNumber: 'AP29TA9149', netRiceQty: 286.47129, frkQty: 2.86471, gateInDate: '2025-09-29', dumpingDate: '2025-09-30' },
  { ackNumber: 'R 24-25/868064', dispatchDate: '2025-09-28', vehicleNumber: 'AP29TB8258', netRiceQty: 286.37228, frkQty: 2.86372, gateInDate: '2025-09-29', dumpingDate: '2025-09-30' },
  { ackNumber: 'R 24-25/869326', dispatchDate: '2025-09-30', vehicleNumber: 'AP29T8258', netRiceQty: 286.5703, frkQty: 2.8657, gateInDate: '2025-09-30', dumpingDate: '2025-10-01' },
  { ackNumber: 'R 24-25/869881', dispatchDate: '2025-10-03', vehicleNumber: 'AP29TB8258', netRiceQty: 286.17426, frkQty: 2.86174, gateInDate: '2025-10-04', dumpingDate: '2025-10-06' },
  { ackNumber: 'R 24-25/872277', dispatchDate: '2025-10-07', vehicleNumber: 'AP29TB8258', netRiceQty: 286.66931, frkQty: 2.86669, gateInDate: '2025-10-08', dumpingDate: '2025-10-13' },
  { ackNumber: 'R 24-25/872689', dispatchDate: '2025-10-07', vehicleNumber: 'AP29V7825', netRiceQty: 286.86733, frkQty: 2.86867, gateInDate: '2025-10-08', dumpingDate: '2025-10-13' },
  { ackNumber: 'R 24-25/872869', dispatchDate: '2025-10-08', vehicleNumber: 'AP23Y3679', netRiceQty: 286.27327, frkQty: 2.86273, gateInDate: '2025-10-14', dumpingDate: '2025-10-14' },
  { ackNumber: 'R 24-25/873058', dispatchDate: '2025-10-08', vehicleNumber: 'AP29TB8258', netRiceQty: 287.06535, frkQty: 2.87065, gateInDate: '2025-10-12', dumpingDate: '2025-10-13' },
  { ackNumber: 'R 24-25/873377', dispatchDate: '2025-10-09', vehicleNumber: 'AP29V7825', netRiceQty: 286.76832, frkQty: 2.86768, gateInDate: '2025-10-11', dumpingDate: '2025-10-13' },
  { ackNumber: 'R 24-25/874159', dispatchDate: '2025-10-10', vehicleNumber: 'AP29TB8258', netRiceQty: 286.0396, frkQty: 2.8604, gateInDate: '2025-10-14', dumpingDate: '2025-10-16' },
  { ackNumber: 'R 24-25/875183', dispatchDate: '2025-10-12', vehicleNumber: 'AP29V7825', netRiceQty: 285.74257, frkQty: 2.85743, gateInDate: '2025-10-15', dumpingDate: '2025-10-27' },
  { ackNumber: 'R 24-25/875859', dispatchDate: '2025-10-13', vehicleNumber: 'AP23Y3679', netRiceQty: 286.33663, frkQty: 2.86337, gateInDate: '2025-10-16', dumpingDate: '2025-10-21' },
  { ackNumber: 'R 24-25/876644', dispatchDate: '2025-10-14', vehicleNumber: 'AP23Y3679', netRiceQty: 286.93069, frkQty: 2.86931, gateInDate: '2025-10-17', dumpingDate: '2025-10-21' },
  { ackNumber: 'R 24-25/877321', dispatchDate: '2025-10-15', vehicleNumber: 'AP29TA9149', netRiceQty: 286.93069, frkQty: 2.86931, gateInDate: '2025-10-17', dumpingDate: '2025-10-21' },
  { ackNumber: 'R 24-25/878963', dispatchDate: '2025-10-17', vehicleNumber: 'AP29TA9149', netRiceQty: 286.73267, frkQty: 2.86733, gateInDate: '2025-10-22', dumpingDate: '2025-10-28' },
  { ackNumber: 'R 24-25/879914', dispatchDate: '2025-10-18', vehicleNumber: 'AP29TA9149', netRiceQty: 286.63366, frkQty: 2.86634, gateInDate: '2025-10-22', dumpingDate: '2025-10-28' },
  { ackNumber: 'R 24-25/881114', dispatchDate: '2025-10-21', vehicleNumber: 'AP29TB8258', netRiceQty: 286.93069, frkQty: 2.86931, gateInDate: '2025-10-22', dumpingDate: '2025-10-28' },
  { ackNumber: 'R 24-25/882816', dispatchDate: '2025-10-23', vehicleNumber: 'AP29TB8258', netRiceQty: 286.93069, frkQty: 2.86931, gateInDate: '2025-10-25', dumpingDate: '2025-10-28' },
  { ackNumber: 'R 24-25/883521', dispatchDate: '2025-10-24', vehicleNumber: 'AP29TA9149', netRiceQty: 286.93069, frkQty: 2.86931, gateInDate: '2025-10-27', dumpingDate: '2025-10-28' },
  { ackNumber: 'R 24-25/884528', dispatchDate: '2025-10-25', vehicleNumber: 'AP29TB8258', netRiceQty: 286.83168, frkQty: 2.86832, gateInDate: '2025-10-27', dumpingDate: '2025-10-28' },
  { ackNumber: 'R 24-25/885737', dispatchDate: '2025-10-27', vehicleNumber: 'TS36T5319', netRiceQty: 285.11673, frkQty: 2.86273, gateInDate: '2025-10-27', dumpingDate: '2025-10-28' },
  { ackNumber: 'R 24-25/886711', dispatchDate: '2025-10-28', vehicleNumber: 'AP29TB8258', netRiceQty: 287.06535, frkQty: 2.87065, gateInDate: '2025-10-30', dumpingDate: '2025-11-06' },
  { ackNumber: 'R 24-25/887062', dispatchDate: '2025-10-28', vehicleNumber: 'AP29TA9149', netRiceQty: 286.96634, frkQty: 2.86966, gateInDate: '2025-10-30', dumpingDate: '2025-10-31' },
  { ackNumber: 'R 24-25/887860', dispatchDate: '2025-10-29', vehicleNumber: 'TS15UD9999', netRiceQty: 285.70199, frkQty: 2.8657, gateInDate: '2025-10-30', dumpingDate: '2025-11-06' },
  { ackNumber: 'R 24-25/888639', dispatchDate: '2025-10-30', vehicleNumber: 'AP28TE3355', netRiceQty: 286.5703, frkQty: 2.8657, gateInDate: '2025-10-31', dumpingDate: '2025-11-06' },
  { ackNumber: 'R 24-25/889283', dispatchDate: '2025-10-30', vehicleNumber: 'TS15UD9999', netRiceQty: 286.66931, frkQty: 2.86669, gateInDate: '2025-10-31', dumpingDate: '2025-11-06' },
  { ackNumber: 'R 24-25/924478', dispatchDate: '2025-12-29', vehicleNumber: 'AP29V7825', netRiceQty: 286.07525, frkQty: 2.86075, gateInDate: '2025-12-30', dumpingDate: '2026-01-02' },
  { ackNumber: 'R 24-25/925357', dispatchDate: '2025-12-30', vehicleNumber: 'TS07UK3350', netRiceQty: 286.5703, frkQty: 2.8657, gateInDate: '2026-01-02', dumpingDate: '2026-01-02' },
  { ackNumber: 'R 24-25/925778', dispatchDate: '2025-12-31', vehicleNumber: 'AP29TB8258', netRiceQty: 286.18905, frkQty: 2.86768, gateInDate: '2026-01-01', dumpingDate: '2026-01-02' },
  { ackNumber: 'R 24-25/927120', dispatchDate: '2026-01-02', vehicleNumber: 'AP29TB8258', netRiceQty: 286.66931, frkQty: 2.86669, gateInDate: '2026-01-03', dumpingDate: '2026-01-06' },
];

export default function CMRDataImport() {
  const [importing, setImporting] = useState(false);
  const [imported, setImported] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{
    totalRecords: number;
    successful: number;
    skipped: number;
    failed: number;
    totalCMR: number;
    totalFRK: number;
    avgPaddyUsed: number;
  } | null>(null);

  const handleImport = async () => {
    setImporting(true);
    setProgress(0);

    try {
      const importResult = await integrationService.bulkImportCMRDeliveries(
        CMR_DELIVERIES,
        {
          season: 'Rabi 24-25',
          destination: 'fci',
          variety: 'raw',
          standardQuantityQtls: 290,
          freightRate: 40,
          skipIfExists: true
        },
        (current, total, ackNumber) => {
          setProgress(Math.round((current / total) * 100));
        }
      );

      let totalCMR = 0;
      let totalFRK = 0;

      CMR_DELIVERIES.forEach(delivery => {
        totalCMR += 290;
        totalFRK += delivery.frkQty;
      });

      const avgPaddyUsed = (totalCMR + totalFRK) / 0.67;

      setResults({
        totalRecords: importResult.totalProcessed,
        successful: importResult.successful,
        skipped: importResult.skipped,
        failed: importResult.failed,
        totalCMR,
        totalFRK: Number(totalFRK.toFixed(2)),
        avgPaddyUsed: Number(avgPaddyUsed.toFixed(2)),
      });

      setImported(true);
    } catch (error) {
      console.error('Error importing data:', error);
      alert('Failed to import data. Please try again.');
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20">
            <Upload size={32} className="text-white" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-3">Import CMR Delivery Data</h2>
          <p className="text-gray-400 mb-8">
            Import 99 CMR Rice ACK records into Production Tab, Lorry Freight Tab, and CMR Dashboard
          </p>

          {!imported ? (
            <>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-6">
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div>
                    <div className="text-blue-400 text-sm font-medium mb-1">Total ACKs</div>
                    <div className="text-2xl font-bold text-white">99</div>
                  </div>
                  <div>
                    <div className="text-blue-400 text-sm font-medium mb-1">CMR Quantity</div>
                    <div className="text-2xl font-bold text-white">28,710 Qtls</div>
                  </div>
                  <div>
                    <div className="text-blue-400 text-sm font-medium mb-1">Destination</div>
                    <div className="text-lg font-medium text-white">FCI</div>
                  </div>
                  <div>
                    <div className="text-blue-400 text-sm font-medium mb-1">Variety</div>
                    <div className="text-lg font-medium text-white">Raw (PB Grade A)</div>
                  </div>
                </div>
              </div>

              {importing && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Importing records...</span>
                    <span className="text-sm font-medium text-white">{progress}%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                onClick={handleImport}
                disabled={importing}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-xl transition-all font-medium shadow-lg shadow-blue-500/20"
              >
                {importing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    Importing...
                  </>
                ) : (
                  <>
                    <Download size={20} />
                    Start Import
                  </>
                )}
              </button>
            </>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3 mb-6">
                <CheckCircle size={48} className="text-emerald-500" />
                <h3 className="text-2xl font-bold text-white">Import Successful!</h3>
              </div>

              {results && (
                <div className="space-y-4">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-left">
                        <div className="text-emerald-400 text-sm font-medium mb-1">Total Records</div>
                        <div className="text-2xl font-bold text-white">{results.totalRecords}</div>
                      </div>
                      <div className="text-left">
                        <div className="text-emerald-400 text-sm font-medium mb-1">Successfully Imported</div>
                        <div className="text-2xl font-bold text-white">{results.successful}</div>
                      </div>
                      {results.skipped > 0 && (
                        <div className="text-left">
                          <div className="text-amber-400 text-sm font-medium mb-1">Skipped (Exists)</div>
                          <div className="text-2xl font-bold text-white">{results.skipped}</div>
                        </div>
                      )}
                      {results.failed > 0 && (
                        <div className="text-left">
                          <div className="text-red-400 text-sm font-medium mb-1">Failed</div>
                          <div className="text-2xl font-bold text-white">{results.failed}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-left">
                        <div className="text-blue-400 text-sm font-medium mb-1">Total CMR</div>
                        <div className="text-2xl font-bold text-white">{results.totalCMR.toLocaleString('en-IN')} Qtls</div>
                      </div>
                      <div className="text-left">
                        <div className="text-blue-400 text-sm font-medium mb-1">Total FRK</div>
                        <div className="text-2xl font-bold text-white">{results.totalFRK.toLocaleString('en-IN')} Qtls</div>
                      </div>
                      <div className="text-left col-span-2">
                        <div className="text-blue-400 text-sm font-medium mb-1">Est. Paddy Used</div>
                        <div className="text-2xl font-bold text-white">{results.avgPaddyUsed.toLocaleString('en-IN')} Qtls</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-blue-400 mt-0.5" />
                  <div className="text-left">
                    <div className="text-blue-400 font-medium mb-1">Data Successfully Imported To:</div>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• <strong>Production Tab</strong> - All 99 ACK production records with FRK quantities</li>
                      <li>• <strong>Lorry Freight Tab</strong> - All 99 freight entries (₹40/qtl = ₹11,600 per ACK)</li>
                      <li>• <strong>CMR Paddy Dashboard</strong> - All 99 deliveries with gate-in & dumping status</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mt-4">
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-amber-400 mt-0.5" />
                  <div className="text-left">
                    <div className="text-amber-400 font-medium mb-1">Close and Refresh</div>
                    <p className="text-gray-300 text-sm">
                      Close this window to view the imported deliveries in your dashboard. The season summary will automatically update with the new data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
