import mongoose from "mongoose";

if (!process.env.MONGODB_URL) {
  throw new Error("A variável de ambiente MONGODB_URL não está definida.");
}

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Conexão com o MongoDB estabelecida com sucesso.");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  });
