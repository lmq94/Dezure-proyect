import User from '../interface/User';
import UserModel from '../model/UserModel';
import UserDTO from "../interface/UserDto";
import bcrypt from "bcrypt";

class UserService {
    constructor() {}

    private UserToDTO(UserModel: any): UserDTO {
        return {
            username: UserModel.username,
            email: UserModel.email,

        };
    }

    async createUser(userData: User): Promise<UserDTO> {
        try {
            return this.UserToDTO(await UserModel.create(userData));
        } catch (error) {
            throw new Error('Error al crear usuario: ' + error.message);
        }
    }

    async findUserById(userId: number): Promise<UserDTO | null> {

            return this.UserToDTO(await UserModel.findByPk(userId));
    }

    async updateUser(userId: number, updatedUserData: Partial<User>): Promise<UserDTO | null> {
        try {
            const user: UserModel | null = await UserModel.findByPk(userId);
            if (!user) {
                return null;
            }
            if (updatedUserData.password) {
                const bcrypt = require('bcrypt');
                const saltRounds = 10;
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, saltRounds);
            }

            await user.update(updatedUserData);

            return this.UserToDTO(user);
        } catch (error) {
            throw new Error('Error al actualizar usuario: ' + error.message);
        }
    }

    async deleteUser(userId: number): Promise<void> {
        try {
            const user = await UserModel.findByPk(userId);

            await user.destroy();
        } catch (error) {
            throw new Error('Error al eliminar usuario: ' + error.message);
        }
    }

    async getUserByEmail(email: string): Promise<UserModel | null> {
        try {
            return await UserModel.findOne({ where: { email } });
        } catch (error) {
            throw new Error('Error al obtener usuario por email: ' + error.message);
        }
    }
}

export default UserService;

