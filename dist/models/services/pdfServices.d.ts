export interface OrderItemData {
    name: string;
    quantity: number;
    price: number;
    total: number;
}
export interface OrderData {
    id: string;
    customerName: string;
    customerEmail: string;
    orderDate: Date;
    items: OrderItemData[];
    subtotal: number;
    tax: number;
    total: number;
}
/**
 * Pobiera zamówienie wraz z powiązanymi pozycjami i produktami
 * @param orderId - ID zamówienia
 * @returns dane zamówienia lub null jeśli nie istnieje
 */
export declare const getOrderWithDetails: (orderId: string) => Promise<OrderData | null>;
//# sourceMappingURL=pdfServices.d.ts.map