import express from 'express';
import dotenv from "dotenv";
import apiV1 from "./routes/v1/index.js";
import pages from "./routes/pages/index.js";
import bodyParser from "body-parser";
import "reflect-metadata";
import { AppDataSource } from "./data-source.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { rollbar } from "./rollbar-config.js";
import { swaggerDocs } from "./swagger.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000", // frontend
    credentials: true,
}));
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server + zmiany");
});
app.use("/api/v1", apiV1);
app.use("/pages", pages);
// Widoki
app.set("view engine", "ejs");
app.set("views", "src/views");
// 🚀 Swagger docs musi być PRZED 404 handler
swaggerDocs(app);
// 404 handler
app.use((req, res, next) => {
    res.status(404).send("<h1>Not found</h1>");
});
// Rollbar middleware (na końcu)
app.use(rollbar.errorHandler());
AppDataSource.initialize().then(() => {
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
        rollbar.log("Server started successfully ✅");
    });
});
//# sourceMappingURL=index.js.map