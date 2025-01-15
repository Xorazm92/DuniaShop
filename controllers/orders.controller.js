import { ordersService } from '../services/index.js'

export const ordersController = {
    getAll: async (req, res, next) => {
        try {
            const { page, limit } = req.query
            const orders = await ordersService.getAll(
                parseInt(page),
                parseInt(limit),
            )
            return res.status(200).send({
                status: 'Success',
                page,
                limit,
                orders,
            })
        } catch (error) {
            next(error)
        }
    },

    getById: async (req, res, next) => {
        try {
            const { id } = req.params
            const order = await ordersService.getById(id)
            return res.status(200).send({
                status: 'Success',
                order,
            })
        } catch (error) {
            next(error)
        }
    },

    create: async (req, res, next) => {
        try {
            const orderData = req.body
            const newOrder = await ordersService.create(orderData)
            return res.status(201).send({
                status: 'Created',
                newOrder,
            })
        } catch (error) {
            next(error)
        }
    },

    update: async (req, res, next) => {
        try {
            const { id } = req.params
            const updateData = req.body
            const updatedOrder = await ordersService.update(id, updateData)
            return res.status(200).send({
                status: 'Updated',
                updatedOrder,
            })
        } catch (error) {
            next(error)
        }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params
            const deletedOrder = await ordersService.delete(id)
            return res.status(200).send({
                status: 'Deleted',
                message: 'Order deleted successfully',
                deletedOrder,
            })
        } catch (error) {
            next(error)
        }
    },
}
