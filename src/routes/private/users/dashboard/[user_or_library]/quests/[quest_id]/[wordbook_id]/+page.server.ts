import {supabase} from "$lib/config/supabaseClient";
import type {PageServerLoad} from "./$types";

export const load: PageServerLoad = async ({cookies, params, locals}) => {
    const wordbook_id = params.wordbook_id;
    const quest_id = params.quest_id;
    const wbinfo = await supabase.from("WordBooks").select("wb_name, language").eq("id", wordbook_id);
    const words = await supabase.from("Words").select("term, meaning, id, sentence").eq("wb_id", wordbook_id);
    

    return {
        loaddata: {
        words: words,
        wordbook_id: wordbook_id,
        wb_name: wbinfo.data?.[0].wb_name,
        language:wbinfo.data?.[0].language,
        quest_id:quest_id
        }
    }
};