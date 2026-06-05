import dotenv from "dotenv"
dotenv.config()
import { GoogleGenAI } from "@google/genai";

const ApiKey = process.env.API_KEY;

const ai = new GoogleGenAI({apiKey : ApiKey});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: [
      // giving history to llm model
      // {
      //   role:"user",
      //   parts: [{text: "what is my name"}]
      // },
      // {
      //   role:"model",
      //   parts: [{text: "I don't know your name yet! Since I don't have access to your personal information, you'll have to tell me. What should I call you?"}]
      // },
      // {
      //   role:"user",
      //   parts : [{text: "My name is Boss"}]
      // },
      // {
      //   role:"user",
      //   parts: [{text: "what is my name"}]
      // }
      {
        role:"user",
        parts: [{text: "what is current date ? "}]
      }
    ]
  });
  console.log(response.text);
}

await main();