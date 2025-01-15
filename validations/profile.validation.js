import { z } from 'zod'

export const profileSchema = z.object({
    user_id: z.string().uuid(),
    type: z.enum(['individual', 'business']),
    company_name: z.string().optional(),
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    phone: z.string().min(9, 'number must be 9 characters'),
    address: z.string().optional(),
    birthday: z.string().optional(),
    bonus_point: z.number().int().optional(),
    discount_rate: z.number().min(0).max(100).optional(),
    bank_account_number: z.string().optional(),
    approval_date: z.string().optional(),
})
