import { AppDataSource } from "../data-source.js";
import { Product } from "../models/entities/product.js";
import { Equal, Like } from "typeorm";
class ProductService {
    productRepository = AppDataSource.getRepository(Product);
    async findAll(options) {
        const { page, perPage, sortBy, sortDir, filterBy, query } = options;
        const skip = (page - 1) * perPage;
        const take = perPage;
        const order = {
            [sortBy]: sortDir.toLowerCase() === "asc" ? "asc" : "desc",
        };
        let where = {};
        if (filterBy && query) {
            switch (filterBy) {
                case "name":
                    where = { name: Like(`%${query}%`) };
                    break;
                case "category":
                    where = { category: Like(`%${query}%`) };
                    break;
                case "price":
                    where = { price: Equal(parseFloat(query)) };
                    break;
                default:
                    where = {};
            }
        }
        const [products, total] = await Promise.all([
            this.productRepository.find({ skip, take, where, order }),
            this.productRepository.count({ where }),
        ]);
        const totalPages = Math.ceil(total / perPage);
        return {
            data: products,
            pagination: {
                page,
                perPage,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
                nextPage: page < totalPages ? page + 1 : null,
                prevPage: page > 1 ? page - 1 : null,
                lastPage: totalPages,
            },
        };
    }
    async findById(id) {
        const product = await this.productRepository.findOneBy({ id });
        if (!product)
            throw new Error("Product not found");
        return product;
    }
    async create(data) {
        if (!data.name || !data.price)
            throw new Error("Missing product information");
        const product = this.productRepository.create(data);
        return await this.productRepository.save(product);
    }
    async update(id, data) {
        const product = await this.findById(id);
        Object.assign(product, {
            name: data.name ?? product.name,
            price: data.price ?? product.price,
            description: data.description ?? product.description,
            stock: data.stock ?? product.stock,
        });
        return await this.productRepository.save(product);
    }
    async delete(id) {
        const result = await this.productRepository.softDelete(id);
        if (!result.affected)
            throw new Error("Product not found");
        return result;
    }
}
export default ProductService;
//# sourceMappingURL=product.js.map