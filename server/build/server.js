"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
// import formatYearMonthDay from '../utils/formatYearMonthDay.ts';
const server = (0, express_1.default)();
const port = 7000;
// middleware
server.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
// routes
server.use('/api/nhl-app', routes_1.default);
server.listen(port, () => {
    console.log(`Connected successfully on: http://localhost:${port}`);
});
