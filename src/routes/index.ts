import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../config/swagger_documentation.json";
import { customerRoutes } from "./customerRoutes";
import { questionRoutes } from "./questionRoutes";

export const routes = Router();

routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

routes.use(customerRoutes);
routes.use(questionRoutes);
