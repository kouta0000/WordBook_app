import { createClient } from '@supabase/supabase-js';
import {SUPABASE_URL} from "$env/static/private";
import {SUPABASE_KEY} from "$env/static/private";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);