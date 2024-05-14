
import { Request, Response } from 'express';


import ProductService from "../service/ProductService";
import UserModel from "../model/UserModel";
import ProductModel from "../model/ProductModel";



class ProductController {
    private productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
    }
    async getAllProducts(req: Request, res: Response) {
        try {
            let products = await this.productService.findAllProduct();
            return res.json(products);
        } catch (error) {
            console.error('Error al obtener productos:', error);
            return res.status(500).json({ message: 'Error al obtener productos' });
        }
    }

    public async createProduct(req: Request, res: Response): Promise<Response> {
        try {
            const { name, description, price, stock_quantity, category} = req.body;

            if (!name || !description || !price || stock_quantity || category) {
                return res.status(400).json({ message: 'Todos los campos son obligatorios' });
            }

            const newProduct: ProductModel = await ProductModel.create({ name, description, price, stock_quantity, category });

            return res.status(201).json(newProduct);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al crear el producto' });
        }
    }
}

export default ProductController;