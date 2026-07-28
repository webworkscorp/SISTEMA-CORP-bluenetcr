const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://tywmtnrckhdernqbqbdt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5d210bnJja2hkZXJucWJxYmR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2MDQ1MTAsImV4cCI6MjEwMDE4MDUxMH0.wLS5Zb6fVTFHNIVtxSLRB8Xw_l_fm5PXLwrEwelPgkU";

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase.from('perfiles').select('*');
  console.log("Current perfiles:", data, "Error:", error);
}
run();
