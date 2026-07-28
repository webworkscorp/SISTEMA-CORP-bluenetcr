-- =====================================================================
-- SCRIPT DE ACTUALIZACIÓN PARA SUPABASE (TABLAS CLIENTES Y CLIENTE_SERVICIOS)
-- Copia y ejecuta este código en el Editor SQL de Supabase (SQL Editor).
-- =====================================================================

-- 1. AGREGAR TODAS LAS NUEVAS COLUMNAS EN LA TABLA "clientes" (Si no existen)
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS tipo_cliente TEXT DEFAULT 'Persona Física';
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS cedula_numero TEXT;
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS nacionalidad TEXT;
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS estado_civil TEXT;
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS profesion_oficio TEXT;
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS domicilio TEXT;
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS personeria_juridica TEXT;
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS personeria_url TEXT;
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS representante_legal TEXT;
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS composicion_societaria TEXT;
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS actividad_economica TEXT;
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS debida_diligencia_completada BOOLEAN DEFAULT false;
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS debida_diligencia_notas TEXT;
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS debida_diligencia_url TEXT;
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS calidad_actua TEXT;
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS datos_bancarios TEXT;
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS domicilio_contractual TEXT;
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS activos_administrados TEXT;
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS cedula_url TEXT;
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS pasaporte_url TEXT;

-- 2. ASEGURAR QUE LA TABLA "cliente_servicios" EXISTA CON SU ESTRUCTURA COMPLETA
CREATE TABLE IF NOT EXISTS public.cliente_servicios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cliente_id UUID REFERENCES public.clientes(id) ON DELETE CASCADE NOT NULL,
    servicio_id UUID REFERENCES public.servicios(id) ON DELETE RESTRICT NOT NULL,
    monto_acordado NUMERIC NOT NULL,
    estado TEXT NOT NULL DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo', 'finalizado')),
    fecha_asignacion TIMESTAMPTZ DEFAULT now()
);

-- 3. PERMISOS Y POLITICAS DE SEGURIDAD (RLS) PARA "clientes"
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins insertan clientes" ON public.clientes;
DROP POLICY IF EXISTS "Usuarios autenticados insertan clientes" ON public.clientes;
DROP POLICY IF EXISTS "Usuarios autenticados gestionan clientes" ON public.clientes;
DROP POLICY IF EXISTS "Usuarios autenticados leen clientes" ON public.clientes;
DROP POLICY IF EXISTS "Usuarios autenticados actualizan clientes" ON public.clientes;
DROP POLICY IF EXISTS "Admins eliminan clientes" ON public.clientes;

CREATE POLICY "Usuarios autenticados gestionan clientes" ON public.clientes
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. PERMISOS Y POLITICAS DE SEGURIDAD (RLS) PARA "cliente_servicios"
ALTER TABLE public.cliente_servicios ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Usuarios autenticados gestionan cliente_servicios" ON public.cliente_servicios;
DROP POLICY IF EXISTS "Usuarios autenticados leen cliente_servicios" ON public.cliente_servicios;
DROP POLICY IF EXISTS "Usuarios autenticados actualizan cliente_servicios" ON public.cliente_servicios;
DROP POLICY IF EXISTS "Admins insertan cliente_servicios" ON public.cliente_servicios;
DROP POLICY IF EXISTS "Admins eliminan cliente_servicios" ON public.cliente_servicios;

CREATE POLICY "Usuarios autenticados gestionan cliente_servicios" ON public.cliente_servicios
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 5. RE-PUBLICAR EN REALTIME PARA NOTIFICACIONES EN VIVO
ALTER PUBLICATION supabase_realtime ADD TABLE public.clientes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.cliente_servicios;

-- 6. AGREGAR COLUMNA "telefono" EN LA TABLA "perfiles" SI NO EXISTE
ALTER TABLE public.perfiles ADD COLUMN IF NOT EXISTS telefono TEXT;
