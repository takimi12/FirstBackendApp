<<<<<<< Updated upstream
=======
import express from "express";
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
import { connectToMongoDB } from "./config/mongoose.js"; // MongoDB
const app = express();
const port = process.env.PORT || 3000;
// =======================
// Middleware
// =======================
=======
import { connectToMongoDB } from "./config/mongoose.js"; // import połączenia Mongo
// 🌱 Wczytanie zmiennych środowiskowych
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
// Middleware
>>>>>>> Stashed changes
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
<<<<<<< Updated upstream
// =======================
// Routes
// =======================
=======
// Root route
>>>>>>> Stashed changes
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server + zmiany");
});
// Routes
app.use("/api/v1", apiV1);
app.use("/pages", pages);
// Widoki
app.set("view engine", "ejs");
app.set("views", "src/views");
<<<<<<< Updated upstream
// Swagger
=======
// Swagger docs
>>>>>>> Stashed changes
swaggerDocs(app);
// 404 handler
app.use((req, res, next) => {
    res.status(404).send("<h1>Not found</h1>");
});
// Rollbar error handler
app.use(rollbar.errorHandler());
<<<<<<< Updated upstream
// =======================
// Start serwera
// =======================
AppDataSource.initialize().then(async () => {
    try {
        console.log("🔹 AppDataSource initialized");
        // MongoDB
        await connectToMongoDB();
        console.log("✅ MongoDB connected successfully");
        // Redis
        await initRedis();
        console.log("✅ Redis initialized successfully");
=======
// 🚀 Inicjalizacja serwisów i start serwera
AppDataSource.initialize().then(async () => {
    try {
        await connectToMongoDB(); // połączenie do MongoDB
        await initRedis(); // połączenie do Redis
>>>>>>> Stashed changes
        app.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
            rollbar.log("Server started successfully ✅");
        });
    }
    catch (error) {
<<<<<<< Updated upstream
        console.error("❌ Failed to start server:", error);
        rollbar.error(error);
=======
        console.error("❌ Failed to connect to services:", error);
>>>>>>> Stashed changes
        process.exit(1);
    }
});
//# sourceMappingURL=index.js.map