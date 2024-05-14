import {DataTypes, Model} from 'sequelize';
import User from '../interface/User';
import sequelize from "../../config/dataBase";

class UserModel extends Model implements User {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true,
        },
        password: {
            type: new DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'user',
        sequelize,
    }
);

UserModel.addHook('beforeCreate', async (user: UserModel) => {
    if (user.password) {
        const bcrypt = require('bcrypt');
        user.password = await bcrypt.hash(user.password, 10);
    }
});

export default UserModel;