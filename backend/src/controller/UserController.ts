import { Request, Response } from 'express';
import UserService from '../service/UserService';
import UserModel from '../model/UserModel';
import AuthService from '../service/AuthService';
import User from "../interface/User";
import CreateUserRequest from "../interface/CreateUserRequest";
import UserDTO from "../interface/UserDto";


class UserController {
    private userService: UserService;
    private authService: AuthService;

    constructor(userService: UserService, authService: AuthService) {
        this.userService = userService;
        this.authService = authService;
    }

    async getUserById(req: Request, res: Response): Promise<Response> {
        try {
            const userId: number = parseInt(req.params.id, 10);
            const user: UserDTO | null = await this.userService.findUserById(userId);

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            return res.json(user);
        } catch (error) {
            console.error('Error al obtener usuario por ID:', error);
            return res.status(500).json({ message: 'Error al obtener usuario por ID' });
        }
    }

    async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const { username, email, password }: CreateUserRequest = req.body;

            const newUser: UserDTO = await this.userService.createUser({ username, email, password });

            return res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al crear el usuario' });
        }
    }

    async updateUser(req: Request, res: Response): Promise<Response> {
        const userId: number = parseInt(req.params.id, 10);
        const updatedUserData: Partial<User> = req.body;
        try {
            const updatedUser: UserDTO | null = await this.userService.updateUser(userId, updatedUserData);
            if (!updatedUser) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            return res.json(updatedUser);
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            return res.status(500).json({ message: 'Error al actualizar usuario' });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<Response> {
        const userId: number = parseInt(req.params.id, 10);
        try {
            const result = await this.userService.deleteUser(userId);

            return res.json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password }: { email: string; password: string } = req.body;

            const result = await this.authService.login(email, password);

            return res.status(200).json(result);
        } catch (error) {
            console.error('Error al realizar el login:', error);
            return res.status(401).json({ message: 'Contraseña o email incorrectos' });
        }
    }
}

export default UserController;