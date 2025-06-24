
import {supabase} from "$lib/config/supabaseClient"
import type {PageServerLoad} from "./$types";

export const load:PageServerLoad = async ({cookies, params, locals}) => {
    const user_or_library = params.user_or_library;
    const quests = await supabase.from("Quest").select("title,id,description");
    return {
        loaddata : {
            quests:quests
        },
        user_or_library: user_or_library,
    }
};