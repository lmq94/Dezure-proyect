import User from '../interface/User';
import UserModel from "../model/UserModel";
import ProductDTO from "../interface/ProductDTO";



class UserService {

    constructor() {
    }


    async createUser(userData: User): Promise<UserModel> {
        try {

            let newUser: UserModel;

            newUser = await UserModel.create(userData as any);
            return newUser;
        }  catch (error) {

            throw new Error('Error al crear usuario: ' + error.message);
        }
    }

    async findUserById(userId: number): Promise<UserModel> {
        try {
            return await UserModel.findByPk(userId);
        } catch (error) {

            throw new Error('Error al buscar usuario por ID: ' + error.message);
        }
    }

    async updateUser(userId: number, updatedUserData: any): Promise<UserModel | null> {
        try {
            const user = await UserModel.findByPk(userId);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            return await user.update(updatedUserData);
        } catch (error) {
            throw new Error('Error al actualizar usuario');
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
            throw new Error('Error al eliminar usuario');
        }
    }

    async getUserByEmail(email: string): Promise<User | null> {
        try {
            return await UserModel.findOne({where: {email}});
        } catch (error) {
            throw new Error('Error al obtener usuario por email');
        }
    }


}

export default UserService;