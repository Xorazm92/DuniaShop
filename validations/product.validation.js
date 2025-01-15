import { z } from 'zod'

export const productSchema = z.object({
    id: z.string().uuid().optional(),
    name: z
        .string()
        .min(1, '"name" majburiy maydon')
        .nonempty('"name" bosh bolishi mumkin emas'),
    short_description: z.string().optional(),
    full_description: z.string().optional(),
    category_id: z.string().uuid().optional(),
    seller_id: z.string().uuid().optional(),
    price: z
        .number()
        .min(0, '"price" musbat raqam bolishi kerak')
        .nonnegative('"price" 0 dan kichik bolmasligi kerak'),
    discount_price: z
        .number()
        .optional()
        .refine((val) => val === undefined || val >= 0, {
            message: '"discount_price" 0 dan kichik bolmasligi kerak',
        }),
    quantity: z.number().int().nonnegative().default(0),
    status: z.enum(['active', 'sold', 'on_sale']).default('active'),
    image_urls: z.array(z.string().url()).optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
})
