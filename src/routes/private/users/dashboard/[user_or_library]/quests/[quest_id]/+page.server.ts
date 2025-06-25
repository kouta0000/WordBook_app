
import {supabase} from "$lib/config/supabaseClient"
import type {PageServerLoad} from "./$types";

export const load:PageServerLoad = async ({cookies, params, locals}) => {
    const user_or_library = params.user_or_library;
    const quest_id = params.quest_id;
    console.log(quest_id)
    const wordbook_ids = await supabase.from("Quest_WordBooks").select("wb_id").eq("quest_id", quest_id);
    return {
        loaddata : {
            wordbook_ids:wordbook_ids,
            quest_id:quest_id,
        },
        user_or_library: user_or_library,
    }
};