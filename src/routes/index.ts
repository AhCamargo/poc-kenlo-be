import { Router } from "express";
import { customerRoutes } from "./customerRoutes";
import { questionRoutes } from "./questionRoutes";

export const routes = Router();

routes.use(customerRoutes);
routes.use(questionRoutes);
