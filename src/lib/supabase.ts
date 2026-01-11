import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!');
  console.error('VITE_SUPABASE_URL:', supabaseUrl);
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'present' : 'missing');
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ItemCategory {
  id: string;
  name: string;
  description: string | null;
  display_order: number;
  created_at: string;
}

export interface PricingItem {
  id: string;
  category_id: string | null;
  name: string;
  code: string;
  unit: string;
  item_type: 'purchase' | 'sale' | 'both';
  is_active: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface PriceRecord {
  id: string;
  item_id: string;
  purchase_price: number;
  sale_price: number;
  margin_amount: number;
  margin_percent: number;
  effective_date: string;
  is_current: boolean;
  notes: string | null;
  created_at: string;
  created_by: string;
}

export interface PricingItemWithDetails extends PricingItem {
  category?: ItemCategory;
  current_price?: PriceRecord;
  price_history?: PriceRecord[];
}
