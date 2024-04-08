"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
require("dotenv/config");
require("./services/mongodb");
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_documentation_json_1 = __importDefault(require("./config/swagger_documentation.json"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.routes);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_documentation_json_1.default));
if (!process.env.SERVER_PORT) {
    console.error("A variável de ambiente SERVER_PORT não está definida.");
    process.exit(1);
}
const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
});
