import { z, ZodError } from "zod";
import ReviewService from "../services/review.js";
const reviewService = new ReviewService();
// ======================
// Zod Schemas
// ======================
const createReviewSchema = z.object({
    body: z.object({
        name: z.string().min(1).max(100),
        email: z.string().email().max(100),
        message: z.string().min(1).max(1000),
        rating: z.number().int().min(1).max(5),
        productId: z.string().min(1),
    }),
});
const updateReviewSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
    body: z.object({
        name: z.string().min(1).max(100).optional(),
        email: z.string().email().max(100).optional(),
        message: z.string().min(1).max(1000).optional(),
        rating: z.number().int().min(1).max(5).optional(),
    }),
});
// ======================
// CONTROLLER METHODS
// ======================
export const createReview = async (req, res) => {
    try {
        const { body } = createReviewSchema.parse(req);
        const review = await reviewService.create(body);
        res.status(201).json(review);
    }
    catch (error) {
        if (error instanceof ZodError) {
            const issues = error.format();
            return res.status(400).json({ message: "Invalid request data", errors: issues });
        }
        console.error("Review creation error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const getReviews = async (req, res) => {
    try {
        const page = Number(req.query?.page) || 1;
        const limit = Number(req.query?.limit) || 10;
        const accepted = req.query?.accepted === "true";
        const result = await reviewService.findAll({ page, limit, accepted });
        res.json(result);
    }
    catch (error) {
        console.error("Get reviews error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const getReview = async (req, res) => {
    try {
        const id = req.params?.id;
        if (!id)
            return res.status(400).json({ message: "ID is required" });
        const review = await reviewService.findById(id);
        res.json(review);
    }
    catch (error) {
        if (error instanceof Error && error.message === "Review not found") {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(500).json({ message: "Internal server error" });
    }
};
export const updateReview = async (req, res) => {
    try {
        const { params, body } = updateReviewSchema.parse(req);
        // Usuń undefined i wymuś zgodność typów z Review
        const sanitizedBody = {};
        for (const key of ["name", "email", "message", "rating"]) {
            if (body[key] !== undefined) {
                sanitizedBody[key] = body[key]; // TS już nie narzeka
            }
        }
        const review = await reviewService.update(params.id, sanitizedBody);
        res.json(review);
    }
    catch (error) {
        if (error instanceof ZodError) {
            const issues = error.format();
            return res.status(400).json({ message: "Invalid request data", errors: issues });
        }
        if (error instanceof Error && error.message === "Review not found") {
            return res.status(404).json({ message: "Review not found" });
        }
        console.error("Update review error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const deleteReview = async (req, res) => {
    try {
        const id = req.params?.id;
        if (!id)
            return res.status(400).json({ message: "ID is required" });
        await reviewService.delete(id);
        res.status(204).send();
    }
    catch (error) {
        if (error instanceof Error && error.message === "Review not found") {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(500).json({ message: "Internal server error" });
    }
};
export const acceptReview = async (req, res) => {
    try {
        const id = req.params?.id;
        if (!id)
            return res.status(400).json({ message: "ID is required" });
        const review = await reviewService.acceptReview(id);
        res.json(review);
    }
    catch (error) {
        if (error instanceof Error && error.message === "Review not found") {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(500).json({ message: "Internal server error" });
    }
};
//# sourceMappingURL=review.js.map