
import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { google_genai } from "$lib/config/googleCloudClient";
import { Type } from "@google/genai";
import { supabase } from "$lib//config/supabaseClient";

export const POST: RequestHandler = async ({url, request}) => {
    const language = url.searchParams.get("language");
    const {terms}:{terms:string[]} = await request.json();
    console.log(terms)
    let prompt:string = `以下の${language}の単語リストのそれぞれの単語を原形に直してtermに入れ、その簡潔な日本語訳をmeningに入れて。 単語リスト: ${terms.join(', ')}`;
    let schema = {
          type: Type.OBJECT,
          properties: {
            words: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                    term:{
                        type:Type.STRING
                    },
                    meaning:{
                        type:Type.STRING
                    }
                }    
                }
              },
            },
          };
      
    
    const response = await google_genai.models.generateContent({
        model: 'models/gemini-2.0-flash-lite',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: schema
          },
    });
    console.log(response.text)
    return new Response(response.text, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
} 
