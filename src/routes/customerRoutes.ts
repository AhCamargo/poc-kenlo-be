import { Router } from "express";
import {
  createCustomer,
  getAllCustomers,
} from "../controllers/customerController";

export const customerRoutes = Router();

customerRoutes.post("/api/customer", createCustomer);

customerRoutes.get("/api/customers", getAllCustomers);
