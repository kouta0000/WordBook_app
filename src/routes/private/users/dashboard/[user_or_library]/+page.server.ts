
import {supabase} from "$lib/config/supabaseClient"
import type {PageServerLoad} from "./$types";

export const load:PageServerLoad = async ({cookies, params, locals}) => {
    const library_user_id = "f25a8dbd-2c43-4134-8a76-f4dda58a5245";
    const user_or_library = params.user_or_library;
    const user_id = locals.user?.id //hooksでゲットしlocalsにユーザー情報が格納してある
    const library_wordbooks = await supabase.from("WordBooks").select("wb_name, id, language").eq("user_id", library_user_id);
    const user_wordbooks = await supabase.from("WordBooks").select("wb_name, id, language").eq("user_id", user_id);
    return {
        loaddata : {
            library_wordbooks: library_wordbooks,
            user_wordbooks: user_wordbooks,
        },
        user_or_library: user_or_library,
    }
};

  export const actions = {
    add: async ({ request, locals }) => {
        const data = await request.formData();
        const wb_name: string = data.get("wb_name");
        const language: string = data.get("language")
        const user_id = locals.user?.id
        const {error} = await supabase.from("WordBooks").insert({"user_id": user_id, "wb_name": wb_name, "language": language})
    },
    delete: async ({request}) => {
        const data: FormData = await request.formData();
        const wordbook_id = data.get("wordbook_id");
        console.log(typeof wordbook_id)
        const {error} = await supabase.from("WordBooks").delete().eq("id", wordbook_id);  
        console.log(wordbook_id)
    }
};