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
const customerController_1 = require("../../controllers/customerController");
const customerModel_1 = __importDefault(require("../../models/customerModel"));
jest.mock("../../models/customerModel");
describe("Customer Controller", () => {
    describe("createCustomer", () => {
        const mockRequest = {
            body: {
                name: "John Doe",
                email: "john@example.com",
                phone: "1234567890",
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        afterEach(() => {
            jest.clearAllMocks();
        });
        it("should return 201 and create a new customer if input is valid", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockSave = jest.fn().mockResolvedValueOnce(Object.assign({ _id: "1" }, mockRequest.body));
            customerModel_1.default.mockImplementationOnce(() => ({
                save: mockSave,
            }));
            yield (0, customerController_1.createCustomer)(mockRequest, mockResponse);
            expect(mockSave).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith({
                save: mockSave,
            });
        }));
        it("should return 400 if input is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
            const invalidReq = {
                body: { name: "John Doe", email: "invalid-email", phone: "123" },
            };
            const responseErrorEmail = {
                code: "invalid_string",
                message: "Invalid email",
                path: ["email"],
                validation: "email",
            };
            const responseErrorPhone = {
                code: "too_small",
                exact: false,
                inclusive: true,
                message: "String must contain at least 10 character(s)",
                minimum: 10,
                path: ["phone"],
                type: "string",
            };
            yield (0, customerController_1.createCustomer)(invalidReq, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: "Dados de entrada inválidos",
                errors: [responseErrorEmail, responseErrorPhone],
            });
        }));
        it("should return 500 if an error occurs during creation", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockSave = jest
                .fn()
                .mockRejectedValueOnce(new Error("Database error"));
            customerModel_1.default.mockImplementationOnce(() => ({
                save: mockSave,
            }));
            yield (0, customerController_1.createCustomer)(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: "Erro interno do servidor. Error: Database error",
            });
        }));
    });
});
