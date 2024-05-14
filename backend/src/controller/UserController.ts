import { Request, Response } from 'express';
import UserService from '../service/UserService';
import UserModel from "../model/UserModel";

class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = new UserService();
    }

    async getUserById(req: Request, res: Response) {
        try {
            let userId = parseInt(req.params.id);
            let user = await this.userService.findUserById(userId);

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            return res.json(user);
        } catch (error) {
            console.error('Error al obtener usuario por ID:', error);
            return res.status(500).json({ message: 'Error al obtener usuario por ID' });
        }
    }

    public async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password) {
                return res.status(400).json({ message: 'Todos los campos son obligatorios' });
            }

            const newUser = await UserModel.create({ username, email, password });

            return res.status(201).json(newUser);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al crear el usuario' });
        }
    }

    async updateUser(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        const updatedUserData = req.body;
        try {
            const updatedUser = await this.userService.updateUser(userId, updatedUserData);
            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteUser(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        try {
            await this.userService.deleteUser(userId);
            res.json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

export default UserController;