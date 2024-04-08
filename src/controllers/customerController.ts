import { Request, Response } from "express";
import Customer from "../models/customerModel";
import { z } from "zod";

const customerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().min(10).max(11),
});

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const validationResult = customerSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        message: "Dados de entrada inválidos",
        errors: validationResult.error.errors,
      });
    }

    const { name, email, phone } = validationResult.data;

    const customer = new Customer({ name, email, phone });

    await customer.save();

    return res.status(201).json(customer);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Erro interno do servidor. ${error}` });
  }
};

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.find();

    return res.status(200).json(customers);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};
