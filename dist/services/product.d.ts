import { Product } from "../models/entities/product.js";
declare class ProductService {
    private productRepository;
    findAll(options: {
        page: number;
        perPage: number;
        sortBy: string;
        sortDir: string;
        filterBy?: string;
        query?: string;
    }): Promise<{
        data: Product[];
        pagination: {
            page: number;
            perPage: number;
            total: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            nextPage: number | null;
            prevPage: number | null;
            lastPage: number;
        };
    }>;
    findById(id: string): Promise<Product>;
    create(data: {
        name: string;
        price: number;
    }): Promise<Product>;
    update(id: string, data: Partial<Product>): Promise<Product>;
    delete(id: string): Promise<import("typeorm").UpdateResult>;
}
export default ProductService;
//# sourceMappingURL=product.d.ts.map