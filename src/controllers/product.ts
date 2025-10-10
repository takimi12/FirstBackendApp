// src/controllers/product/product.ts
import type { Request, Response } from "express";
import { ZodError } from "zod";
import { AppDataSource } from "../data-source.js";
import { Product } from "../models/entities/product.js";
import { rollbar } from "../rollbar-config.js";
import {
  getProductsSchema,
  createProductSchema,
  updateProductSchema,
  productIdSchema,
} from "../validators/product.validator.js";
import { Like, Equal } from "typeorm";
import { redisClient } from "../redisClient.js";
import { CACHE_KEYS } from "../constans/cacheKeys.js";

const productRepository = AppDataSource.getRepository(Product);

// 📦 Pobieranie wszystkich produktów z paginacją, filtrowaniem i sortowaniem
export const getProducts = async (req: Request, res: Response) => {
  try {
    const {
      query: {
        page = 1,
        perPage = 10,
        sortBy = "createdAt",
        sortDir = "desc",
        filterBy,
        query,
      },
    } = await getProductsSchema.parseAsync(req);

    const skip = (page - 1) * perPage;
    const take = perPage;

    const order: Record<string, "asc" | "desc"> = {
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
        default:
          where = {};
      }
    }

    const totalItems = await productRepository.count({ where });
    const products = await productRepository.find({ skip, take, where, order });

    const totalPages = Math.ceil(totalItems / perPage);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    res.json({
      data: products,
      page,
      perPage,
      totalItems,
      totalPages,
      hasNextPage,
      hasPreviousPage,
      nextPage: hasNextPage ? page + 1 : null,
      prevPage: hasPreviousPage ? page - 1 : null,
      lastPage: totalPages,
    });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      rollbar.warning(error, req);
      return res.status(400).json({
        errors: error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      });
    }
    rollbar.error(error instanceof Error ? error : new Error(JSON.stringify(error)), req);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 📦 Pobieranie pojedynczego produktu po ID
export const getProduct = async (req: Request, res: Response) => {
  try {
    const { params } = await productIdSchema.parseAsync(req);
    const product = await productRepository.findOneBy({ id: params.id });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      rollbar.warning(error, req);
      return res.status(400).json({
        errors: error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      });
    }
    rollbar.error(error instanceof Error ? error : new Error(JSON.stringify(error)), req);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🛠️ Tworzenie nowego produktu
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { body } = await createProductSchema.parseAsync(req);

    const newProduct = productRepository.create({
      ...body,
      stock: body.stock ?? 0,
      description: body.description ?? "",
    } as Partial<Product>); // ✅ poprawka TS

    await productRepository.save(newProduct);

    // 🧹 Inwalidacja cache
    await redisClient.del(CACHE_KEYS.PRODUCTS);

    res.status(201).json(newProduct);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      rollbar.warning(error, req);
      return res.status(400).json({
        errors: error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      });
    }
    rollbar.error(error instanceof Error ? error : new Error(JSON.stringify(error)), req);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🧩 Aktualizacja produktu
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { params, body } = await updateProductSchema.parseAsync(req);

    const product = await productRepository.findOneBy({ id: params.id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    Object.assign(product, body as Partial<Product>); // ✅ poprawka TS
    const updatedProduct = await productRepository.save(product);

    // 🧹 Inwalidacja cache
    await redisClient.del(CACHE_KEYS.PRODUCTS);
    await redisClient.del(`${CACHE_KEYS.PRODUCT}:${params.id}`);

    res.json(updatedProduct);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      rollbar.warning(error, req);
      return res.status(400).json({
        errors: error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      });
    }
    rollbar.error(error instanceof Error ? error : new Error(JSON.stringify(error)), req);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🗑️ Usuwanie produktu (soft delete)
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { params } = await productIdSchema.parseAsync(req);
    const result = await productRepository.softDelete(params.id);
    if (!result.affected) return res.status(404).json({ message: "Product not found" });

    // 🧹 Inwalidacja cache
    await redisClient.del(CACHE_KEYS.PRODUCTS);
    await redisClient.del(`${CACHE_KEYS.PRODUCT}:${params.id}`);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      rollbar.warning(error, req);
      return res.status(400).json({
        errors: error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      });
    }
    rollbar.error(error instanceof Error ? error : new Error(JSON.stringify(error)), req);
    res.status(500).json({ message: "Internal server error" });
  }
};
