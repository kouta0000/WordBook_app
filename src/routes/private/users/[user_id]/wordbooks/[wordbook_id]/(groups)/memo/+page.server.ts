import {supabase} from "$lib/config/supabaseClient";
import type {PageServerLoad} from "./$types";


export const load: PageServerLoad = async ({params, cookies}) => {
    const wordbook_id: string = params.wordbook_id;
    const user_id: string = params.user_id;
    cookies.set("wordbook_id", wordbook_id, {path: "/"});
    cookies.set("user_id", user_id, {path: "/"});
    const words = await supabase.from("Words").select("term, meaning, id").eq("wb_id", wordbook_id).eq("user_id", user_id).order("created_at",{ascending:false});
    return words
}

export const actions = {
    createWord: async ({ cookies, request }) => {
        const data = await request.formData();
        const term: string = data.get("term");
        const meaning: string = data.get("meaning");
        const wordbook_id: string = cookies.get("wordbook_id");
        const user_id: string = cookies.get("user_id");
        const {error} = await supabase.from("Words").insert({"user_id": user_id, "wb_id": wordbook_id, "term": term, "meaning": meaning})
    },
    deleteWord: async ({ cookies, request }) => {
        const data: FormData = await request.formData();
        const erros = [];
        for (const [key, value] of data) {
            const {error} = await supabase.from("Words").delete().eq("id", value);
            erros.push(error);
        };
        
    },
};
