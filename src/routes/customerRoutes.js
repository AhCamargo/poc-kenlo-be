"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRoutes = void 0;
const express_1 = require("express");
const customerController_1 = require("../controllers/customerController");
exports.customerRoutes = (0, express_1.Router)();
exports.customerRoutes.post("/api/customer", customerController_1.createCustomer);
exports.customerRoutes.get("/api/customers", customerController_1.getAllCustomers);
