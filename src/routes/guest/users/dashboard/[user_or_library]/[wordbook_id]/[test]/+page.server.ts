import {supabase} from "$lib/config/supabaseClient";
import type {PageServerLoad} from "./$types";

export const load: PageServerLoad = async ({cookies, params, locals}) => {
    const user_or_library = params.user_or_library;
    const test = params.test;
    const user_id = locals.user?.id;
    const wordbook_id = params.wordbook_id;
    const library_id = "f25a8dbd-2c43-4134-8a76-f4dda58a5245";
    const wb_name = await supabase.from("WordBooks").select("wb_name").eq("id", wordbook_id);
    let words; 
    if (user_or_library == "user") {
        words = await supabase.from("Words").select("term, meaning, id").eq("wb_id", wordbook_id).eq("user_id", user_id).order("created_at", {ascending:false});
    } else {
        words = await supabase.from("Words").select("term, meaning, id").eq("wb_id", wordbook_id).eq("user_id", library_id).order("created_at",{ascending:false});
    }
    return {
        loaddata: {
        words: words,
        user_or_library: user_or_library,
        test:test,
        wordbook_id: wordbook_id,
        wb_name: wb_name,
        }
    }
};