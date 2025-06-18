import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SERVICE_ROLE_KEY!;

console.log('SUPABASE_KEY: i am here', supabaseKey);

export const supabase = createClient(supabaseUrl, supabaseKey);
