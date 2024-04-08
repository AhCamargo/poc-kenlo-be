import { Router } from "express";
import { interactWithChatGPT } from "../controllers/questionController";

export const questionRoutes = Router();

questionRoutes.post("/api/question-customer", interactWithChatGPT);
