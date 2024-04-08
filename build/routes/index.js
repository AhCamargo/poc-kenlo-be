"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_documentation_json_1 = __importDefault(require("../config/swagger_documentation.json"));
const customerRoutes_1 = require("./customerRoutes");
const questionRoutes_1 = require("./questionRoutes");
exports.routes = (0, express_1.Router)();
exports.routes.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_documentation_json_1.default));
exports.routes.use(customerRoutes_1.customerRoutes);
exports.routes.use(questionRoutes_1.questionRoutes);
