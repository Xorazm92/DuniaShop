import { z } from 'zod'

export const orderItemSchema = z.object({
    id: z.string().uuid().optional(),
    order_id: z.string().uuid({
        message: 'Order ID must be UUID',
    }),
    product_id: z.string().uuid({
        message: 'Product ID must be UUID',
    }),
    quantity: z
        .number()
        .int()
        .positive({
            message: 'Quantity must be a positive integer',
        })
        .default(1),
    price: z
        .number()
        .min(0, {
            message: 'Price must be a non-negative',
        })
        .max(99999999.99, {
            message: 'Price exceeds the allowed limit',
        }),
    discount_percent: z
        .number()
        .min(0, {
            message: 'Discount percent cannot be negative',
        })
        .max(100, {
            message: 'Discount percent cannot exceed 100',
        })
        .optional(),
})
