
import { Router } from 'express';

import UserController from "../controller/UserController";
import UserService from "../service/UserService";
import ProductService from "../service/ProductService";
import ProductController from "../controller/ProductController";


const router = Router();
const userService = new UserService();
const productService: ProductService = new ProductService();
 let userController = new UserController(userService);
 let productController = new ProductController(productService);


router.get('/users/:id', userController.getUserById.bind(userController));
router.post('/users', userController.createUser.bind(userController))
router.patch('/users/:id', userController.updateUser.bind(userController))
router.delete('/users/:id', userController.deleteUser.bind(userController))

router.get('/products', productController.getAllProducts.bind(productController))
router.post('/products', productController.createProduct.bind(productController))

export default router;