
import ProductModel from "../model/ProductModel";
import {Op} from "sequelize";
import ProductDTO from "../interface/ProductDTO";


class ProductService{

    constructor() {
    }

    private productToDTO(productModel: any): ProductDTO {
        return {
            category: productModel.category,
            description: productModel.description,
            stock_quantity: productModel.stock_quantity,
            name: productModel.name,
            price: productModel.price
        };
    }


    async getAllProducts(page: number, pageSize: number) {
        const offset = (page - 1) * pageSize;
        const { count, rows: products } = await ProductModel.findAndCountAll({
            limit: pageSize,
            offset,
        });
        const productsDTO = products.map(product => this.productToDTO(product));
        return { productsDTO, totalItems: count };
    }

    async getFilteredProducts(page: number, pageSize: number, filterField: string, filterValue: string) {
        const offset = (page - 1) * pageSize;
        const where: any = {};
        if (filterField === 'name') {
            where[filterField] = { [Op.like]: `%${filterValue}%` };
        } else {
            where[filterField] = filterValue;
        }
        const { count, rows: products } = await ProductModel.findAndCountAll({
            where,
            limit: pageSize,
            offset,
        });

        const productsDTO = products.map(product => this.productToDTO(product));
        return { productsDTO, totalItems: count };
    }


    async updateProduct(id_product: number, updatedProductData: any): Promise<ProductModel | null> {
        try {
            const product = await ProductModel.findByPk(id_product);
            if (!product) {
                throw new Error('Producto no encontrado');
            }
            return await product.update(updatedProductData);
        } catch (error) {
            throw new Error('Error al actualizar producto');
        }
    }

    async deleteProduct(id_product: number): Promise<void> {
        try {
            const product = await ProductModel.findByPk(id_product);
            if (!product) {
                throw new Error('Producto no encontrado');
            }
            await product.destroy();
        } catch (error) {
            throw new Error('Error al eliminar producto');
        }
    }


}

export default ProductService;