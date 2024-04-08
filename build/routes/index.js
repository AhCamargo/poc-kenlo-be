"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const customerRoutes_1 = require("./customerRoutes");
const questionRoutes_1 = require("./questionRoutes");
exports.routes = (0, express_1.Router)();
exports.routes.use(customerRoutes_1.customerRoutes);
exports.routes.use(questionRoutes_1.questionRoutes);
