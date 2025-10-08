import { DataSource } from "typeorm";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { Order } from "./models/entities/order.js";
import { OrderItem } from "./models/entities/orderItem.js";
import { User } from "./models/entities/user.js";
import { Product } from "./models/entities/product.js";
import { Cart } from "./models/entities/cart.js";
import { CartItem } from "./models/entities/cartItem.js";
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
    synchronize: false,
    logging: true,
    entities: [Order, OrderItem, User, Product, Cart, CartItem],
    subscribers: [],
    migrations: [path.join(__dirname, "./migrations/*{.ts,.js}")],
    migrationsRun: true,
});
//# sourceMappingURL=data-source.js.map