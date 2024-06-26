import {NextFunction, Request, Response} from "express";
import {ValidationError, validationResult} from "express-validator";

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors: { [key: string]: string }[] = [];
    errors.array().map((err: ValidationError) => extractedErrors.push({ [err.msg]: err.msg }));

    return res.status(400).json({
        errors: extractedErrors,
    });
};