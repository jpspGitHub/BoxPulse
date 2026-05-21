import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export function getMobileSupabaseConfig() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing public Supabase environment variables for mobile app");
  }

  return {
    anonKey: supabaseAnonKey,
    url: supabaseUrl
  };
}

export function createMobileSupabaseClient() {
  const config = getMobileSupabaseConfig();

  return createClient(config.url, config.anonKey, {
    auth: {
      autoRefreshToken: true,
      detectSessionInUrl: false,
      persistSession: true,
      storage: AsyncStorage
    }
  });
}
