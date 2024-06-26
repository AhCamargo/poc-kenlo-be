import express from "express";
import "express-async-errors";
import "dotenv/config";
import "./services/mongodb";
import cors from "cors";
import { routes } from "./routes";

import swaggerUi from "swagger-ui-express";
import swaggerFile from "./config/swagger_documentation.json";

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

if (!process.env.SERVER_PORT) {
  console.error("A variável de ambiente SERVER_PORT não está definida.");
  process.exit(1);
}
const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});
