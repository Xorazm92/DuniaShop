import { z } from 'zod'

export const paymentBodySchema = z.object({
    order_id: z.string().uuid({ message: 'Order ID must be UUID' }),
    payer_id: z
        .string()
        .uuid({ message: 'Payer ID must be UUID' })
        .nullable()
        .optional(),
    amount: z.number().min(0, { message: 'Amount must be a non-negativ' }),
    payment_type: z.enum([
        'credit_card',
        'debit_card',
        'paypal',
        'bank_transfer',
        'cash',
    ]),
    status: z.enum(['pending', 'paid', 'failed', 'refunded']).optional(),
})
