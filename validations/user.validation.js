import { z } from 'zod'

export const userSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    username: z
        .string()
        .min(3, { message: 'Username must be at least 3 characters long' })
        .max(50, { message: 'Username must not exceed 50 characters' }),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .regex(/[A-Z]/, {
            message: 'Password must contain at least one uppercase letter',
        })
        .regex(/[a-z]/, {
            message: 'Password must contain at least one lowercase letter',
        })
        .regex(/[0-9]/, {
            message: 'Password must contain at least one number',
        }),
    role: z
        .enum(['admin', 'user', 'moderator'], {
            message: 'Invalid role value',
        })
        .default('user'),
    status: z
        .enum(['active', 'inactive', 'banned'], {
            message: 'Invalid status value',
        })
        .default('inactive'),
    created_at: z
        .string()
        .datetime({ message: 'Invalid datetime format' })
        .optional(),
    last_login: z
        .string()
        .datetime({ message: 'Invalid datetime format' })
        .optional(),
    updated_at: z
        .string()
        .datetime({ message: 'Invalid datetime format' })
        .optional(),
})
