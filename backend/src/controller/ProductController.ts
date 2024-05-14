
import { Request, Response } from 'express';


import ProductService from "../service/ProductService";
import ProductModel from "../model/ProductModel";
import ProductDTO from "../interface/ProductDTO";

class ProductController {
    private productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
    }
    async getAllProducts(req: Request, res: Response) {
        try {
            const { page, filterField, filterValue } = this.extractQueryParameters(req);
            const pageSize = 10;

            let products: { totalItems: number; productsDTO: ProductDTO[] };
            if (filterField) {
                products = await this.productService.getFilteredProducts(page, pageSize, filterField, filterValue);
            } else {
                products = await this.productService.getAllProducts(page, pageSize);
            }

            const totalPages = Math.ceil(products.totalItems / pageSize);

            if (page < 1 || page > totalPages) {
                return res.status(404).json('La página solicitada no existe');
            }

            return res.json({
                page,
                pageSize,
                totalItems: products.totalItems,
                totalPages,
                products: products.productsDTO,
            });
        } catch (error) {
            console.error('Error al obtener productos:', error);
            return res.status(500).json({ message: 'Error al obtener productos' });
        }
    }

    private extractQueryParameters(req: Request) {
        const page = parseInt(req.query.page as string) || 1;
        const filterField = req.query.filterField as string;
        const filterValue = req.query.filterValue as string;
        return { page, filterField, filterValue };
    }



    public async createProduct(req: Request, res: Response): Promise<Response> {
            try {
                const { name, description, price, stock_quantity, category} = req.body;

                if (!name || !description || !price || !stock_quantity || !category) {
                    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
                }

                const newProduct: ProductModel = await ProductModel.create({ name, description, price, stock_quantity, category });

                return res.status(201).json(newProduct);

            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Error al crear el producto' });
            }
    }

    async updateProduct(req: Request, res: Response) {
        const product_id = parseInt(req.params.id);
        const updatedProductData = req.body;
        try {
            const updatedUser = await this.productService.updateProduct(product_id, updatedProductData);
            res.json(updatedProductData);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteProduct(req: Request, res: Response) {
        const product_id = parseInt(req.params.id);
        try {
            await this.productService.deleteProduct(product_id);
            res.json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }



}

export default ProductController;