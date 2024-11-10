// src/supabase.js
import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase URL and anon key
const supabaseUrl = 'https://sfskqaeauyjqcefzvtmb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmc2txYWVhdXlqcWNlZnp2dG1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyNjIzMzUsImV4cCI6MjA0NDgzODMzNX0.Ya8pb4W-owyvLdTqJXsjrIr03-6JR68IgAF_1M9StK4';
export const supabase = createClient(supabaseUrl, supabaseKey);
