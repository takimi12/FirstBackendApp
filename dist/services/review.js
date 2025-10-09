import { ReviewSchema } from "../schemas/review.js";
import ProductService from "./product.js";
const productService = new ProductService();
class ReviewService {
    validateRating(rating) {
        if (rating < 1 || rating > 5) {
            throw new Error("Rating must be between 1 and 5");
        }
    }
    async validateReview(review) {
        this.validateRating(review.rating);
        if (review.message.length < 10) {
            throw new Error("Review message must be at least 10 characters long");
        }
    }
    async create(review) {
        const product = await productService.findById(review.productId);
        if (!product) {
            throw new Error("Product not found");
        }
        await this.validateReview({
            ...review,
            createdAt: new Date(),
            accepted: false,
        });
        return await ReviewSchema.create(review);
    }
    async findById(id) {
        const review = await ReviewSchema.findById(id);
        if (!review)
            throw new Error("Review not found");
        return review;
    }
    async findAll(options) {
        const { page = 1, limit = 10, accepted } = options || {};
        const query = accepted !== undefined ? { accepted } : {};
        const [reviews, total] = await Promise.all([
            ReviewSchema.find(query)
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ createdAt: -1 }), // <- prostszy typ
            ReviewSchema.countDocuments(query),
        ]);
        return {
            reviews,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async findByProductId(productId) {
        return await ReviewSchema.find({ productId, accepted: true });
    }
    async update(id, review) {
        if (review.rating)
            this.validateRating(review.rating);
        const updated = await ReviewSchema.findByIdAndUpdate(id, review, {
            new: true,
            runValidators: true,
        });
        if (!updated)
            throw new Error("Review not found");
        return updated;
    }
    async acceptReview(id) {
        const updated = await ReviewSchema.findByIdAndUpdate(id, { accepted: true }, { new: true });
        if (!updated)
            throw new Error("Review not found");
        return updated;
    }
    async delete(id) {
        const deleted = await ReviewSchema.findByIdAndDelete(id);
        if (!deleted)
            throw new Error("Review not found");
        return deleted;
    }
    async deleteByProductId(productId) {
        return await ReviewSchema.deleteMany({ productId });
    }
}
export default ReviewService;
//# sourceMappingURL=review.js.map