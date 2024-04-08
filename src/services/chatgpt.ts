import OpenAI from "openai";

// if (!process.env.OPENAI_API_KEY && !process.env.URL_OPENAI_API) {
//   throw new Error("A variável de ambiente OPENAI_API_KEY não está definida.");
// }

const messageChatGpt =
  "You exceeded your current quota, please check your plan and billing details. For more information on this error, read the docs: https://platform.openai.com/docs/guides/error-codes/api-errors.";

export const generateResponse = async (question: string): Promise<string> => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  return messageChatGpt;
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: question }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
};
