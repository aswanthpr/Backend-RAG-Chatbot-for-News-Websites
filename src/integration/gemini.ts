import { GoogleGenAI, ApiError } from "@google/genai";
import { PROMPT } from "../constants/const.values";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({apiKey:process.env["GEMINI_API_KEY"]!});

export async function callGemini(text:string): Promise<string| undefined>{
    try {
        
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `${PROMPT}\n${text}`,
        });
        return response?.text;
    } catch (error) {
        console.log(error instanceof ApiError ? error : String(error))
        return undefined
    }
}

