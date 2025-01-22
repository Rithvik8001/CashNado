import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/types/supabase";

// Create a single supabase client for interacting with your database
export const createClient = () => {
  return createClientComponentClient<Database>();
};

export const supabase = createClient();
