import { google_cloud_tts } from "$lib/config/googleCloudClient";
import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

export const POST: RequestHandler = async ({url, request}) => {
    const language = url.searchParams.get("language");
    let languagetopost: string;
    switch (language) {
        case "日本語":
          languagetopost = "ja-JP";
          break;
        case "英語":
          languagetopost = "en-US"; // アメリカ英語をデフォルトとしています
          break;
        case "イギリス英語":
          languagetopost = "en-GB";
          break;
        case "オーストラリア英語":
          languagetopost = "en-AU";
          break;
        case "ドイツ語":
          languagetopost = "de-DE";
          break;
        case "フランス語":
          languagetopost = "fr-FR";
          break;
        case "カナダフランス語":
          languagetopost = "fr-CA";
          break;
        case "スペイン語":
          languagetopost = "es-ES";
          break;
        case "メキシコスペイン語":
          languagetopost = "es-MX";
          break;
        case "中国語":
          languagetopost = "zh-CN"; // 簡体字中国語（中国本土）
          break;
        case "台湾中国語":
          languagetopost = "zh-TW"; // 繁体字中国語（台湾）
          break;
        case "韓国語":
          languagetopost = "ko-KR";
          break;
        case "イタリア語":
          languagetopost = "it-IT";
          break;
        case "ポルトガル語":
          languagetopost = "pt-PT"; // ポルトガル語（ポルトガル）
          break;
        case "ブラジルポルトガル語":
          languagetopost = "pt-BR";
          break;
        case "ロシア語":
          languagetopost = "ru-RU";
          break;
        case "アラビア語":
          languagetopost = "ar-XA"; // 汎用的なアラビア語
          break;
        case "ヒンディー語":
          languagetopost = "hi-IN";
          break;
        case "ベンガル語":
          languagetopost = "bn-IN";
          break;
        case "オランダ語":
          languagetopost = "nl-NL";
          break;
        case "スウェーデン語":
          languagetopost = "sv-SE";
          break;
        case "デンマーク語":
          languagetopost = "da-DK";
          break;
        case "ノルウェー語":
          languagetopost = "no-NO";
          break;
        case "フィンランド語":
          languagetopost = "fi-FI";
          break;
        case "ポーランド語":
          languagetopost = "pl-PL";
          break;
        case "チェコ語":
          languagetopost = "cs-CZ";
          break;
        case "ハンガリー語":
          languagetopost = "hu-HU";
          break;
        case "トルコ語":
          languagetopost = "tr-TR";
          break;
        case "タイ語":
          languagetopost = "th-TH";
          break;
        case "ベトナム語":
          languagetopost = "vi-VN";
          break;
        case "インドネシア語":
          languagetopost = "id-ID";
          break;
        case "マレー語":
          languagetopost = "ms-MY";
          break;
        default: // どのケースにも一致しない場合
          languagetopost = "en-US"; // デフォルトとしてアメリカ英語を返します
          break;
      }
    const {text} = await request.json();
    const [response] = await google_cloud_tts.synthesizeSpeech({
        input:{text},
        voice:{languageCode: `${languagetopost}`, ssmlGender: 'MALE', },
        audioConfig: {audioEncoding: 'MP3', speakingRate:0.9}
    });
    return new Response(response.audioContent as Buffer, {
        headers: {
            'Content-Type': 'audio/mpeg'
        }
    })
    } 
