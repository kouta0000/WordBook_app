import textToSpeech from "@google-cloud/text-to-speech";
import { GOOGLE_APLICATION_CREDENTIALS } from "$env/static/private";
import {auth} from "google-auth-library";

const keys = JSON.parse(GOOGLE_APLICATION_CREDENTIALS)
const authClient = auth.fromJSON(keys);

export const google_cloud_tts = new textToSpeech.TextToSpeechClient({
    authClient: authClient
});