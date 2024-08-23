import { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "ai/prompts";
import { OpenAIStream, StreamingTextResponse } from "ai";

export async function POST(req:Request) {
    try {
        const body = await req.json();
        const messages=body.messages;

        const openai=new OpenAI();

        const systemMessage: ChatCompletionMessageParam = {
            role: "system",
            content: "You are a legal assistant chatbot designed to help users navigate labor laws and workplace issues. Your primary functions are to provide information on rights related to injuries on duty, guide users through reporting employers or unsafe practices, and answer general labor law questions. Respond clearly and concisely, ensuring users understand their rights and the appropriate steps to take. If you don’t know the answer, guide them on where to find further assistance."
        };

          const response = await openai.chat.completions.create({
            model:"gpt-3.5-turbo",
            stream:true,
            messages:[systemMessage,...messages]
        });

        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);

        

    } catch (error) {
        console.error(error)
        return Response.json({error:"Internal Server Error"},{status:500})
    }
}