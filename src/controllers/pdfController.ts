import type { Request, Response } from "express";
import pdfDocument from "pdfkit";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface OrderData {
  id: string;
  customerName: string;
  customerEmail: string;
  orderDate: Date;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
}

export const getPdfById = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    // Walidacja parametru orderId
    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    // TODO: Pobierz dane zamówienia z bazy danych
    // const orderData = await getOrderFromDatabase(orderId);
    // if (!orderData) {
    //   return res.status(404).json({ message: "Order not found" });
    // }
    
    // Przykładowe dane - zastąp prawdziwymi danymi z bazy
    const orderData: OrderData = {
      id: orderId,
      customerName: "Jan Kowalski",
      customerEmail: "jan.kowalski@example.com",
      orderDate: new Date(),
      items: [
        { name: "Laptop Dell", quantity: 1, price: 2500, total: 2500 },
        { name: "Mysz bezprzewodowa", quantity: 2, price: 50, total: 100 },
      ],
      subtotal: 2600,
      tax: 598,
      total: 3198
    };

    // Tworzymy document
    const doc = new pdfDocument({ margin: 50 });

    // Ustawienie odpowiednich headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=invoice-${orderId}.pdf`);

    // Wysyłamy PDF bezpośrednio do response (bez zapisywania na dysku)
    doc.pipe(res);

    // === HEADER FAKTURY ===
    doc
      .fontSize(24)
      .font("Helvetica-Bold")
      .text("FAKTURA", { align: "center" })
      .moveDown(2);

    // === INFORMACJE O FIRMIE I KLIENCIE ===
    let currentY = doc.y || 100; // fallback jeśli doc.y jest undefined
    
    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .text("Wystawca:", 50, currentY);
    
    currentY = doc.y || currentY + 15;
    doc
      .font("Helvetica")
      .text("Twoja Firma Sp. z o.o.")
      .text("ul. Przykładowa 123")
      .text("00-000 Warszawa")
      .text("NIP: 123-456-78-90")
      .moveDown();

    currentY = doc.y || currentY + 80;
    doc
      .font("Helvetica-Bold")
      .text("Nabywca:", 50, currentY);
    
    currentY = doc.y || currentY + 15;
    doc
      .font("Helvetica")
      .text(orderData.customerName)
      .text(orderData.customerEmail)
      .moveDown();

    // === DANE FAKTURY ===
    const invoiceInfoY = doc.y || currentY + 60;
    doc
      .font("Helvetica-Bold")
      .text(`Numer faktury: ${orderData.id}`, 350, invoiceInfoY)
      .font("Helvetica")
      .text(`Data wystawienia: ${orderData.orderDate.toLocaleDateString('pl-PL')}`, 350, invoiceInfoY + 15)
      .moveDown(2);

    // === TABELA Z PRODUKTAMI ===
    const tableTop = (doc.y || 200) + 20;
    const tableLeft = 50;
    const rowHeight = 25;
    const colWidths: number[] = [200, 80, 80, 80, 100]; // szerokości kolumn

    // Nagłówki tabeli
    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .text("Nazwa produktu", tableLeft, tableTop)
      .text("Ilość", tableLeft + (colWidths[0] || 200), tableTop)
      .text("Cena jedn.", tableLeft + (colWidths[0] || 200) + (colWidths[1] || 80), tableTop)
      .text("Wartość", tableLeft + (colWidths[0] || 200) + (colWidths[1] || 80) + (colWidths[2] || 80), tableTop);

    // Linia pod nagłówkami
    const totalTableWidth = colWidths.reduce((sum, width) => sum + (width || 0), 0);
    doc
      .moveTo(tableLeft, tableTop + 15)
      .lineTo(tableLeft + totalTableWidth, tableTop + 15)
      .stroke();

    // Wiersze z produktami
    currentY = tableTop + rowHeight; // Aktualizujemy istniejącą zmienną currentY
    doc.font("Helvetica").fontSize(9);

    orderData.items.forEach((item, index) => {
      doc
        .text(item.name, tableLeft, currentY)
        .text(item.quantity.toString(), tableLeft + (colWidths[0] || 200), currentY)
        .text(`${item.price.toFixed(2)} zł`, tableLeft + (colWidths[0] || 200) + (colWidths[1] || 80), currentY)
        .text(`${item.total.toFixed(2)} zł`, tableLeft + (colWidths[0] || 200) + (colWidths[1] || 80) + (colWidths[2] || 80), currentY);
      
      currentY += rowHeight;
    });

    // === PODSUMOWANIE ===
    const summaryY = currentY + 30;
    const summaryLeft = 350;

    doc
      .font("Helvetica")
      .fontSize(10)
      .text(`Suma netto: ${orderData.subtotal.toFixed(2)} zł`, summaryLeft, summaryY)
      .text(`Podatek VAT (23%): ${orderData.tax.toFixed(2)} zł`, summaryLeft, summaryY + 15)
      .font("Helvetica-Bold")
      .fontSize(12)
      .text(`SUMA BRUTTO: ${orderData.total.toFixed(2)} zł`, summaryLeft, summaryY + 40);

    // === STOPKA ===
    const pageHeight = doc.page.height || 792; // A4 height fallback
    doc
      .fontSize(8)
      .font("Helvetica")
      .text(
        "Dziękujemy za zakupy!",
        50,
        pageHeight - 100,
        { align: "center" }
      );

    // === NUMERACJA STRON ===
    const range = doc.bufferedPageRange();
    const pageCount = range ? range.count : 1;
    
    for (let i = 0; i < pageCount; i++) {
      doc.switchToPage(i);
      doc
        .fontSize(8)
        .text(
          `Strona ${i + 1} z ${pageCount}`,
          50,
          pageHeight - 50,
          { align: "right" }
        );
    }

    // Zamknięcie dokumentu
    doc.end();

  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ 
      message: "Błąd podczas generowania PDF",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

// Helper function do pobierania danych zamówienia z bazy
// async function getOrderFromDatabase(orderId: string): Promise<OrderData | null> {
//   try {
//     // Implementacja pobierania danych z bazy
//     // np. używając Prisma:
//     // const order = await prisma.order.findUnique({
//     //   where: { id: orderId },
//     //   include: { items: true, customer: true }
//     // });
//     // return order ? mapToOrderData(order) : null;
//     return null;
//   } catch (error) {
//     console.error("Database error:", error);
//     return null;
//   }
// }

// Helper function do mapowania danych z bazy na OrderData
// function mapToOrderData(dbOrder: any): OrderData {
//   return {
//     id: dbOrder.id,
//     customerName: dbOrder.customer.name,
//     customerEmail: dbOrder.customer.email,
//     orderDate: dbOrder.createdAt,
//     items: dbOrder.items.map((item: any) => ({
//       name: item.product.name,
//       quantity: item.quantity,
//       price: item.price,
//       total: item.quantity * item.price
//     })),
//     subtotal: dbOrder.subtotal,
//     tax: dbOrder.tax,
//     total: dbOrder.total
//   };
// }