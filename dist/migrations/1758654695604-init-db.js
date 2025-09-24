import { Product } from "../models/product.js"; // upewnij się, że ścieżka jest poprawna
export class InitDb1758654695604 {
    async up(queryRunner) {
        // Dodanie produktów
        await queryRunner.manager.insert(Product, [
            { name: "Product 1", description: "Opis produktu 1", price: 100.15, stock: 10 },
            { name: "Product 2", description: "Opis produktu 2", price: 200.22, stock: 20 },
            { name: "Product 3", description: "Opis produktu 3", price: 300.22, stock: 30 },
        ]);
    }
    async down(queryRunner) {
        // Usunięcie produktów przy cofnięciu migracji
        await queryRunner.manager.delete(Product, [
            { name: "Product 1" },
            { name: "Product 2" },
            { name: "Product 3" },
        ]);
    }
}
//# sourceMappingURL=1758654695604-init-db.js.map