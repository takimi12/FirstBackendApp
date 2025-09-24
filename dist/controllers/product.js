import { ZodError, z } from "zod";
import { AppDataSource } from "../data-source.js";
import { Product } from "../models/product.js";
import { rollbar } from "../rollbar-config.js";
const productRepository = AppDataSource.getRepository(Product);
// Walidatory Zod
const getProductSchema = z.object({
    params: z.object({
        id: z.string().uuid(),
    }),
});
const createProductSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        price: z.number().positive(),
        stock: z.number().optional(),
        description: z.string().max(150).optional(),
    }),
});
const updateProductSchema = z.object({
    params: z.object({
        id: z.string().uuid(),
    }),
    body: z.object({
        name: z.string().min(1).optional(),
        price: z.number().positive().optional(),
        stock: z.number().optional(),
        description: z.string().max(150).optional(),
    }),
});
// Pobieranie wszystkich produktów
export const getProducts = async (req, res) => {
    try {
        const allProducts = await productRepository.find();
        res.json(allProducts);
    }
    catch (error) {
        if (error instanceof Error)
            rollbar.error(error, req);
        else
            rollbar.error(new Error(JSON.stringify(error)), req);
        res.status(500).json({ message: "Internal server error" });
    }
};
// Pobieranie pojedynczego produktu po ID
export const getProduct = async (req, res) => {
    try {
        const { params: { id } } = await getProductSchema.parseAsync(req);
        const product = await productRepository.findOneBy({ id });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    }
    catch (error) {
        if (error instanceof ZodError) {
            // Ostrzeżenie w Rollbar, bo błąd użytkownika
            rollbar.warning(error, req);
            return res.status(400).json({
                errors: error.issues.map((i) => ({
                    path: i.path.join("."),
                    message: i.message,
                })),
            });
        }
        if (error instanceof Error)
            rollbar.error(error, req);
        else
            rollbar.error(new Error(JSON.stringify(error)), req);
        res.status(500).json({ message: "Internal server error" });
    }
};
// Tworzenie nowego produktu
export const createProduct = async (req, res) => {
    try {
        const { body } = await createProductSchema.parseAsync(req);
        const { name, price, stock, description } = body;
        const newProduct = productRepository.create({
            name,
            price,
            stock: stock ?? 0,
            description: description ?? "",
        });
        await productRepository.save(newProduct);
        res.status(201).json(newProduct);
    }
    catch (error) {
        if (error instanceof ZodError) {
            rollbar.warning(error, req);
            return res.status(400).json({
                errors: error.issues.map((i) => ({
                    path: i.path.join("."),
                    message: i.message,
                })),
            });
        }
        if (error instanceof Error)
            rollbar.error(error, req);
        else
            rollbar.error(new Error(JSON.stringify(error)), req);
        res.status(500).json({ message: "Internal server error" });
    }
};
// Aktualizacja istniejącego produktu
export const updateProduct = async (req, res) => {
    try {
        const { params, body } = await updateProductSchema.parseAsync(req);
        const product = await productRepository.findOneBy({ id: params.id });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        // Ustawienie wartości domyślnych dla optional
        if (body.stock === undefined)
            body.stock = product.stock ?? 0;
        if (body.description === undefined)
            body.description = product.description ?? "";
        Object.assign(product, body);
        const updatedProduct = await productRepository.save(product);
        res.json(updatedProduct);
    }
    catch (error) {
        if (error instanceof ZodError) {
            rollbar.warning(error, req);
            return res.status(400).json({
                errors: error.issues.map((i) => ({
                    path: i.path.join("."),
                    message: i.message,
                })),
            });
        }
        if (error instanceof Error)
            rollbar.error(error, req);
        else
            rollbar.error(new Error(JSON.stringify(error)), req);
        res.status(500).json({ message: "Internal server error" });
    }
};
// Usuwanie produktu (soft delete)
export const deleteProduct = async (req, res) => {
    try {
        const { params } = await getProductSchema.parseAsync(req);
        const result = await productRepository.softDelete(params.id);
        if (!result.affected) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        if (error instanceof ZodError) {
            rollbar.warning(error, req);
            return res.status(400).json({
                errors: error.issues.map((i) => ({
                    path: i.path.join("."),
                    message: i.message,
                })),
            });
        }
        if (error instanceof Error)
            rollbar.error(error, req);
        else
            rollbar.error(new Error(JSON.stringify(error)), req);
        res.status(500).json({ message: "Internal server error" });
    }
};
//# sourceMappingURL=product.js.map