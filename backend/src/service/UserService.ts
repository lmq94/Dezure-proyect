import User from '../interface/User';
import UserModel from '../model/UserModel';

class UserService {
    constructor() {}

    async createUser(userData: User): Promise<UserModel> {
        try {
            return await UserModel.create(userData);
        } catch (error) {
            throw new Error('Error al crear usuario: ' + error.message);
        }
    }

    async findUserById(userId: number): Promise<UserModel | null> {
        try {
            return await UserModel.findByPk(userId);
        } catch (error) {
            throw new Error('Error al buscar usuario por ID: ' + error.message);
        }
    }

    async updateUser(userId: number, updatedUserData: Partial<User>): Promise<UserModel | null> {
        try {
            const user = await UserModel.findByPk(userId);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            return await user.update(updatedUserData);
        } catch (error) {
            throw new Error('Error al actualizar usuario: ' + error.message);
        }
    }

    async deleteUser(userId: number): Promise<void> {
        try {
            const user = await UserModel.findByPk(userId);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
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

