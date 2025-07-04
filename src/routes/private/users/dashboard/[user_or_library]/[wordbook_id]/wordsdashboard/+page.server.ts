import {supabase} from "$lib/config/supabaseClient";
import type {PageServerLoad} from "./$types";
import { OCR_SPACE_KEY } from "$env/static/private";
import { json, fail } from "@sveltejs/kit";
interface Word {
    WordText: string;
    Left: number;
    Top: number;
    Height: number;
    Width: number;
  }
  
  interface Line {
    Words: Word[];
    MaxHeight: number;
    MinTop: number;
  }
  
  interface TextOverlay {
    Lines: Line[];
    HasOverlay: boolean;
    Message: string | null;
  }
  
  interface ParsedResult {
    TextOverlay: TextOverlay | null;
    FileParseExitCode: string | number; // Assuming it can be a string or a number based on your example
    ParsedText: string | null;
    ErrorMessage: string | null;
    ErrorDetails: string | null;
  }
  
  interface OCRResponse {
    ParsedResults: ParsedResult[];
    OCRExitCode: string;
    IsErroredOnProcessing: boolean;
    ErrorMessage: string | null;
    ErrorDetails: string | null;
    SearchablePDFURL: string | null;
    ProcessingTimeInMilliseconds: string; // Assuming it's a string based on your example
  }
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
        const wordbook_id = data.get("wordbook_id")
        const user_id = locals.user?.id;
        const words = terms.map((v,i)=>{return{user_id:user_id, wb_id:wordbook_id, term:terms[i], meaning:meanings[i]}})
        const {error} = await supabase.from("Words").insert(words);
    },
    createWordWithTranslation: async({request,locals, fetch}) => {
        const data = await request.formData();
        const language = data.get("language")
        const terms: string[] = data.getAll("term");
        const wordbook_id = data.get("wordbook_id");
        const user_id = locals.user?.id;
        const res = await fetch(`/api/translation?language=${language}`, {
            method:"POST",
            headers: {
                "Content-type": "application/json"
            },
            body:JSON.stringify({terms:terms})
        });
        const buf:{words:{term:string,meaning:string}[]} = await res.json();
        const words = buf.words;
        console.log(words);
        const insertdata = words.map((v:{term:string,meaning:string})=>{return {term:v.term, meaning:v.meaning, user_id:user_id, wb_id:wordbook_id}});
        const {error} = await supabase.from("Words").insert(insertdata)
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
    },
    ocr: async({request, fetch})=> {
        const data:FormData = await request.formData();
        const file = data.get('file'); // 'file' という名前で送信された画像ファイル
        let base64Image:string = '';
        if (!(file instanceof File || typeof file === 'string')) {
            return json({ error: 'ファイルが提供されていません。' }, { status: 400 });
        }

        if(typeof file === 'string') {
            base64Image = file.startsWith('data:') ? file.split(',')[1] : file;
        } else {
        const arrayBuffer = await file.arrayBuffer();
        base64Image = Buffer.from(arrayBuffer).toString('base64');
        }
        const res = await fetch(`/api/image`, {
            method:"POST",
            headers: {
                "Content-type": "application/json"
            },
            body:JSON.stringify({image:base64Image})
        });
        if (!res.ok) {
            const errorBody = await res.json(); // APIからのエラーレスポンスをパース
            console.error('Error from /api/image:', errorBody);
            return fail(res.status, {
                error: errorBody.error || '画像処理APIからエラーが返されました。',
                details: errorBody.details // 必要に応じて詳細も渡す
            });
        }

        const apiResponse = await res.json(); // /api/image からの成功レスポンスをパース
        // console.log("Response from /api/image API:", apiResponse); // ログで確認

        return apiResponse; 
    }
};
