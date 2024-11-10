// src/supabase.js
import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase URL and anon key
const supabaseUrl = '';
const supabaseKey = '';
export const supabase = createClient(supabaseUrl, supabaseKey);
