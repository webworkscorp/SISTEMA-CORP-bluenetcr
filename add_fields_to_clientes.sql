ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS nacionalidad TEXT;
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS estado_civil TEXT;
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS cedula_url TEXT;
ALTER TABLE public.clientes ADD COLUMN IF NOT EXISTS pasaporte_url TEXT;
