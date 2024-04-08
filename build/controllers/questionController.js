"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactWithChatGPT = void 0;
const customerModel_1 = __importDefault(require("../models/customerModel"));
const chatgpt_1 = require("../services/chatgpt");
const zod_1 = require("zod");
const questionSchema = zod_1.z.object({
    question: zod_1.z.string(),
    email: zod_1.z.string().email(),
});
const interactWithChatGPT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validationResult = questionSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                message: "Dados de entrada inválidos",
                errors: validationResult.error.errors,
            });
        }
        const { email, question } = validationResult.data;
        const customer = yield customerModel_1.default.findOne({ email });
        if (!customer) {
            return res.status(404).json({ message: "Cliente não encontrado." });
        }
        const chatGPTResponse = yield (0, chatgpt_1.generateResponse)(question);
        customer.questions.push({ question, answer: chatGPTResponse });
        yield customer.save();
        return res.status(200).json({ question, answer: chatGPTResponse });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `Erro interno do servidor. ${error}` });
    }
});
exports.interactWithChatGPT = interactWithChatGPT;
