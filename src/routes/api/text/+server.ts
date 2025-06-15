
import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { google_genai } from "$lib/config/googleCloudClient";

export const POST: RequestHandler = async ({url, request}) => {
    const language = url.searchParams.get("language");
    const type = url.searchParams.get("type");
    const {text} = await request.json();
    let prompt:string = "";
    if (type == "synonym") {
        prompt = `あなたは本当に優秀な教師です。${language}の${text}の類語を5つ教えてください。返答は箇条書きのみで簡潔に。余計な言葉は要らない。フォーマットは以下のように。
        類義語：
        1. 英語の表現1 - 日本語訳
        2. 英語の表現2 - 日本語訳
        3. 英語の表現3 - 日本語訳
        4. 英語の表現2 - 日本語訳
        5. 英語の表現3 - 日本語訳
        `;
    } else if (type == "collocation") {
        prompt = `あなたは本当に優秀な教師です。${language}の${text}のコロケーション表現を日本語訳付きで3つ教えてください。返答は箇条書きのみで簡潔に。余計な言葉は要らない。フォーマットは以下のように。
        フレーズ：
        1. 英語の表現1 - 日本語訳
        2. 英語の表現2 - 日本語訳
        3. 英語の表現3 - 日本語訳`;
    } else if (type == "phrase" ) {
        prompt = `あなたは本当に優秀な教師です。${language}の${text}の例文を日本語訳付きで2つ作ってください。返答は箇条書きのみで簡潔に。余計な言葉は要らない。フォーマットは以下のように。
        例文：
        1. 英語の表現1 
        - 日本語訳
        2. 英語の表現2 
        - 日本語訳`
    }
    const response = await google_genai.models.generateContent({
        model: 'models/gemini-2.5-flash-preview-05-20',
        contents: prompt,
    });
    return new Response(JSON.stringify({result:response.text}), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    } 
