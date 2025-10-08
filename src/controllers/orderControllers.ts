import type { Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Order } from "../models/entities/order.js";
import { Cart } from "../models/entities/cart.js";
import type { AuthRequest } from "../middlewares/isAuth.js";
import { User } from "../models/entities/user.js";
export const createOrderFromCart = async (req: AuthRequest, res: Response) => {
    try {
      // ✅ używamy uid z Firebase
      const externalId = req.user?.uid;
  
      if (!externalId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      const userRepository = AppDataSource.getRepository(User);
      const cartRepository = AppDataSource.getRepository(Cart);
      const orderRepository = AppDataSource.getRepository(Order);
  
      // 🔍 pobieramy użytkownika po externalId
      const user = await userRepository.findOne({
        where: { externalId },
      });
  
      if (!user) {
        return res.status(404).json({ message: "Użytkownik nie istnieje" });
      }
  
      // ✅ pobieramy koszyk tego użytkownika
      const cart = await cartRepository.findOne({
        where: { user: { id: user.id } },
        relations: ["items", "items.product", "user"],
      });
  
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "Koszyk jest pusty" });
      }
  
      const subtotal = cart.items.reduce(
        (sum, item) => sum + Number(item.product.price) * item.quantity,
        0
      );
      const tax = subtotal * 0.23;
      const total = subtotal + tax;
  
      const order = orderRepository.create({
        user,
        customerName: req.body.customerName || user.externalId,
        customerEmail: req.body.customerEmail || req.user?.email || "brak",
        subtotal,
        tax,
        total,
        items: cart.items.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: Number(item.product.price),
          total: Number(item.product.price) * item.quantity,
        })),
      });
  
      await orderRepository.save(order);
  
      // 🧹 czyścimy koszyk po złożeniu zamówienia
      cart.items = [];
      await cartRepository.save(cart);
  
      return res.status(201).json({
        message: "Zamówienie utworzone",
        orderId: order.id,
        pdfUrl: `/api/v1/pdf/${order.id}`,
      });
    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(500).json({ message: "Błąd podczas tworzenia zamówienia" });
    }
  };
  