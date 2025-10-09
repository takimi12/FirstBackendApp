import { z } from "zod";
export declare const envSchema: z.ZodObject<{
    NODE_ENV: z.ZodEnum<{
        development: "development";
        production: "production";
        test: "test";
    }>;
    PORT: z.ZodString;
    MONGO_CONNECTION_STRING: z.ZodString;
    DB_HOST: z.ZodString;
    DB_PORT: z.ZodString;
    DB_USER: z.ZodString;
    DB_USER_PASSWORD: z.ZodString;
    DB_NAME: z.ZodString;
    FIREBASE_KEY_PATH: z.ZodOptional<z.ZodString>;
    FIREBASE_STORAGE_BUCKET: z.ZodOptional<z.ZodString>;
    ROLLBAR_ACCESS_TOKEN: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type EnvConfig = z.infer<typeof envSchema>;
export declare const validateEnv: () => EnvConfig;
export declare const env: {
    NODE_ENV: "development" | "production" | "test";
    PORT: string;
    MONGO_CONNECTION_STRING: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USER: string;
    DB_USER_PASSWORD: string;
    DB_NAME: string;
    FIREBASE_KEY_PATH?: string | undefined;
    FIREBASE_STORAGE_BUCKET?: string | undefined;
    ROLLBAR_ACCESS_TOKEN?: string | undefined;
};
//# sourceMappingURL=envSchema.d.ts.map