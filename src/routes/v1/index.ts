import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../../controllers/product.js";
import { loginUser, logoutUser, registerUser } from "../../controllers/authcontrollers.js";
import { verifyToken, type AuthRequest } from "../../middlewares/isAuth.js"; 
import { getUserCart, addToCart, removeFromCart } from "../../controllers/cart.js";

const router = Router();

router.get("/product", getProducts);
router.get("/product/:id", getProduct);
router.post("/product", createProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

router.post("/auth/login", loginUser);
router.post("/auth/register", registerUser);
router.post("/logout", logoutUser);


router.get("/cart", verifyToken, getUserCart);
router.post("/cart/add", verifyToken, addToCart);
router.post("/cart/remove", verifyToken, removeFromCart);

router.get("/secure-data", verifyToken, (req, res) => {
  const user = (req as AuthRequest).user; 
  res.json({ message: "Dane tylko dla zalogowanych użytkowników", user });
});

router.get("/cart", verifyToken, getUserCart);
export default router;
