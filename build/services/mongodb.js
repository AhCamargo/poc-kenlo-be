"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
if (!process.env.MONGODB_URL) {
    throw new Error("A variável de ambiente MONGODB_URL não está definida.");
}
mongoose_1.default
    .connect(process.env.MONGODB_URL)
    .then(() => {
    console.log("Conexão com o MongoDB estabelecida com sucesso.");
})
    .catch((error) => {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
});
