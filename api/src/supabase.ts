import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const supabaseEnvSchema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string().min(1)
});

export function getApiSupabaseConfig(env: NodeJS.ProcessEnv = process.env) {
  const config = supabaseEnvSchema.parse(env);

  return {
    anonKey: config.SUPABASE_ANON_KEY,
    url: config.SUPABASE_URL
  };
}

export function createApiSupabaseClient(env: NodeJS.ProcessEnv = process.env) {
  const config = getApiSupabaseConfig(env);

  return createClient(config.url, config.anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
