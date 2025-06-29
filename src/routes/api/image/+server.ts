import { google_cloud_tts } from "$lib/config/googleCloudClient";
import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { google_cloud_vision } from "$lib/config/googleCloudClient";

export const POST: RequestHandler = async ({url, request}) => {
  const res:{image:string} = await request.json();
  const image = res.image;
  const [result] = await google_cloud_vision.textDetection({
    image: {
        content: image,
    },
});

const detections = result.textAnnotations;
if (!detections || detections.length === 0) {
    return json({ text: 'テキストは検出されませんでした。' }, { status: 200 });
}

// 検出されたテキストを返却（最初の要素が全体のテキスト、以降が各単語など）
const fullText = detections[0].description;
const words = detections.slice(1).map(text => ({
    WordText: text.description || '',
}));


return json({ fullText, words }, { status: 200 });

}

