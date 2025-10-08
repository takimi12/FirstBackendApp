import { User } from "./user.js";
import type { OrderItem } from "./orderItem.js";
export declare class Order {
    id: string;
    user: User;
    userId: string;
    customerName: string;
    customerEmail: string;
    subtotal: number;
    tax: number;
    total: number;
    items: OrderItem[];
    orderDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=order.d.ts.map