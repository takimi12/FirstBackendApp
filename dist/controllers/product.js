import { ZodError } from "zod";
import { AppDataSource } from "../data-source.js";
import { Product } from "../models/product.js";
import { rollbar } from "../rollbar-config.js";
import { getProductsSchema, createProductSchema, updateProductSchema, productIdSchema, } from "../validators/product.validator.js";
import { Like, Equal } from "typeorm";
const productRepository = AppDataSource.getRepository(Product);
// Pobieranie wszystkich produktów z paginacją, filtrowaniem i sortowaniem
export const getProducts = async (req, res) => {
    try {
        const { query: { page = 1, perPage = 10, sortBy = "createdAt", sortDir = "desc", filterBy, query, }, } = await getProductsSchema.parseAsync(req);
        const skip = (page - 1) * perPage;
        const take = perPage;
        const order = {
            [sortBy]: sortDir.toLowerCase() === "asc" ? "asc" : "desc",
        };
        let where = {};
        if (filterBy && query) {
            switch (filterBy) {
                case "name":
                    where = { name: Like(`%${query}%`) };
                    break;
                case "price":
                    where = { price: Equal(parseFloat(query)) };
                    break;
                // inne filtry można dodać w razie potrzeby
                default:
                    where = {};
            }
        }
        const totalItems = await productRepository.count({ where });
        const products = await productRepository.find({ skip, take, where, order });
        const totalPages = Math.ceil(totalItems / perPage);
        const hasNextPage = page < totalPages;
        const hasPreviousPage = page > 1;
        const nextPage = hasNextPage ? page + 1 : null;
        const prevPage = hasPreviousPage ? page - 1 : null;
        const lastPage = totalPages;
        res.json({
            data: products,
            page,
            perPage,
            totalItems,
            totalPages,
            hasNextPage,
            hasPreviousPage,
            nextPage,
            prevPage,
            lastPage,
        });
    }
    catch (error) {
        if (error instanceof ZodError) {
            rollbar.warning(error, req);
            return res.status(400).json({
                errors: error.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
            });
        }
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
        const { params } = await productIdSchema.parseAsync(req);
        const product = await productRepository.findOneBy({ id: params.id });
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        res.json(product);
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
// Tworzenie nowego produktu
export const createProduct = async (req, res) => {
    try {
        const { body } = await createProductSchema.parseAsync(req);
        const newProduct = productRepository.create({
            ...body,
            stock: body.stock ?? 0,
            description: body.description ?? "",
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
// Aktualizacja produktu
export const updateProduct = async (req, res) => {
    try {
        const { params, body } = await updateProductSchema.parseAsync(req);
        const product = await productRepository.findOneBy({ id: params.id });
        if (!product)
            return res.status(404).json({ message: "Product not found" });
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
        const { params } = await productIdSchema.parseAsync(req);
        const result = await productRepository.softDelete(params.id);
        if (!result.affected)
            return res.status(404).json({ message: "Product not found" });
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