import { paymentsService } from '../services/index.js'

export const paymentsController = {
    getAll: async (req, res, next) => {
        try {
            const { page, limit } = req.query
            const payments = await paymentsService.getAll(
                parseInt(page),
                parseInt(limit),
            )
            return res.status(200).send({
                status: 'Success',
                page,
                limit,
                payments,
            })
        } catch (error) {
            next(error)
        }
    },

    getById: async (req, res, next) => {
        try {
            const { id } = req.params
            const payment = await paymentsService.getById(id)
            return res.status(200).send({
                status: 'Success',
                payment,
            })
        } catch (error) {
            next(error)
        }
    },

    create: async (req, res, next) => {
        try {
            const paymentData = req.body
            const newPayment = await paymentsService.create(paymentData)
            return res.status(201).send({
                status: 'Created',
                newPayment,
            })
        } catch (error) {
            next(error)
        }
    },

    update: async (req, res, next) => {
        try {
            const { id } = req.params
            const updateData = req.body
            const updatedPayment = await paymentsService.update(id, updateData)
            return res.status(200).send({
                status: 'Updated',
                updatedPayment,
            })
        } catch (error) {
            next(error)
        }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params
            const deletedPayment = await paymentsService.delete(id)
            return res.status(200).send({
                status: 'Deleted',
                message: 'Orders deleted successfully',
                deletedPayment,
            })
        } catch (error) {
            next(error)
        }
    },
}
