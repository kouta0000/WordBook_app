
import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { google_genai } from "$lib/config/googleCloudClient";
import { Type } from "@google/genai";
import { supabase } from "$lib//config/supabaseClient";

export const POST: RequestHandler = async ({url, request}) => {
    const language = url.searchParams.get("language");
    const type = url.searchParams.get("type");
    const id = url.searchParams.get("id");
    const regenerate = url.searchParams.get("regenerate")
    const {text} = await request.json();
    let prompt:string = "";
    let schema = {
          type: Type.OBJECT,
          properties: {
            examples: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                    example:{
                        type:Type.STRING,
                    },
                    translation:{
                        type:Type.STRING
                    }    
                }
              },
            },
          },
      };
    if (type == "synonym") {
        const res = await supabase.from("Words").select("synonym").eq("id",id);
        if (res.data?.[0].synonym && !regenerate) {
            return new Response(res.data[0].synonym, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        prompt = `${language}の${text}の類語の例を${language}で４つ。日本語の翻訳付きで。原文と訳文混在不可。`;
        
    } else if (type == "collocation") {
        const res = await supabase.from("Words").select("collocation").eq("id",id);
        if (res.data?.[0].collocation && !regenerate) {
            return new Response(res.data[0].collocation, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        prompt = `${language}の${text}を用いた共起表現の例を4つ（各4語以内）。日本語の翻訳付きで。原文と訳文混在不可。`;
    } else if (type == "sentence" ) {
        const res = await supabase.from("Words").select("sentence").eq("id",id);
        if (res.data?.[0].sentence && !regenerate) {
            return new Response(res.data[0].sentence, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        prompt = `${language}の${text}を使った簡潔な例文を2つ(60字以内)。日本語訳を別に付与。原文に訳文混入絶対不可。`
    };
    const response = await google_genai.models.generateContent({
        model: 'models/gemini-2.0-flash-lite',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: schema
          },
    });
    if (type == "synonym") {
        const {error} = await supabase.from("Words").update({synonym:response.text}).eq("id",id);
    } else if (type == "collocation") {
        const {error} = await supabase.from("Words").update({collocation:response.text}).eq("id",id);
    } else if (type == "sentence" ) {
        const {error} = await supabase.from("Words").update({sentence:response.text}).eq("id",id);
    }
    return new Response(response.text, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
} 
