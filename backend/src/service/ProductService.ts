
import ProductModel from "../model/ProductModel";


class ProductService{

    constructor() {
    }

    async findAllProduct(): Promise<ProductModel[]> {
        try {
            return await ProductModel.findAll();
        } catch (error) {

            throw new Error('Error al buscar los productos ' + error.message);
        }
    }


}

export default ProductService;