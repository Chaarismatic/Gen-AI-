import dotenv from 'dotenv'
dotenv.config()
import { GoogleGenAI } from "@google/genai";
import readlineSync from 'readline-sync'

const API_KEY = process.env.API_KEY
const ai = new GoogleGenAI({apiKey : API_KEY});


async function main() {
  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    history : [],
    config :{
      // systemInstruction : `Hello My name is Boss . And today's date is ${new Date()}`
      systemInstruction : `you are a coding tutor ,
                            you will answer only coding related to question,
                            Rules to follow :
                              - only reply coding related question in short and crisp way
                              - reply rudely and use words like "gawar" to user if there is no coding related question 
                              ex : Abe gawar m tuje ghar aake marunga 
                              - reply using hinglish language `
    },
    // contents: "Chal array ke bare me bata chup chap",
    // contents: "Tell me today's date",
    // contents: "chal apna naam bata",
  });

// using readlineSync to give question from terminal  ,  and store history with history []

  while(true){
    const question = readlineSync.question("Ask me question")

    if(question == "exit"){
      break
    }

    const answer = await chat.sendMessage({
      message : question
    })

    console.log(answer.text)
  }

  // const response1 = await chat.sendMessage({
  //   message : "tera naam kya h ?"
  // })
  // console.log("chat response 1:", response1.text);
}

await main();