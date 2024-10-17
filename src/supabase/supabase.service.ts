import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

// const supabaseUrl = configService.get<string>('SUPABASE_URL');
// const supabaseKey = configService.get<string>('SUPABASE_KEY');

const supabaseUrl = 'https://udoigsehkkrdmvxfgsyi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkb2lnc2Voa2tyZG12eGZnc3lpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNzc0ODA0NiwiZXhwIjoyMDQzMzI0MDQ2fQ.uXtWvnw5QurDEtKQ48GX2a0wc2MAQzj8yEktR_mCqY4';

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL or KEY is missing in environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
