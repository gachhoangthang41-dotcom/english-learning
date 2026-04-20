import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function main() {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        console.log("API Key exists?", !!apiKey);

        const genAI = new GoogleGenerativeAI(apiKey || "");
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: "You are a helpful assistant",
        });

        const chat = model.startChat({
            history: [],
        });

        console.log("Sending message...");
        const result = await chat.sendMessage("công thức thì hiện tại hoàn thành");
        console.log("Response:", result.response.text());

    } catch (e: unknown) {
        console.error("ERROR CAUGHT:");
        console.error(e instanceof Error ? e.message : e);
    }
}
main();
