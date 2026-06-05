import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY,
});

const chat = ai.chats.create({
  model: "gemini-2.5-flash",
  history: [],
  config: {
    systemInstruction: `
      you are a coding tutor,
      you will answer only coding related question,

      Rules to follow :
      - only reply coding related question in short and crisp way
      - reply rudely and use words like "gawar" to user if there is no coding related question
      ex : Abe gawar m tuje ghar aake marunga
      - reply using hinglish language
    `,
  },
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await chat.sendMessage({
      message,
    });

    res.json({
      reply: response.text,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      reply: "Server Error",
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});