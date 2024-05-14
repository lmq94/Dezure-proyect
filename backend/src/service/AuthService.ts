
import  UserService from './UserService';
import secretKey from '../../config/generateSecretKey';

class AuthService {
    private userService: UserService;
    private readonly secretKey: string;

    constructor(userService: UserService) {
        this.userService = userService;
        this.secretKey = secretKey;
    }

    async login(email: string, password: string) {
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const bcrypt = require('bcrypt');

        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            throw new Error('Invalid email or password');
        }

        const jwt = require('jsonwebtoken')
        const token = jwt.sign({ id: user.id, email: user.email }, this.secretKey, {
            expiresIn: '24h',
        });

        return { auth: true, token };
    }

    logout() {
        return { auth: false, token: null };
    }
}

export default AuthService;