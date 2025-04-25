import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateSummaryFromGemini(pdfText: string) {
  let retries = 3;
  let delay = 2000;

  while (retries > 0) {
    try {
      const result = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `${SUMMARY_SYSTEM_PROMPT}\n\nTransform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
              },
            ],
          },
        ],
        config: {
          temperature: 0.7,
          maxOutputTokens: 1500,
        },
      });

      if (!result.text) {
        throw new Error("Empty response from Gemini API");
      }

      return result.text;
    } catch (error: any) {
      if (error?.status === 429) {
        retries--;
        await sleep(delay);
        delay *= 2;
      } else {
        throw error;
      }
    }
  }
  throw new Error("RATE_LIMIT_EXCEEDED");
}
