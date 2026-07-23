const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function run() {
    const { data: client, error: insertError } = await supabase.from('clientes').insert({
        nombre: 'Test Delete',
        correo: 'test@delete.com'
    }).select().single();
    if (insertError) {
        console.error("Insert error", insertError);
        return;
    }
    console.log("Inserted:", client.id);
    
    // Add a service
    const { data: products } = await supabase.from('servicios').select('*').limit(1);
    if (products && products.length > 0) {
        await supabase.from('cliente_servicios').insert({
            cliente_id: client.id,
            servicio_id: products[0].id,
            monto_acordado: 100
        });
    }

    const { error: deleteError } = await supabase.from('clientes').delete().eq('id', client.id);
    console.log("Delete Error:", deleteError);
}
run();
