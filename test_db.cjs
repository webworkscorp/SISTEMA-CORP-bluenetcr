const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Fix invalid URL issue by checking it
if (!process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_URL.startsWith('http')) {
    console.error("Invalid URL in env");
    process.exit(1);
}

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function run() {
    const { data: clients, error } = await supabase.from('clientes').select('*');
    console.log("Clients count:", clients ? clients.length : 0);
    if (clients && clients.length > 0) {
        console.log("Sample client:", clients[0]);
    }
}
run();
