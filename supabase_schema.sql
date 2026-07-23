-- =====================================================================
-- ESQUEMA COMPLETO Y POLÍTICAS DE SEGURIDAD (RLS) PARA SUPABASE
-- Ejecuta este script completo en el editor SQL de tu proyecto de Supabase.
-- =====================================================================

-- 1. SECUENCIA PARA NÚMERO DE CLIENTE AUTO-INCREMENTAL (#001, #002...)
CREATE SEQUENCE IF NOT EXISTS public.cliente_number_seq START WITH 1;

-- 2. TABLA DE PERFILES (Sincronizada con auth.users de Supabase)
CREATE TABLE IF NOT EXISTS public.perfiles (
    id UUID PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT,
    foto_perfil_url TEXT,
    rol TEXT NOT NULL DEFAULT 'usuario' CHECK (rol IN ('admin', 'usuario')),
    estado TEXT NOT NULL DEFAULT 'activo' CHECK (estado IN ('pendiente', 'activo')),
    ha_visto_tutorial BOOLEAN DEFAULT false,
    fecha_creacion TIMESTAMPTZ DEFAULT now()
);

-- 3. TABLA DE SERVICIOS (Catálogo)
CREATE TABLE IF NOT EXISTS public.servicios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    precio_base NUMERIC NOT NULL,
    comision_porcentaje NUMERIC NOT NULL CHECK (comision_porcentaje >= 0 AND comision_porcentaje <= 100),
    estado TEXT NOT NULL DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo')),
    fecha_creacion TIMESTAMPTZ DEFAULT now()
);

-- 4. TABLA DE CLIENTES
CREATE TABLE IF NOT EXISTS public.clientes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    numero_cliente TEXT UNIQUE DEFAULT ('#' || lpad(nextval('public.cliente_number_seq')::text, 3, '0')),
    nombre TEXT NOT NULL,
    empresa TEXT,
    correo TEXT NOT NULL,
    telefono TEXT,
    fecha_creacion TIMESTAMPTZ DEFAULT now()
);

-- 5. TABLA INTERMEDIA CLIENTE-SERVICIOS (Multi-servicio)
CREATE TABLE IF NOT EXISTS public.cliente_servicios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cliente_id UUID REFERENCES public.clientes(id) ON DELETE CASCADE NOT NULL,
    servicio_id UUID REFERENCES public.servicios(id) ON DELETE RESTRICT NOT NULL,
    monto_acordado NUMERIC NOT NULL,
    estado TEXT NOT NULL DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo', 'finalizado')),
    fecha_asignacion TIMESTAMPTZ DEFAULT now()
);

-- 6. TABLA DE DOCUMENTOS
CREATE TABLE IF NOT EXISTS public.documentos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cliente_id UUID REFERENCES public.clientes(id) ON DELETE CASCADE NOT NULL,
    nombre_archivo TEXT NOT NULL,
    extension TEXT NOT NULL,
    url_archivo TEXT NOT NULL,
    fecha_subida TIMESTAMPTZ DEFAULT now()
);

-- 7. TABLA DE TAREAS
CREATE TABLE IF NOT EXISTS public.tareas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cliente_id UUID REFERENCES public.clientes(id) ON DELETE CASCADE NOT NULL,
    descripcion TEXT NOT NULL,
    responsable_id UUID REFERENCES public.perfiles(id) ON DELETE SET NULL,
    fecha_limite DATE NOT NULL,
    prioridad TEXT NOT NULL CHECK (prioridad IN ('alta', 'media', 'baja')),
    estado TEXT NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'finalizada'))
);

-- =====================================================================
-- AUTOMATIZACIÓN DE PERFILES (TRIGGER PARA NUEVOS USUARIOS)
-- =====================================================================

-- Función que captura la creación de usuario en auth.users y crea su perfil
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.perfiles (id, nombre, foto_perfil_url, rol, estado, email)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'nombre', new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'avatar_url', ''),
    COALESCE(new.raw_user_meta_data->>'rol', 'usuario'),
    'activo',
    new.email
  )
  ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger asociado
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================================
-- CONFIGURACIÓN DE SEGURIDAD (ROW LEVEL SECURITY - RLS)
-- =====================================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE public.perfiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.servicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cliente_servicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tareas ENABLE ROW LEVEL SECURITY;

