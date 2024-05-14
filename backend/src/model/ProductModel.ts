import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/dataBase';
import Product from "../interface/Product";


class ProductModel extends Model implements Product{
    public id!: number;
    public name!: string;
    public description!: string;
    public price!: number;
    public stock_quantity!: number;
    public category!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


}

    ProductModel.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
            description: {
                type: new DataTypes.TEXT,
                allowNull: true,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            stock_quantity: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            category: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },

        },
            {
                tableName: 'product',
                    sequelize,
            }


    );


export default ProductModel;
