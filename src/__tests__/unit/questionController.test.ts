import { Request, Response } from "express";
import { interactWithChatGPT } from "../../controllers/questionController";
import Customer from "../../models/customerModel";
import { generateResponse } from "../../services/chatgpt";

jest.mock("../../models/customerModel");
jest.mock("../../services/chatgpt");

describe("Chat Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

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
    it("should return 200 and answer if input is valid and customer exists", async () => {
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

      (Customer as jest.Mocked<any>).findOne.mockResolvedValueOnce(
        mockCustomer
      );
      (generateResponse as jest.Mocked<any>).mockResolvedValueOnce(
        mockChatGPTResponse
      );

      await interactWithChatGPT(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(Customer.findOne).toHaveBeenCalledWith({
        email: "john@example.com",
      });
      expect(generateResponse).toHaveBeenCalledWith("How are you?");
      expect(mockCustomer.questions).toEqual([
        { question: "How are you?", answer: "ChatGPT response" },
      ]);
      expect(mockCustomer.save).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        question: "How are you?",
        answer: "ChatGPT response",
      });
    });

    it("should return 404 if input is invalid", async () => {
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

      await interactWithChatGPT(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Dados de entrada inválidos",
        errors: mockValidationErrors,
      });
    });

    it("should return 404 if customer is not found", async () => {
      mockRequest.body = {
        email: "john@example.com",
        question: "How are you?",
      };

      (Customer as jest.Mocked<any>).findOne.mockResolvedValueOnce(null);

      await interactWithChatGPT(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Cliente não encontrado.",
      });
    });

    it("should return 500 if an error occurs", async () => {
      mockRequest.body = {
        email: "john@example.com",
        question: "How are you?",
      };

      const mockError = new Error("Database error");

      (Customer as jest.Mocked<any>).findOne.mockRejectedValueOnce(mockError);

      await interactWithChatGPT(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: `Erro interno do servidor. ${mockError}`,
      });
    });
  });
});
