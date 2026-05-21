# Supabase Configuration

BoxPulse usa Supabase Auth como dirección inicial para autenticación.

## Variables

Para desarrollo, crear archivos `.env` locales a partir de los `.env.example` existentes.

API:

```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
```

Web:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Mobile:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Notas

- No commitear `.env` reales.
- La anon key puede usarse en clientes públicos, pero debe mantenerse configurable por entorno.
- No agregar service role keys a web ni mobile.
- El cliente mobile base no persiste sesión todavía; la persistencia queda para la tarea de provider de sesión mobile.
- Si más adelante la API necesita una service role key para tareas administrativas, debe agregarse en una tarea separada y documentarse explícitamente.
