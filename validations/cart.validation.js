import { z } from 'zod'

export const cartSchema = z.object({
    customer_id: z
        .string()
        .uuid("Invalid UUID format for 'customer_id'")
        .nullable(),
    product_id: z
        .string()
        .uuid("Invalid UUID format for 'product_id'")
        .nullable(),
    quantity: z
        .number()
        .int('Quantity must be an integer')
        .positive('Quantity must be greater than zero'),
    added_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format for 'added_at'",
    }),
})
