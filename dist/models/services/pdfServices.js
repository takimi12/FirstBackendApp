import { AppDataSource } from "../../data-source.js";
import { Order } from "../entities/order.js";
/**
 * Pobiera zamówienie wraz z powiązanymi pozycjami i produktami
 * @param orderId - ID zamówienia
 * @returns dane zamówienia lub null jeśli nie istnieje
 */
export const getOrderWithDetails = async (orderId) => {
    const orderRepository = AppDataSource.getRepository(Order);
    // Pobieramy zamówienie z relacjami: items -> product oraz user
    const order = await orderRepository.findOne({
        where: { id: orderId },
        relations: ["items", "items.product", "user"],
    });
    if (!order) {
        return null;
    }
    // Mapujemy dane do formatu dla PDF
    const items = order.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: Number(item.price), // decimal w TypeORM może być string
        total: Number(item.total),
    }));
    return {
        id: order.id,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        orderDate: order.orderDate,
        items,
        subtotal: Number(order.subtotal),
        tax: Number(order.tax),
        total: Number(order.total),
    };
};
//# sourceMappingURL=pdfServices.js.map