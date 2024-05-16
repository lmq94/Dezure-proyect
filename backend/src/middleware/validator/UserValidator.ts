import { body, validationResult, ValidationError } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const createUserValidationRules = () => [
    body('username')
        .notEmpty().withMessage('El nombre de usuario es obligatorio')
        .isLength({ min: 1 }).withMessage('El nombre de usuario debe tener al menos 1 letra'),
    body('email')
        .isEmail().withMessage('Debe proporcionar un correo electrónico válido'),
    body('password')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

export const updateUserValidationRules = () => [
    body('username')
        .optional()
        .isLength({ min: 1 }).withMessage('El nombre de usuario debe tener al menos 1 letra'),
    body('email')
        .optional()
        .isEmail().withMessage('Debe proporcionar un correo electrónico válido'),
    body('password')
        .optional()
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

