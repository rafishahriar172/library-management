import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

const supabaseUrl = configService.get<string>('SUPABASE_URL');
const supabaseKey = configService.get<string>('SUPABASE_KEY');

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL or KEY is missing in environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
