"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionRoutes = void 0;
const express_1 = require("express");
const questionController_1 = require("../controllers/questionController");
exports.questionRoutes = (0, express_1.Router)();
exports.questionRoutes.post("/api/question-customer", questionController_1.interactWithChatGPT);
