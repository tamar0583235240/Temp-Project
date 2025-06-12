
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
console.log('SUPABASE_KEY:i am here', process.env.SUPABASE_SERVICE_ROLE_KEY);

export const supabase = createClient(supabaseUrl, supabaseKey);
