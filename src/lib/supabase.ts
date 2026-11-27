import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_PUBLIC_SUPABASE_URL as string,
  import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY as string,
);

export type QuoteStatus = 'New' | 'In Progress' | 'Completed';

export interface QuoteRequest {
  id: number;
  customer_name: string;
  email: string;
  phone: string;
  package: 'Basic' | 'Standard' | 'Premium';
  property_type: string;
  requirements: string | null;
  status: QuoteStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}