import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// 1. Cargamos las variables del archivo .env que está en la raíz
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

// 2. Validación: Si no encuentra las llaves, te avisará por consola
if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Error: Faltan las credenciales de Supabase en el archivo .env");
}

// 3. Exportamos el cliente para que index.ts lo pueda usar
export const supabase = createClient(supabaseUrl, supabaseKey);