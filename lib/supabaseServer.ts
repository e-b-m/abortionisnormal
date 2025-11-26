import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "Supabase credentials are missing. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local",
  );
}

export const createSupabaseServerClient = () => {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Supabase environment variables are not configured. Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }
  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  });
};
