import { z } from 'zod'

export const categorySchema = z.object({
    name: z
        .string()
        .max(255, '"name" 255 belgidan oshmasligi kerak')
        .nonempty('"name" majburiy maydon'),
    description: z
        .string()
        .optional()
        .refine((val) => typeof val === 'string', {
            message: '"description" matn bo\'lishi kerak',
        }),
    tag: z.string().max(255, '"tag" 255 belgidan oshmasligi kerak').optional(),
})
