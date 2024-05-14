
import { Router } from 'express';

import UserController from "../controller/UserController";
import UserService from "../service/UserService";
import ProductService from "../service/ProductService";
import ProductController from "../controller/ProductController";
import AuthService from "../service/AuthService";
import verifyToken from "../middleware/auth";


const router = Router();
const userService = new UserService();
const productService: ProductService = new ProductService();
const authService = new AuthService(userService);
 let userController = new UserController(userService, authService);
 let productController = new ProductController(productService);



router.get('/users/:id', verifyToken, userController.getUserById.bind(userController));
router.post('/users', verifyToken, userController.createUser.bind(userController))
router.patch('/users/:id', verifyToken, userController.updateUser.bind(userController))
router.delete('/users/:id', verifyToken, userController.deleteUser.bind(userController))

router.post('/login', userController.login.bind(userController));

router.get('/products', verifyToken, productController.getAllProducts.bind(productController))
router.post('/products', verifyToken, productController.createProduct.bind(productController))
router.patch('/products/:id', verifyToken, productController.updateProduct.bind(productController))
router.delete('/products/:id', verifyToken, productController.deleteProduct.bind(productController))

export default router;