// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://acsipemifwatzmfngpth.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjc2lwZW1pZndhdHptZm5ncHRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMzI5MjcsImV4cCI6MjA2MjgwODkyN30.IvFP0QXbLPC_HIvOL9EQPDg9Lp_tlCwQoG8C2DjuLdM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);