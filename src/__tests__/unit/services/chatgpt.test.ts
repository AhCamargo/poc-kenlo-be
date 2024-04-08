import { generateResponse } from "../../../services/chatgpt";

jest.mock("openai", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [{ text: "Response from GPT" }],
        }),
      },
    },
  })),
}));

const messageChatGpt =
  "You exceeded your current quota, please check your plan and billing details. For more information on this error, read the docs: https://platform.openai.com/docs/guides/error-codes/api-errors.";

describe("generateResponse", () => {
  it("should generate a response message", async () => {
    const response = await generateResponse("Question");

    expect(response).toEqual(messageChatGpt);
  });
});
