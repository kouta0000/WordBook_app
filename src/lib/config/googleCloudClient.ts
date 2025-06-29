import textToSpeech from "@google-cloud/text-to-speech";
import { GOOGLE_APLICATION_CREDENTIALS, GEMINI_API_KEY } from "$env/static/private";
import {auth} from "google-auth-library";
import { GoogleGenAI } from "@google/genai";
import { ImageAnnotatorClient } from "@google-cloud/vision";
const keys = JSON.parse(GOOGLE_APLICATION_CREDENTIALS)
const authClient = auth.fromJSON(keys);

export const google_cloud_tts = new textToSpeech.TextToSpeechClient({
    authClient: authClient
});
export const google_genai = new GoogleGenAI({apiKey:GEMINI_API_KEY})
export const google_cloud_vision = new ImageAnnotatorClient({
    authClient: authClient
})