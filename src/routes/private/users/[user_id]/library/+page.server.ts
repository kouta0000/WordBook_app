
import {supabase} from "$lib/config/supabaseClient"
import type {PageServerLoad} from "./$types";

let user_id: string;

export const load:PageServerLoad = async ({params}) => {
    user_id = "f25a8dbd-2c43-4134-8a76-f4dda58a5245";
    const wordbooks = await supabase.from("WordBooks").select("wb_name, id").eq("user_id", user_id);
    return wordbooks
  }

  export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const wb_name: string = data.get("wb_name");
        const {error} = await supabase.from("WordBooks").insert({"user_id": user_id, "wb_name": wb_name})
    }
};