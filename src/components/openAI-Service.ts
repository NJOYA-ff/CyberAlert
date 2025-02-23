import axios from "axios";
import OpenAI from "openai";
const API_KEY =
  "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";
const API_URL = "https://api.openai.com/v1/audio/translations";

export const generateText = async (prompt: string) => {
  const openai = new OpenAI({
    apiKey:
      "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",
    dangerouslyAllowBrowser: true,
  });

  const completion = openai.chat.completions.create({
    model: "gpt-4o-mini",
    store: true,
    messages: [{ role: "user", content: "write a haiku about ai" }],
  });

  return completion.then((result: any) => result.choices[0].message.content);
};
