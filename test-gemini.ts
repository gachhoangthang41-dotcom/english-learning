import { GoogleGenerativeAI } from "@google/generative-ai";

async function test() {
  const genAI = new GoogleGenerativeAI("AIzaSyC-jTjnUmZCZLMew_BJ2AXHdFgApoQyA-Y");
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    systemInstruction: "You are a helpful assistant.",
  });

  try {
    const chat = model.startChat({
        history: [{ role: "user", parts: [{ text: "hi" }] }],
    });

    const result = await chat.sendMessage("hello");
    console.log("Success:", result.response.text());
  } catch (error) {
    console.error("Error:", error);
  }
}

test();
