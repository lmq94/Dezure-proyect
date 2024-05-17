import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/dataBase';

class ProductModel extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public price!: number;
    public stock_quantity!: number;
    public category!: string;
}

ProductModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
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
            type: DataTypes.INTEGER,
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