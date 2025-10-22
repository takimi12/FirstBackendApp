import dotenv from "dotenv";
dotenv.config();

import express from "express";
import type { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import "reflect-metadata";
import http from "http";
import { Server } from "socket.io";

import { AppDataSource } from "./data-source.js";
import apiV1 from "./routes/v1/index.js";
import pages from "./routes/pages/index.js";
import { rollbar } from "./rollbar-config.js";
import { swaggerDocs } from "./swagger.js";
import { initRedis } from "./redisClient.js";
import { connectToMongoDB } from "./config/mongoose.js";
import { registerChatSocketHandlers } from "./socket/chatHandler.js"; // 👈 Twój handler socketów

// ==================================================
// Express App
// ==================================================
const app: Express = express();
const port = process.env.PORT || 3000;

// ==================================================
// Middleware
// ==================================================
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*", // pozwól na połączenia z dowolnego źródła (np. Postman, frontend)
    credentials: true,
  })
);

// ==================================================
// Routes
// ==================================================
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Express + TypeScript Server is running!");
});

app.use("/api/v1", apiV1);
app.use("/pages", pages);

// Widoki
app.set("view engine", "ejs");
app.set("views", "src/views");

// Swagger docs
swaggerDocs(app);

// 404 handler
app.use((req, res) => {
  res.status(404).send("<h1>404 - Not found</h1>");
});

// Rollbar error handler
app.use(rollbar.errorHandler());

// ==================================================
// HTTP + Socket.IO
// ==================================================
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*", // 🔥 zezwól na dowolne źródło
    methods: ["GET", "POST"],
  },
});

// ✅ Rejestracja obsługi socketów (chat, pokoje, autoryzacja itd.)
registerChatSocketHandlers(io);

// ==================================================
// Start serwera i inicjalizacja baz
// ==================================================
AppDataSource.initialize()
  .then(async () => {
    try {
      console.log("🔹 AppDataSource initialized");

      await connectToMongoDB();
      console.log("✅ MongoDB connected successfully");

      await initRedis();
      console.log("✅ Redis initialized successfully");

      httpServer.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
        rollbar.log("Server started successfully ✅");
      });
    } catch (error) {
      console.error("❌ Failed to connect to services:", error);
      rollbar.error(error as any);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("❌ Failed to initialize AppDataSource:", err);
    rollbar.error(err as any);
    process.exit(1);
  });
