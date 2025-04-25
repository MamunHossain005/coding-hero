import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import OpenAI from "openai";
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateSummaryFromOpenAi(pdfText: string) {
  let retries = 3;
  let delay = 2000; // Initial delay of 2 seconds

  while (retries > 0) {
    try {
      const response = await client.chat.completions.create({
        model: "gpt-4.1",
        messages: [
          {
            role: "system",
            content: SUMMARY_SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      });
      return response.choices[0].message.content;
    } catch (error: any) {
      if (error?.status === 429) {
        retries--;
        await sleep(delay); // Wait for 2 seconds before retrying
        delay *= 2; // Exponential backoff: double the delay for the next retry
    } else {
        throw error;
      }
      
    }
  }
  throw new Error('RATE_LIMIT_EXCEEDED');
}

