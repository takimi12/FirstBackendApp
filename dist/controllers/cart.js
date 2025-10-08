import { AppDataSource } from "../data-source.js";
import { Cart } from "../models/entities/cart.js";
import { CartItem } from "../models/entities/cartItem.js";
import { Product } from "../models/entities/product.js";
import { User } from "../models/entities/user.js";
const cartRepository = AppDataSource.getRepository(Cart);
const cartItemRepository = AppDataSource.getRepository(CartItem);
const productRepository = AppDataSource.getRepository(Product);
const userRepository = AppDataSource.getRepository(User);
// 📌 Pobierz koszyk zalogowanego usera
export const getUserCart = async (req, res) => {
    try {
        const id = req.user?.uid;
        if (!id)
            return res.status(400).json({ message: "Invalid request" });
        const user = await userRepository.findOne({
            where: { externalId: id },
            relations: ["cart", "cart.items", "cart.items.product"],
        });
        if (!user || !user.cart)
            return res.status(404).json({ message: "Cart not found" });
        return res.json(user.cart);
    }
    catch (error) {
        console.error("Error fetching cart:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
// 📌 Dodaj produkt do koszyka
export const addToCart = async (req, res) => {
    try {
        const id = req.user?.uid;
        const { productId, quantity } = req.body;
        if (!id || !productId)
            return res.status(400).json({ message: "Invalid request" });
        const user = await userRepository.findOne({
            where: { externalId: id },
            relations: ["cart", "cart.items", "cart.items.product"],
        });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        let cart = user.cart;
        // Jeśli lazy relation zwraca Promise
        if (cart instanceof Promise)
            cart = await cart;
        if (!cart) {
            cart = cartRepository.create({ user, items: [] });
            await cartRepository.save(cart);
            user.cart = cart;
        }
        const product = await productRepository.findOneBy({ id: productId });
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        let item = cart.items.find((i) => i.product.id === productId);
        if (item) {
            item.quantity += quantity || 1;
            await cartItemRepository.save(item);
        }
        else {
            item = cartItemRepository.create({
                cart,
                product,
                quantity: quantity || 1,
            });
            await cartItemRepository.save(item);
        }
        const updatedCart = await cartRepository.findOne({
            where: { id: cart.id },
            relations: ["items", "items.product"],
        });
        return res.json({ message: "Product added to cart", cart: updatedCart });
    }
    catch (error) {
        console.error("Error adding to cart:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
// 📌 Usuń produkt z koszyka
export const removeFromCart = async (req, res) => {
    try {
        const id = req.user?.uid;
        const { productId } = req.body;
        if (!id || !productId)
            return res.status(400).json({ message: "Invalid request" });
        const user = await userRepository.findOne({
            where: { externalId: id },
            relations: ["cart", "cart.items", "cart.items.product"],
        });
        if (!user || !user.cart)
            return res.status(404).json({ message: "Cart not found" });
        let cart = user.cart;
        if (cart instanceof Promise)
            cart = await cart;
        const item = cart.items.find((i) => i.product.id === productId);
        if (!item)
            return res.status(404).json({ message: "Product not in cart" });
        await cartItemRepository.remove(item);
        const updatedCart = await cartRepository.findOne({
            where: { id: cart.id },
            relations: ["items", "items.product"],
        });
        return res.json({ message: "Product removed from cart", cart: updatedCart });
    }
    catch (error) {
        console.error("Error removing from cart:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
//# sourceMappingURL=cart.js.map