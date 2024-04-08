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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const questionController_1 = require("../../controllers/questionController");
const questionRoutes_1 = require("../../routes/questionRoutes");
jest.mock("../../controllers/questionController");
describe("Question Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should call interactWithChatGPT when POST /api/question-customer is called", () => __awaiter(void 0, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use(questionRoutes_1.questionRoutes);
        const requestData = {
            email: "john@example.com",
            question: "Test question",
        };
        questionController_1.interactWithChatGPT.mockImplementation((req, res) => {
            res.status(200).json({});
        });
        const response = yield (0, supertest_1.default)(app)
            .post("/api/question-customer")
            .send(requestData)
            .expect(200);
        expect(response.status).toBe(200);
    }));
});
