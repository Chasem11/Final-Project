import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cbcfkgstzzyfsjocrthu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiY2ZrZ3N0enp5ZnNqb2NydGh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0NTM1ODAsImV4cCI6MjAyOTAyOTU4MH0.SaOOIxW9bUvpgSwv_vw-4Cec0ewL5MAUa2rgFMxgkh4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
