import {supabase} from "$lib/config/supabaseClient";
import type {PageServerLoad} from "./$types";

export const load: PageServerLoad = async ({params}) => {
    const wordbook_id: string = params.wordbook_id;
    const user_id = params.user_id;
    const words = await supabase.from("Words").select("term, meaning").eq("wb_id", wordbook_id).eq("user_id", user_id);
    return words
}