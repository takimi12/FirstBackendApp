// import { z } from "zod";
// export const getProductSchema = z.object({
//   params: z.object({
//     id: z.string().uuid(),
//   }),
// });
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
//# sourceMappingURL=product.validator.js.map