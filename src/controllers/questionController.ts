import { Request, Response } from "express";
import Customer from "../models/customerModel";
import { generateResponse } from "../services/chatgpt";
import { z } from "zod";

const questionSchema = z.object({
  question: z.string(),
  email: z.string().email(),
});

export const interactWithChatGPT = async (req: Request, res: Response) => {
  try {
    const validationResult = questionSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        message: "Dados de entrada inválidos",
        errors: validationResult.error.errors,
      });
    }

    const { email, question } = validationResult.data;

    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(404).json({ message: "Cliente não encontrado." });
    }

    const chatGPTResponse = await generateResponse(question);

    customer.questions.push({ question, answer: chatGPTResponse });
    await customer.save();

    return res.status(200).json({ question, answer: chatGPTResponse });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Erro interno do servidor. ${error}` });
  }
};
