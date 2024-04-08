"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCustomers = exports.createCustomer = void 0;
const customerModel_1 = __importDefault(require("../models/customerModel"));
const zod_1 = require("zod");
const customerSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string().min(10).max(11),
});
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validationResult = customerSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                message: "Dados de entrada inválidos",
                errors: validationResult.error.errors,
            });
        }
        const { name, email, phone } = validationResult.data;
        const existingCustomer = yield customerModel_1.default.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({
                message: "E-mail já existe na base de dados",
            });
        }
        const customer = new customerModel_1.default({ name, email, phone });
        yield customer.save();
        return res.status(201).json(customer);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `Erro interno do servidor. ${error}` });
    }
});
exports.createCustomer = createCustomer;
const getAllCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield customerModel_1.default.find();
        return res.status(200).json(customers);
    }
    catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
});
exports.getAllCustomers = getAllCustomers;
