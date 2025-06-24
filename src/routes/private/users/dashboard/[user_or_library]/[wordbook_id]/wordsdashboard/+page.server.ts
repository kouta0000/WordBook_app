import {supabase} from "$lib/config/supabaseClient";
import type {PageServerLoad} from "./$types";

export const load: PageServerLoad = async ({cookies, params, locals}) => {
    const user_or_library = params.user_or_library;
    const user_id = locals.user?.id;
    const wordbook_id = params.wordbook_id;
    const library_id = "f25a8dbd-2c43-4134-8a76-f4dda58a5245";
    const wb = await supabase.from("WordBooks").select("wb_name, language").eq("id", wordbook_id);
    let words; 
    if (user_or_library == "user") {
        words = await supabase.from("Words").select("term, meaning, id,checked").eq("wb_id", wordbook_id).eq("user_id", user_id).order("created_at", {ascending:false});
        const {error} = await supabase.from("WordBooks").update({word_number:words.data?.length, updated_at: new Date()}).eq("id",wordbook_id)
    } else if (user_or_library=="library") {
        words = await supabase.from("Words").select("term, meaning, id,checked").eq("wb_id", wordbook_id).eq("user_id", library_id).order("created_at",{ascending:false});
        const {error} = await supabase.from("WordBooks").update({word_number:words.data?.length, updated_at: new Date()}).eq("id",wordbook_id)
    } else {
        words = await supabase.from("Words").select("term, meaning, id,checked").eq("wb_id", wordbook_id).order("created_at",{ascending:false});
        const {error} = await supabase.from("WordBooks").update({word_number:words.data?.length, updated_at: new Date()}).eq("id",wordbook_id)
    }
    return {
        loaddata: {
        words: words,
        user_or_library: user_or_library,
        wordbook_id: wordbook_id,
        wb:wb
        }
    }
};
export const actions = {
    createWord: async ({ request, locals }) => {
        const data = await request.formData();
        const terms: string[] = data.getAll("term");
        const meanings: string[] = data.getAll("meaning");
        const wordbook_ids: string[] = data.getAll("wordbook_id")
        const user_id = locals.user?.id;
        for (let i = 0; i < terms.length; i++) {
            const term: string = terms[i];
            const meaning: string = meanings[i];
            const wordbook_id: string = wordbook_ids[i];
            const {error} = await supabase.from("Words").insert({"user_id": user_id, "wb_id": wordbook_id, "term": term, "meaning": meaning})
        }
    },
    deleteWords: async ({ request, locals, params }) => {
        const data: FormData = await request.formData();
        const erros = [];
        for (const [key, value] of data) {
            const {error} = await supabase.from("Words").delete().eq("id", value);
            erros.push(error);
        };    
    },
    updateWord: async ({request}) => {
        const data: FormData = await request.formData();
        const word_id = data.get("id");
        const term = data.get("term");
        const meaning = data.get("meaning");
        const {error} = await supabase.from("Words").update({term: term, meaning:meaning}).eq("id", word_id)

    },
    checked: async ({request}) => {
        const data:FormData = await request.formData();
        const checked = data.get("checked");
        const word_id = data.get("id");
        const bool = checked==="false";
        const {error} = await supabase.from("Words").update({checked:bool}).eq("id",word_id);
    }
};
