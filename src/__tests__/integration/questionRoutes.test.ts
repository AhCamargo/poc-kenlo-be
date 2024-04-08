import request from "supertest";
import express from "express";
import { interactWithChatGPT } from "../../controllers/questionController";
import { questionRoutes } from "../../routes/questionRoutes";

jest.mock("../../controllers/questionController");

describe("Question Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call interactWithChatGPT when POST /api/question-customer is called", async () => {
    const app = express();
    app.use(express.json());
    app.use(questionRoutes);

    const requestData = {
      email: "john@example.com",
      question: "Test question",
    };

    (interactWithChatGPT as jest.Mock).mockImplementation((req, res) => {
      res.status(200).json({});
    });

    const response = await request(app)
      .post("/api/question-customer")
      .send(requestData)
      .expect(200);

    expect(response.status).toBe(200);
  });
});
