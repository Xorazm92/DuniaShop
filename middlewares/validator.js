import { AppError } from '../utils/appError.js';

export const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
            allowUnknown: true
        });

        if (error) {
            const errorMessage = error.details
                .map((detail) => detail.message)
                .join(', ');
            
            return next(new AppError(errorMessage, 400));
        }

        next();
    };
};
