import { connect, set } from "mongoose";
import { rollbar } from "../rollbar-config.js";
import { env } from "./envSchema.js";

export const connectToMongoDB = async () => {
  try {
    console.log("Starting MongoDB connection...");

    set("strictQuery", false);
    console.log("Mongoose strictQuery set to false");

    if (!env.MONGO_CONNECTION_STRING) {
      throw new Error("MONGO_CONNECTION_STRING is not defined in env");
    }
    console.log("MONGO_CONNECTION_STRING found, connecting...");

    const db = await connect(env.MONGO_CONNECTION_STRING);
    console.log("MongoDB connected successfully!");
    console.log("Connection name:", db.connection.name);
    console.log("Connection readyState:", db.connection.readyState); // 1 = connected

  } catch (error: unknown) {
    console.error("MongoDB connection failed!");
    if (error instanceof Error) {
      rollbar.error(error);
      console.error("MongoDB connection error message:", error.message);
    } else {
      rollbar.error(error as any);
      console.error("MongoDB connection error:", error);
    }
    process.exit(1); // zakończ proces jeśli MongoDB nie działa
  }
};
