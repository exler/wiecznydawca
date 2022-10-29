import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '../types_db';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

export const supabase = createBrowserSupabaseClient<Database>();
