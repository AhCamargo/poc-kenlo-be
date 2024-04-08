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
const questionController_1 = require("../../controllers/questionController");
const customerModel_1 = __importDefault(require("../../models/customerModel"));
const chatgpt_1 = require("../../services/chatgpt");
jest.mock("../../models/customerModel");
jest.mock("../../services/chatgpt");
describe("Chat Controller", () => {
    let mockRequest;
    let mockResponse;
    beforeEach(() => {
        mockRequest = {
            body: {},
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe("interactWithChatGPT", () => {
        it("should return 200 and answer if input is valid and customer exists", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockCustomer = {
                email: "john@example.com",
                questions: [],
                save: jest.fn(),
            };
            const mockChatGPTResponse = "ChatGPT response";
            mockRequest.body = {
                email: "john@example.com",
                question: "How are you?",
            };
            customerModel_1.default.findOne.mockResolvedValueOnce(mockCustomer);
            chatgpt_1.generateResponse.mockResolvedValueOnce(mockChatGPTResponse);
            yield (0, questionController_1.interactWithChatGPT)(mockRequest, mockResponse);
            expect(customerModel_1.default.findOne).toHaveBeenCalledWith({
                email: "john@example.com",
            });
            expect(chatgpt_1.generateResponse).toHaveBeenCalledWith("How are you?");
            expect(mockCustomer.questions).toEqual([
                { question: "How are you?", answer: "ChatGPT response" },
            ]);
            expect(mockCustomer.save).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                question: "How are you?",
                answer: "ChatGPT response",
            });
        }));
        it("should return 404 if input is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.body = {
                email: "johnexample.com",
                question: "How are you?",
            };
            const mockValidationErrors = [
                {
                    code: "invalid_string",
                    message: "Invalid email",
                    path: ["email"],
                    validation: "email",
                },
            ];
            yield (0, questionController_1.interactWithChatGPT)(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: "Dados de entrada inválidos",
                errors: mockValidationErrors,
            });
        }));
        it("should return 404 if customer is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.body = {
                email: "john@example.com",
                question: "How are you?",
            };
            customerModel_1.default.findOne.mockResolvedValueOnce(null);
            yield (0, questionController_1.interactWithChatGPT)(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: "Cliente não encontrado.",
            });
        }));
        it("should return 500 if an error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.body = {
                email: "john@example.com",
                question: "How are you?",
            };
            const mockError = new Error("Database error");
            customerModel_1.default.findOne.mockRejectedValueOnce(mockError);
            yield (0, questionController_1.interactWithChatGPT)(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: `Erro interno do servidor. ${mockError}`,
            });
        }));
    });
});
