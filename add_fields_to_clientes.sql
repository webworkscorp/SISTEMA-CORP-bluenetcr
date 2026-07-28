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

DROP POLICY IF EXISTS "Admins insertan clientes" ON public.clientes;
DROP POLICY IF EXISTS "Usuarios autenticados insertan clientes" ON public.clientes;
CREATE POLICY "Usuarios autenticados insertan clientes" ON public.clientes FOR INSERT TO authenticated WITH CHECK (true);

