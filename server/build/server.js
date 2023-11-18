"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const connect_1 = require("./connect");
const cors_1 = __importDefault(require("cors"));
const constants_1 = require("./constants");
const server = (0, express_1.default)();
const port = 7000;
// middleware
server.use((req, res, next) => {
    res.on("finish", () => {
        console.log(req.path, req.method, res.statusCode);
    });
    next();
});
// cors
server.use((0, cors_1.default)({
    origin: constants_1.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "UPDATE"],
}));
// routes
server.use("/api/routes", routes_1.default);
// connect to database
(0, connect_1.connectToDatabase)()
    .then(() => {
    server.use("/nhl-app", routes_1.default);
    server.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
});