-- Función de ayuda para validar si el usuario autenticado es admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.perfiles
    WHERE id = auth.uid() AND rol = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- POLÍTICAS: PERFILES
CREATE POLICY "Usuarios autenticados leen perfiles" ON public.perfiles
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Usuarios actualizan su propio perfil" ON public.perfiles
    FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE POLICY "Admins gestionan todos los perfiles" ON public.perfiles
    FOR ALL TO authenticated USING (public.is_admin());

-- POLÍTICAS: SERVICIOS
CREATE POLICY "Usuarios autenticados leen servicios" ON public.servicios
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Solo admins modifican servicios" ON public.servicios
    FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- POLÍTICAS: CLIENTES
DROP POLICY IF EXISTS "Usuarios autenticados gestionan clientes" ON public.clientes;

CREATE POLICY "Usuarios autenticados leen clientes" ON public.clientes
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Usuarios autenticados actualizan clientes" ON public.clientes
    FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Admins insertan clientes" ON public.clientes
    FOR INSERT TO authenticated WITH CHECK (public.is_admin());

CREATE POLICY "Admins eliminan clientes" ON public.clientes
    FOR DELETE TO authenticated USING (public.is_admin());

-- POLÍTICAS: CLIENTE_SERVICIOS
DROP POLICY IF EXISTS "Usuarios autenticados gestionan cliente_servicios" ON public.cliente_servicios;

CREATE POLICY "Usuarios autenticados leen cliente_servicios" ON public.cliente_servicios
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Usuarios autenticados actualizan cliente_servicios" ON public.cliente_servicios
    FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Admins insertan cliente_servicios" ON public.cliente_servicios
    FOR INSERT TO authenticated WITH CHECK (public.is_admin());

CREATE POLICY "Admins eliminan cliente_servicios" ON public.cliente_servicios
    FOR DELETE TO authenticated USING (public.is_admin());

-- POLÍTICAS: DOCUMENTOS
DROP POLICY IF EXISTS "Usuarios autenticados gestionan documentos" ON public.documentos;

CREATE POLICY "Usuarios autenticados gestionan documentos" ON public.documentos
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- POLÍTICAS: TAREAS
DROP POLICY IF EXISTS "Usuarios autenticados gestionan tareas" ON public.tareas;

CREATE POLICY "Usuarios autenticados leen tareas" ON public.tareas
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Usuarios autenticados insertan tareas" ON public.tareas
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Usuarios autenticados actualizan tareas" ON public.tareas
    FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Admins eliminan tareas" ON public.tareas
    FOR DELETE TO authenticated USING (public.is_admin());

-- =====================================================================
-- CONFIGURACIÓN DE REALTIME
-- =====================================================================
-- Habilitar realtime para las tablas para que la UI se actualice automáticamente
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime;
COMMIT;
ALTER PUBLICATION supabase_realtime ADD TABLE public.perfiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.clientes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.cliente_servicios;
ALTER PUBLICATION supabase_realtime ADD TABLE public.documentos;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tareas;
ALTER PUBLICATION supabase_realtime ADD TABLE public.servicios;

-- =====================================================================
-- DATOS INICIALES (SEMILLA PARA SERVICIOS)
-- =====================================================================
INSERT INTO public.servicios (nombre, descripcion, precio_base, comision_porcentaje, estado) VALUES
('Desarrollo Web Corporativo', 'Diseño y desarrollo de sitio web corporativo responsivo y optimizado para SEO.', 1200, 10, 'activo'),
('Gestión de Redes Sociales', 'Administración de canales digitales, creación de contenido y pauta publicitaria mensual.', 450, 15, 'activo'),
('Consultoría TI & Servidores', 'Auditoría de sistemas, migración a la nube y soporte técnico preventivo mensual.', 800, 12, 'activo')
ON CONFLICT DO NOTHING;
