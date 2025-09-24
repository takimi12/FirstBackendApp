import { Router } from "express";
const router = Router();
router.get("/", (req, res) => {
    res.render("add-product");
});
router.get("/products", (req, res) => {
    const productsData = [
        { name: "Test", price: 21, desc: "lorem ipsum" }
    ];
    res.render("products", { productsData, title: "Products" });
});
export default router;
//# sourceMappingURL=index.js.map