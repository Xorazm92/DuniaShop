import { z } from 'zod'

export const reviewSchema = z.object({
    id: z.string().uuid().optional(),
    product_id: z.string().uuid({
        message: 'Product ID must be UUID',
    }),
    customer_id: z.string().uuid({
        message: 'Customer ID must be UUID',
    }),
    rating: z
        .number()
        .int()
        .min(0, {
            message: 'Rating must be a non-negative number',
        })
        .max(10, {
            message: 'Rating limit is 10',
        }),
    text: z.string().optional(),
})
