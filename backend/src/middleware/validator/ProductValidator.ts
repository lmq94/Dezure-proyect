import { body} from 'express-validator';


export const createProductValidationRules = () => [
    body('name')
        .isString().withMessage('El nombre debe ser un texto')
        .isLength({ min: 1 }).withMessage('El nombre es obligatorio'),
    body('description')
        .isString().withMessage('La descripción debe ser un texto')
        .isLength({ min: 1 }).withMessage('La descripción es obligatoria'),
    body('price')
        .isNumeric().withMessage('El precio debe ser un número')
        .isFloat({ gt: 0 }).withMessage('El precio debe ser mayor que 0'),
    body('stock_quantity')
        .isInt({ gt: 0 }).withMessage('La cantidad en stock debe ser un entero mayor que 0'),
    body('category')
        .isString().withMessage('La categoría debe ser un texto')
        .isLength({ min: 1 }).withMessage('La categoría es obligatoria'),
];

export const updateProductValidationRules = () => [
    body('name')
        .optional()
        .isString().withMessage('El nombre debe ser un texto')
        .isLength({ min: 1 }).withMessage('El nombre es obligatorio'),
    body('description')
        .optional()
        .isString().withMessage('La descripción debe ser un texto')
        .isLength({ min: 1 }).withMessage('La descripción es obligatoria'),
    body('price')
        .optional()
        .isNumeric().withMessage('El precio debe ser un número')
        .isFloat({ gt: 0 }).withMessage('El precio debe ser mayor que 0'),
    body('stock_quantity')
        .optional()
        .isInt({ gt: 0 }).withMessage('La cantidad en stock debe ser un entero mayor que 0'),
    body('category')
        .optional()
        .isString().withMessage('La categoría debe ser un texto')
        .isLength({ min: 1 }).withMessage('La categoría es obligatoria'),
];

