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
exports.generateResponse = void 0;
const openai_1 = __importDefault(require("openai"));
// if (!process.env.OPENAI_API_KEY && !process.env.URL_OPENAI_API) {
//   throw new Error("A variável de ambiente OPENAI_API_KEY não está definida.");
// }
const messageChatGpt = "You exceeded your current quota, please check your plan and billing details. For more information on this error, read the docs: https://platform.openai.com/docs/guides/error-codes/api-errors.";
const generateResponse = (question) => __awaiter(void 0, void 0, void 0, function* () {
    const openai = new openai_1.default({
        apiKey: process.env.OPENAI_API_KEY,
    });
    return messageChatGpt;
    const completion = yield openai.chat.completions.create({
        messages: [{ role: "system", content: question }],
        model: "gpt-3.5-turbo",
    });
    console.log(completion.choices[0]);
});
exports.generateResponse = generateResponse;
