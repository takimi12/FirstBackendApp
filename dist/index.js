import express from "express";
import dotenv from "dotenv";
import apiV1 from "./routes/v1/index.js";
import pages from "./routes/pages/index.js";
import bodyParser from "body-parser";
import "reflect-metadata";
import { AppDataSource } from "./data-source.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { rollbar } from "./rollbar-config.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
// app.use(bodyParser.json({ limit: "50mb", type: "application/json" })); //format application/json
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); //urlencoded przyda się później na pliki
app.use(bodyParser.json());
app.use(cookieParser()); // Middleware do parsowania ciasteczek
app.use(cors({
    origin: "http://localhost:3000", // Adres frontendowy w przyszłości z env
    credentials: true, // Pozwala na przesyłanie ciasteczek
}));
// wrócić tu
//app.use(express.json());
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server + zmiany");
});
app.use("/api/v1", apiV1);
app.use("/pages", pages);
app.use((req, res, next) => {
    res.status(404).send("<h1>Not found</h1>");
});
app.set("view engine", "ejs");
app.set("views", "src/views");
// 🚀 Rollbar middleware musi być NA SAMYM KOŃCU
app.use(rollbar.errorHandler());
AppDataSource.initialize().then(() => {
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
        rollbar.log("Server started successfully ✅"); // testowy log
    });
});
//# sourceMappingURL=index.js.map