import express from "express";
import dotenv from "dotenv";
import apiV1 from "./routes/v1"; // importujemy api v1
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
// endpoint główny
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server + zmiany");
});
// podłączenie api v1 pod ścieżkę /api/v1
app.use("/api/v1", apiV1);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map