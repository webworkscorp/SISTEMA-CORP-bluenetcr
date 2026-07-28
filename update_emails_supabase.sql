UPDATE public.perfiles
SET email = auth.users.email
FROM auth.users
WHERE public.perfiles.id = auth.users.id;
