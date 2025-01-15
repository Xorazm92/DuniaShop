import { z } from 'zod'

export const priceHistorySchema = z.object({
    product_id: z.string().uuid(),
    old_price: z.number().min(0, 'Old price must be a positive number'),
    new_price: z.number().min(0, 'New price must be a positive number'),
    modified_by_user_id: z.string().uuid(),
})
