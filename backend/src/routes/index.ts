
import { Router } from 'express';

import UserController from "../controller/UserController";
import UserService from "../service/UserService";
import ProductService from "../service/ProductService";
import ProductController from "../controller/ProductController";
import AuthService from "../service/AuthService";
import verifyToken from "../middleware/auth";
import LangChainController from "../controller/LangChainController";


const router = Router();
const userService = new UserService();
const productService: ProductService = new ProductService();
const authService = new AuthService(userService);
 let userController = new UserController(userService, authService);
 let productController = new ProductController(productService);
 let langChainController = new LangChainController();



/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     security:
 *       - bearerAuth: []  # Especifica que este endpoint requiere un token JWT
 *     responses:
 *       200:
 *         description: Successful response
 *       403:
 *         description: Authentication required
 *       404:
 *         description: User not found
 */
router.get('/users/:id', verifyToken, userController.getUserById.bind(userController));

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/users', userController.createUser.bind(userController));

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Authentication required
 *       404:
 *         description: User not found
 */
router.patch('/users/:id', verifyToken, userController.updateUser.bind(userController));

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       403:
 *         description: Authentication required
 *       404:
 *         description: User not found
 */
router.delete('/users/:id', verifyToken, userController.deleteUser.bind(userController));

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', userController.login.bind(userController));

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Authentication required
 *
 *   get:
 *     summary: Get a list of products with optional filtering, pagination, and category filtering
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of products per page
 *       - in: query
 *         name: filterField
 *         schema:
 *           type: string
 *         description: Name of the filter field
 *       - in: query
 *         name: filterValue
 *         schema:
 *           type: string
 *         description: Value corresponding to the filter field
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   filterField:
 *                     type: string
 *                   filterValue:
 *                     type: string
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Authentication required
 */
router.get('/products', verifyToken, productController.getAllProducts.bind(productController));

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock_quantity:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Authentication required
 */
router.post('/products', verifyToken, productController.createProduct.bind(productController));

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock_quantity:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Authentication required
 *       404:
 *         description: Product not found
 */
router.patch('/products/:id', verifyToken, productController.updateProduct.bind(productController));

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       403:
 *         description: Authentication required
 *       404:
 *         description: Product not found
 */
router.delete('/products/:id', verifyToken, productController.deleteProduct.bind(productController));

/**
 * @swagger
 * /api/query-chatGPT:
 *   get:
 *     summary: Realizar una consulta a ChatGPT mediante LangChain
 *     tags: [ChatGPT]
 *     parameters:
 *       - in: query
 *         name: text
 *         required: true
 *         schema:
 *           type: string
 *         description: Texto de la consulta a ChatGPT
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Texto de la consulta requerido
 *       500:
 *         description: Error interno del servidor
 */
router.get('/query-chatGPT', verifyToken, langChainController.handleQuery.bind(langChainController))

export default router;

