import { Request, Response, NextFunction } from 'express';
 import { JwtPayload } from 'jsonwebtoken';
import secretKey from '../../config/generateSecretKey';

interface CustomRequest extends Request {
    user?: string | JwtPayload;
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
    let authHeader = req.headers['authorization'];

    if (!authHeader) {
        res.status(403).json({ message: 'No token provided.' });
        return;
    }

    const token:string = authHeader.split(' ')[1];

    const jwt = require('jsonwebtoken')

    console.log(secretKey as string);
    console.log(token)

    jwt.verify(token, secretKey as string, (err: Error | null, decoded: JwtPayload | undefined) => {
        if (err) {
            res.status(500).json({ message: 'Failed to authenticate token.' });
            return;
        }

        req.user = decoded;
        next();
    });
};

export default verifyToken;