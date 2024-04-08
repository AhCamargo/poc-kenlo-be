import { Request, Response } from "express";
import { createCustomer } from "../../controllers/customerController";
import Customer from "../../models/customerModel";
import { z } from "zod";

jest.mock("../../models/customerModel");

describe("Customer Controller", () => {
  describe("createCustomer", () => {
    const mockRequest = {
      body: {
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
      },
    } as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return 201 and create a new customer if input is valid", async () => {
      const mockSave = jest.fn().mockResolvedValueOnce({
        _id: "1",
        ...mockRequest.body,
      });
      (Customer as jest.Mocked<any>).mockImplementationOnce(() => ({
        save: mockSave,
      }));

      await createCustomer(mockRequest, mockResponse);

      expect(mockSave).toHaveBeenCalledTimes(1);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        save: mockSave,
      });
    });

    it("should return 400 if input is invalid", async () => {
      const invalidReq = {
        body: { name: "John Doe", email: "invalid-email", phone: "123" },
      } as Request;

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

      await createCustomer(invalidReq, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Dados de entrada inválidos",
        errors: [responseErrorEmail, responseErrorPhone],
      });
    });

    it("should return 500 if an error occurs during creation", async () => {
      const mockSave = jest
        .fn()
        .mockRejectedValueOnce(new Error("Database error"));
      (Customer as jest.Mocked<any>).mockImplementationOnce(() => ({
        save: mockSave,
      }));

      await createCustomer(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Erro interno do servidor. Error: Database error",
      });
    });
  });
});
