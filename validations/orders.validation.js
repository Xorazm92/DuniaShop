import { z } from 'zod'

export const orderBodySchema = z.object({
    customer_id: z.string().uuid(),
    total_amount: z.number().min(0, {
        message:
            'Total amount must be non-negative, Minus son bolmasligi kerak',
    }),
    discount_amount: z.number().min(0).optional(),
    delivery_fee: z.number().min(0).optional(),
    status: z
        .enum([
            'pending',
            'confirmed',
            'delivered',
            'cancelled',
            'returned',
            'failed',
        ])
        .optional(),
    delivery_type: z
        .enum([
            'standard',
            'express',
            'same_day',
            'pickup',
            'scheduled',
            'international',
            'drone',
        ])
        .optional(),
    delivery_address: z
        .string()
        .min(5, { message: 'Delivery address is too short juda qisqa' })
        .optional(),
})
