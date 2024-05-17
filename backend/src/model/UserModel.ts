import {DataTypes, Model} from 'sequelize';
import User from '../interface/User';
import sequelize from "../../config/dataBase";

class UserModel extends Model<User> implements User {
    id: number;
    email: string;
    password: string;
    username: string;


}

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
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