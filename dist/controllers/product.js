import { AppDataSource } from "../data-source.js";
import { Product } from "../models/product.js";
const productRepository = AppDataSource.getRepository(Product);
// Pobieranie wszystkich produktów
export const getProducts = async (req, res) => {
    try {
        const allProducts = await productRepository.find();
        res.json(allProducts);
    }
    catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
// Pobieranie pojedynczego produktu po ID
export const getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({ message: "Invalid product ID" });
        const product = await productRepository.findOneBy({ id });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    }
    catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
// Tworzenie nowego produktu
export const createProduct = async (req, res) => {
    try {
        const { name, price } = req.body;
        if (!name || !price) {
            return res.status(400).json({ message: "Missing product information" });
        }
        const newProduct = productRepository.create({ name, price });
        await productRepository.save(newProduct);
        res.status(201).json(newProduct);
    }
    catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
// Aktualizacja istniejącego produktu
export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({ message: "Invalid product ID" });
        const { name, price, stock, description } = req.body;
        const product = await productRepository.findOneBy({ id });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (name !== undefined)
            product.name = name;
        if (price !== undefined)
            product.price = Number(price);
        if (stock !== undefined)
            product.stock = Number(stock);
        if (description !== undefined)
            product.description = description;
        const updatedProduct = await productRepository.save(product);
        res.json(updatedProduct);
    }
    catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
// Usuwanie produktu (soft delete)
export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({ message: "Invalid product ID" });
        const result = await productRepository.softDelete(id);
        if (!result.affected) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
//# sourceMappingURL=product.js.map