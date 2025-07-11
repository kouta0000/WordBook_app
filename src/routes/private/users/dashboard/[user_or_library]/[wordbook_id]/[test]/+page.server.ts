import {supabase} from "$lib/config/supabaseClient";
import type {PageServerLoad} from "./$types";

export const load: PageServerLoad = async ({cookies, params, locals}) => {
    const user_or_library = params.user_or_library;
    const test = params.test;
    const user_id = locals.user?.id;
    const wordbook_id = params.wordbook_id;
    const library_id = "f25a8dbd-2c43-4134-8a76-f4dda58a5245";
    const wbinfo = await supabase.from("WordBooks").select("wb_name, language").eq("id", wordbook_id);
    let user_info = await supabase.from("Users").select("level,xp,last_xp,languages,plan").eq("id", user_id);
    if (!user_info.data?.[0]) {
        const {error} = await supabase.from("Users").insert({id:user_id, plan:"free"});
        user_info = await supabase.from("Users").select("level,xp,last_xp,languages,plan").eq("id", user_id);
    };
    let words; 
    if (user_or_library == "user") {
        words = await supabase.from("Words").select("term, meaning, id, sentence").eq("wb_id", wordbook_id).eq("user_id", user_id).order("created_at", {ascending:false});
    } else if (user_or_library=="library") {
        words = await supabase.from("Words").select("term, meaning, id, sentence").eq("wb_id", wordbook_id).eq("user_id", library_id).order("created_at",{ascending:false});
    } else {
        words = await supabase.from("Words").select("term, meaning, id, sentence").eq("wb_id", wordbook_id);
    };
    return {
        loaddata: {
        words: words,
        user_or_library: user_or_library,
        test:test,
        wordbook_id: wordbook_id,
        wb_name: wbinfo.data?.[0].wb_name,
        language:wbinfo.data?.[0].language,
        user_info
        }
    }
};
export const actions = {
    updateXp_Level: async ({request,locals}) => {
        const user_id = locals.user?.id;
        const data = await request.formData();
        const last_xp = data.get("last_xp");
        const xp = data.get("xp");
        const level = data.get("level");
        console.log(level)
        const {error} = await supabase.from("Users").update({last_xp:last_xp, xp:xp, level:level}).eq("id",user_id)
    }
}
