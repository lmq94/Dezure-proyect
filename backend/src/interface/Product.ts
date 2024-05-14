import User from "./User";

interface Product{
     id?: number;
     name: string;
     description: string;
     price: number;
     stock_quantity: number;
     category: string;
     createdAt?: Date;
     updatedAt?: Date;
}

export default Product;