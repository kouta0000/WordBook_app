import {supabase} from "$lib/config/supabaseClient";
import type {PageServerLoad} from "./$types";

let wordbook_id: string;
let user_id:string;

export const load: PageServerLoad = async ({params}) => {
    wordbook_id = params.wordbook_id;
    user_id = "f25a8dbd-2c43-4134-8a76-f4dda58a5245";
    const words = await supabase.from("Words").select("term, meaning, id").eq("wb_id", wordbook_id).eq("user_id", user_id).order("created_at",{ascending:false});
    return words
};