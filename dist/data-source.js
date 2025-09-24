import { DataSource } from "typeorm";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (!process.env.DB_HOST ||
    !process.env.DB_PORT ||
    !process.env.DB_USER ||
    !process.env.DB_USER_PASSWORD ||
    !process.env.DB_NAME) {
    throw new Error("Please provide the database connection details");
}
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false, // ❌ wyłączamy automatyczne synchronizowanie
    logging: true,
    entities: [path.join(__dirname, "./models/*{.ts,.js}")],
    subscribers: [],
    migrations: [path.join(__dirname, "./migrations/*{.ts,.js}")],
    migrationsRun: true, // ✅ automatycznie odpali migracje przy starcie appki
});
//# sourceMappingURL=data-source.js.map