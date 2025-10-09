import { z, ZodError } from "zod";
import dotenv from "dotenv";
dotenv.config();
export const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"], {
        message: "NODE_ENV must be 'development', 'production' or 'test'",
    }),
    PORT: z.string().nonempty("Provide port"),
    MONGO_CONNECTION_STRING: z.string().nonempty("Provide mongo connection string"),
    DB_HOST: z.string().nonempty("Provide db host"),
    DB_PORT: z.string().nonempty("Provide db port"),
    DB_USER: z.string().nonempty("Provide db user"),
    DB_USER_PASSWORD: z.string().nonempty("Provide db user password"),
    DB_NAME: z.string().nonempty("Provide db name"),
    FIREBASE_KEY_PATH: z.string().optional(),
    FIREBASE_STORAGE_BUCKET: z.string().optional(),
    ROLLBAR_ACCESS_TOKEN: z.string().optional(),
});
export const validateEnv = () => {
    try {
        return envSchema.parse(process.env);
    }
    catch (error) {
        if (error instanceof ZodError) {
            // Typowanie błędu jako any pozwala użyć 'errors'
            console.error("Validation failed:", error.errors);
        }
        else {
            console.error("Error parsing environment variables:", error);
        }
        throw error;
    }
};
export const env = validateEnv();
//# sourceMappingURL=envSchema.js.map