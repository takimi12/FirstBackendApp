import { z } from "zod";
// Walidacja parametru id (UUID)
export const productIdSchema = z.object({
    params: z.object({
        id: z.string().uuid(),
    }),
});
// Walidacja tworzenia nowego produktu
export const createProductSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required"),
        price: z.number().positive("Price must be positive"),
        stock: z.number().int().nonnegative().optional(),
        description: z.string().max(150).optional(),
    }),
});
// Walidacja aktualizacji produktu
export const updateProductSchema = z.object({
    params: z.object({
        id: z.string().uuid(),
    }),
    body: z.object({
        name: z.string().optional(),
        price: z.number().positive().optional(),
        stock: z.number().int().nonnegative().optional(),
        description: z.string().max(150).optional(),
    }),
});
// Walidacja query params dla paginacji, filtrowania i sortowania
export const getProductsSchema = z.object({
    query: z.object({
        page: z.coerce.number().int().positive().default(1),
        perPage: z.coerce.number().int().positive().default(10),
        sortBy: z.string().default("createdAt"),
        sortDir: z.enum(["asc", "desc"]).default("asc"),
        filterBy: z.string().default(""),
        query: z.string().default(""),
    }),
});
//# sourceMappingURL=product.validator.js.map