// import { Router } from "express";
// import {
//   createProduct,
//   deleteProduct,
//   getProduct,
//   getProducts,
//   updateProduct,
// } from "../../controllers/product.js";
// import { loginUser, logoutUser, registerUser } from "../../controllers/authcontrollers.js";
// import { verifyToken, type AuthRequest } from "../../middlewares/isAuth.js"; 
// import { getUserCart, addToCart, removeFromCart } from "../../controllers/cart.js";
// import { cacheMiddleware } from "../../middlewares/cache.js";
// import uploadImage from "../../controllers/upload.js";
// import { getPdfById } from "../../controllers/pdfController.js";
// import { convertSpreadsheet } from "../../controllers/excelController.js";
// import multer from "multer";
// const router = Router();
// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Product:
//  *       type: object
//  *       required:
//  *         - name
//  *         - price
//  *       properties:
//  *         id:
//  *           type: string
//  *           description: The auto-generated id of the product
//  *         name:
//  *           type: string
//  *           description: Product name
//  *         description:
//  *           type: string
//  *           description: Product description
//  *         price:
//  *           type: number
//  *           description: Product price
//  *         stock:
//  *           type: integer
//  *           description: Quantity in stock
//  *         createdAt:
//  *           type: string
//  *           format: date-time
//  *           description: Date product was created
//  *         updatedAt:
//  *           type: string
//  *           format: date-time
//  *           description: Date product was last updated
//  *         deletedAt:
//  *           type: string
//  *           format: date-time
//  *           nullable: true
//  *           description: Date product was soft-deleted
//  *         cartId:
//  *           type: string
//  *           format: uuid
//  *           nullable: true
//  *           description: ID of the cart this product belongs to (if any)
//  *       example:
//  *         id: "d5fE_asz"
//  *         name: "Product 1"
//  *         description: "Sample description"
//  *         price: 99.99
//  *         stock: 10
//  *         createdAt: 2020-03-10T04:05:06.157Z
//  *         updatedAt: 2020-03-10T04:05:06.157Z
//  *         deletedAt: null
//  *         cartId: null
//  */
// /**
//  * @swagger
//  * /product:
//  *   get:
//  *     summary: Get all products
//  *     tags: [Product]
//  *     responses:
//  *       200:
//  *         description: List of all products
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Product'
//  *       500:
//  *         description: Server error
//  */
// router.get("/product", getProducts);
// /**
//  * @swagger
//  * /product/{id}:
//  *   get:
//  *     summary: Get a product by ID
//  *     tags: [Product]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *           format: uuid
//  *         description: Product UUID
//  *     responses:
//  *       200:
//  *         description: Product found
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Product'
//  *       404:
//  *         description: Product not found
//  *       500:
//  *         description: Server error
//  */
// router.get("/product/:id", getProduct);
// /**
//  * @swagger
//  * /product:
//  *   post:
//  *     summary: Create a new product
//  *     tags: [Product]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Product'
//  *     responses:
//  *       201:
//  *         description: Product created successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Product'
//  *       400:
//  *         description: Invalid input
//  *       500:
//  *         description: Server error
//  */
// router.post("/product", createProduct);
// /**
//  * @swagger
//  * /product/{id}:
//  *   put:
//  *     summary: Update an existing product
//  *     tags: [Product]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *           format: uuid
//  *         description: Product UUID
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               description:
//  *                 type: string
//  *               price:
//  *                 type: number
//  *               stock:
//  *                 type: integer
//  *     responses:
//  *       200:
//  *         description: Product updated successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Product'
//  *       400:
//  *         description: Invalid input
//  *       404:
//  *         description: Product not found
//  *       500:
//  *         description: Server error
//  */
// router.put("/product/:id", updateProduct);
// /**
//  * @swagger
//  * /product/{id}:
//  *   delete:
//  *     summary: Delete a product
//  *     tags: [Product]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *           format: uuid
//  *         description: Product UUID
//  *     responses:
//  *       200:
//  *         description: Product deleted successfully
//  *       404:
//  *         description: Product not found
//  *       500:
//  *         description: Server error
//  */
// router.delete("/product/:id", deleteProduct);
// /**
//  * @swagger
//  * /products:
//  *   get:
//  *     summary: Get products with filtering, sorting and pagination
//  *     tags: [Product]
//  *     parameters:
//  *       - in: query
//  *         name: page
//  *         schema:
//  *           type: integer
//  *           default: 1
//  *         description: Page number
//  *       - in: query
//  *         name: perPage
//  *         schema:
//  *           type: integer
//  *           default: 10
//  *         description: Number of items per page
//  *       - in: query
//  *         name: sortBy
//  *         schema:
//  *           type: string
//  *           default: createdAt
//  *         description: Field to sort by
//  *       - in: query
//  *         name: sortDir
//  *         schema:
//  *           type: string
//  *           enum: [asc, desc]
//  *           default: desc
//  *         description: Sort direction
//  *       - in: query
//  *         name: filterBy
//  *         schema:
//  *           type: string
//  *           enum: [name, price]
//  *         description: Field to filter by
//  *       - in: query
//  *         name: query
//  *         schema:
//  *           type: string
//  *         description: Filter value
//  *     responses:
//  *       200:
//  *         description: List of products with pagination metadata
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 data:
//  *                   type: array
//  *                   items:
//  *                     $ref: '#/components/schemas/Product'
//  *                 page:
//  *                   type: integer
//  *                 perPage:
//  *                   type: integer
//  *                 totalItems:
//  *                   type: integer
//  *                 totalPages:
//  *                   type: integer
//  *                 hasNextPage:
//  *                   type: boolean
//  *                 hasPreviousPage:
//  *                   type: boolean
//  *                 nextPage:
//  *                   type: integer
//  *                   nullable: true
//  *                 prevPage:
//  *                   type: integer
//  *                   nullable: true
//  *                 lastPage:
//  *                   type: integer
//  */
// router.get("/products", getProducts);
// // 🛑 Reszta endpointów (auth, cart, secure-data) możesz opisać podobnie później
// router.post("/auth/login", loginUser);
// router.post("/auth/register", registerUser);
// router.post("/logout", logoutUser);
// router.get("/cart", verifyToken, getUserCart);
// router.post("/cart/add", verifyToken, addToCart);
// router.post("/cart/remove", verifyToken, removeFromCart);
// router.get("/secure-data", verifyToken, (req, res) => {
//   const user = (req as AuthRequest).user; 
//   res.json({ message: "Dane tylko dla zalogowanych użytkowników", user });
// });
// // cache dla jednego produktu (klucz = "product:{id}")
// router.get(
//   "/product/:id",
//   cacheMiddleware((req) => `product:${req.params.id}`, 60), // TTL = 60s
//   getProduct
// );
// // cache dla listy produktów (klucz = "products")
// router.get(
//   "/products",
//   cacheMiddleware((req) => `products:${JSON.stringify(req.query)}`, 60), 
//   getProducts
// );
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
//   fileFilter: (req, file, cb) => {
//     if (["image/jpeg", "image/png"].includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Invalid file type"));
//     }
//   },
// });
// // Endpoint do uploadu plików
// router.post(
//   "/upload",
//   upload.single("file"),
//   (req, res, next) => uploadImage(req as any, res).catch(next)
// );
// const uploadSpreadsheet = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype ===
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
//       file.mimetype === "text/csv"
//     ) {
//       cb(null, true);
//     } else {
//       cb(new Error("Invalid file type"));
//     }
//   },
// });
// router.post(
//   "/excel",
//   verifyToken,
//   uploadSpreadsheet.single("file"),
//   convertSpreadsheet as any // <-- rzutujemy tymczasowo na `any`
// );
// router.get("/pdf/:orderId", verifyToken, getPdfById);
// export default router;
import { Router } from "express";
import multer from "multer";
// Controllers
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct, } from "../../controllers/product.js";
import { loginUser, logoutUser, registerUser } from "../../controllers/authcontrollers.js";
import { getUserCart, addToCart, removeFromCart } from "../../controllers/cart.js";
import { getPdfById } from "../../controllers/pdfController.js";
import { convertSpreadsheet } from "../../controllers/excelController.js";
import uploadImage from "../../controllers/upload.js";
// Middlewares
import { verifyToken } from "../../middlewares/isAuth.js";
import { cacheMiddleware } from "../../middlewares/cache.js";
import { createOrderFromCart } from "../../controllers/orderControllers.js";
const router = Router();
// =====================================
// MULTER CONFIGURATIONS
// =====================================
// Configuration for image uploads
const uploadImageConfig = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
    fileFilter: (req, file, cb) => {
        if (["image/jpeg", "image/png"].includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error("Invalid file type"));
        }
    },
});
// Configuration for spreadsheet uploads
const uploadSpreadsheetConfig = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            file.mimetype === "text/csv") {
            cb(null, true);
        }
        else {
            cb(new Error("Invalid file type"));
        }
    },
});
// =====================================
// AUTHENTICATION ROUTES
// =====================================
router.post("/auth/login", loginUser);
router.post("/auth/register", registerUser);
router.post("/auth/logout", logoutUser);
// =====================================
// PRODUCT ROUTES
// =====================================
// Get all products with filtering, sorting and pagination
router.get("/products", cacheMiddleware((req) => `products:${JSON.stringify(req.query)}`, 60), getProducts);
// Get single product by ID (with cache)
router.get("/product/:id", cacheMiddleware((req) => `product:${req.params.id}`, 60), // TTL = 60s
getProduct);
// Create new product
router.post("/product", verifyToken, createProduct);
// Update existing product
router.put("/product/:id", verifyToken, updateProduct);
// Delete product
router.delete("/product/:id", verifyToken, deleteProduct);
// =====================================
// CART ROUTES
// =====================================
router.get("/cart", verifyToken, getUserCart);
router.post("/cart/add", verifyToken, addToCart);
router.post("/cart/remove", verifyToken, removeFromCart);
// =====================================
// FILE HANDLING ROUTES
// =====================================
// Upload images
router.post("/upload", verifyToken, uploadImageConfig.single("file"), (req, res, next) => uploadImage(req, res).catch(next));
// Process Excel/CSV files
router.post("/excel", verifyToken, uploadSpreadsheetConfig.single("file"), convertSpreadsheet);
// Generate PDF
router.get("/pdf/:orderId", verifyToken, getPdfById);
// =====================================
// PROTECTED ROUTES
// =====================================
router.get("/secure-data", verifyToken, (req, res) => {
    const user = req.user;
    res.json({
        message: "Dane tylko dla zalogowanych użytkowników",
        user
    });
});
router.post("/order/create", verifyToken, createOrderFromCart);
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: Product name
 *         description:
 *           type: string
 *           description: Product description
 *         price:
 *           type: number
 *           description: Product price
 *         stock:
 *           type: integer
 *           description: Quantity in stock
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         cartId:
 *           type: string
 *           format: uuid
 *           nullable: true
 *       example:
 *         id: "d5fE_asz"
 *         name: "Product 1"
 *         description: "Sample description"
 *         price: 99.99
 *         stock: 10
 */
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get products with filtering, sorting and pagination
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: createdAt
 *       - in: query
 *         name: sortDir
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *       - in: query
 *         name: filterBy
 *         schema:
 *           type: string
 *           enum: [name, price]
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of products with pagination metadata
 */
/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 */
/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
export default router;
//# sourceMappingURL=index.js.map