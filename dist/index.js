import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import "reflect-metadata";
import { AppDataSource } from "./data-source.js";
import apiV1 from "./routes/v1/index.js";
import pages from "./routes/pages/index.js";
import { rollbar } from "./rollbar-config.js";
import { swaggerDocs } from "./swagger.js";
import { initRedis } from "./redisClient.js";
import { connectToMongoDB } from "./config/mongoose.js"; // MongoDB
// ==================================================
// Express App
// ==================================================
const app = express();
const port = process.env.PORT || 3000;
// ==================================================
// Middleware
// ==================================================
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
// ==================================================
// Routes
// ==================================================
// Root route
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server + zmiany");
});
// API and pages routes
app.use("/api/v1", apiV1);
app.use("/pages", pages);
// Widoki
app.set("view engine", "ejs");
app.set("views", "src/views");
// Swagger docs
swaggerDocs(app);
// 404 handler
app.use((req, res, next) => {
    res.status(404).send("<h1>Not found</h1>");
});
// Rollbar error handler
app.use(rollbar.errorHandler());
// ==================================================
// Start serwera i inicjalizacja serwisów
// ==================================================
AppDataSource.initialize()
    .then(async () => {
    try {
        console.log("🔹 AppDataSource initialized");
        // MongoDB
        await connectToMongoDB();
        console.log("✅ MongoDB connected successfully");
        // Redis
        await initRedis();
        console.log("✅ Redis initialized successfully");
        // Start serwera
        app.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
            rollbar.log("Server started successfully ✅");
        });
    }
    catch (error) {
        console.error("❌ Failed to connect to services:", error);
        rollbar.error(error);
        process.exit(1);
    }
})
    .catch((err) => {
    console.error("❌ Failed to initialize AppDataSource:", err);
    rollbar.error(err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map