
import { Router } from 'express';

import UserController from "../controller/UserController";
import UserService from "../service/UserService";
import ProductService from "../service/ProductService";
import ProductController from "../controller/ProductController";
import AuthService from "../service/AuthService";
import verifyToken from "../middleware/auth";
import LangChainController from "../controller/LangChainController";
import {validate} from "../middleware/validator/Validator";
import {createUserValidationRules, updateUserValidationRules} from "../middleware/validator/UserValidator";
import {createProductValidationRules, updateProductValidationRules} from "../middleware/validator/ProductValidator";


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
 *     summary: Obtener usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     security:
 *       - bearerAuth: []  # Especifica que este endpoint requiere un token JWT
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       403:
 *         description: Autenticación requerida
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/users/:id', verifyToken, userController.getUserById.bind(userController));

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: "El nombre de usuario debe tener al menos 1 carácter."
 *               email:
 *                 type: string
 *                 format: email
 *                 description: "Debe ser una dirección de correo electrónico válida."
 *               password:
 *                 type: string
 *                 description: "La contraseña debe tener al menos 6 caracteres."
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Entrada inválida
 */
router.post('/users', createUserValidationRules(), validate, userController.createUser.bind(userController));

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Actualizar usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: "El nombre de usuario debe tener al menos 1 carácter."
 *               email:
 *                 type: string
 *                 format: email
 *                 description: "Debe ser una dirección de correo electrónico válida."
 *               password:
 *                 type: string
 *                 description: "La contraseña debe tener al menos 6 caracteres."
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Entrada inválida
 *       403:
 *         description: Autenticación requerida
 *       404:
 *         description: Usuario no encontrado
 */
router.patch('/users/:id', verifyToken, updateUserValidationRules(), validate, userController.updateUser.bind(userController));

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       403:
 *         description: Autenticación requerida
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/users/:id', verifyToken, userController.deleteUser.bind(userController));

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Inicio de sesión de usuario
 *     tags: [Usuarios]
 *     security: []
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
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', userController.login.bind(userController));

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "El nombre del producto. Obligatorio y debe ser un texto."
 *               description:
 *                 type: string
 *                 description: "La descripción del producto. Obligatoria y debe ser un texto."
 *               price:
 *                 type: number
 *                 description: "El precio del producto. Obligatorio y debe ser un número mayor que 0."
 *               stock_quantity:
 *                 type: integer
 *                 description: "La cantidad en stock del producto. Obligatoria y debe ser un entero mayor que 0."
 *               category:
 *                 type: string
 *                 description: "La categoría del producto. Obligatoria y debe ser un texto."
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Entrada inválida
 *       403:
 *         description: Autenticación requerida
 */
router.post('/products', verifyToken, createProductValidationRules(), validate, productController.createProduct.bind(productController));

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener una lista de productos con filtrado opcional, paginación (10 por pagina) y filtrado por categoría
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página para la paginación
 *       - in: query
 *         name: filterField
 *         schema:
 *           type: string
 *         description: Nombre del campo de filtro
 *       - in: query
 *         name: filterValue
 *         schema:
 *           type: string
 *         description: Valor correspondiente al campo de filtro
 *     responses:
 *       200:
 *         description: Lista de productos
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
 *         description: Entrada inválida
 *       403:
 *         description: Autenticación requerida
 */
router.get('/products', verifyToken, productController.getAllProducts.bind(productController));

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Actualizar producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "El nombre del producto. Obligatorio y debe ser un texto."
 *               description:
 *                 type: string
 *                 description: "La descripción del producto. Obligatoria y debe ser un texto."
 *               price:
 *                 type: number
 *                 description: "El precio del producto. Obligatorio y debe ser un número mayor que 0."
 *               stock_quantity:
 *                 type: integer
 *                 description: "La cantidad en stock del producto. Obligatoria y debe ser un entero mayor que 0."
 *               category:
 *                 type: string
 *                 description: "La categoría del producto. Obligatoria y debe ser un texto."
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       400:
 *         description: Entrada inválida
 *       403:
 *         description: Autenticación requerida
 *       404:
 *         description: Producto no encontrado
 */
router.patch('/products/:id', verifyToken, updateProductValidationRules(), validate, productController.updateProduct.bind(productController));

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       403:
 *         description: Autenticación requerida
 *       404:
 *         description: Producto no encontrado
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

router.get("/api/query-chatGPT", verifyToken, langChainController.handleQuery.bind(langChainController))

export default router;