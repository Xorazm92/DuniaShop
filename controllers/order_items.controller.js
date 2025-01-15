import { orderItemsService } from '../services/index.js'

export const orderItemsController = {
    getAll: async (req, res, next) => {
        try {
            const { page, limit } = req.query
            const orderItems = await orderItemsService.getAll(
                parseInt(page),
                parseInt(limit),
            )
            return res.status(200).send({
                status: 'Success',
                page,
                limit,
                orderItems,
            })
        } catch (error) {
            next(error)
        }
    },

    getById: async (req, res, next) => {
        try {
            const { id } = req.params
            const orderItem = await orderItemsService.getById(id)
            return res.status(200).send({
                status: 'Success',
                orderItem,
            })
        } catch (error) {
            next(error)
        }
    },

    getByOrderId: async (req, res, next) => {
        try {
            const { orderId } = req.params
            const orderItems = await orderItemsService.getByOrderId(orderId)
            return res.status(200).send({
                status: 'Success',
                orderItems,
            })
        } catch (error) {
            next(error)
        }
    },

    create: async (req, res, next) => {
        try {
            const orderItemData = req.body
            const newOrderItem = await orderItemsService.create(orderItemData)
            return res.status(201).send({
                status: 'Created',
                order_Item: newOrderItem,
            })
        } catch (error) {
            next(error)
        }
    },

    update: async (req, res, next) => {
        try {
            const { id } = req.params
            const updateData = req.body
            const updatedOrderItem = await orderItemsService.update(
                id,
                updateData,
            )
            return res.status(200).send({
                status: 'Success',
                updatedOrderItem,
            })
        } catch (error) {
            next(error)
        }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params
            const deletedOrderItem = await orderItemsService.delete(id)
            return res.status(200).send({
                status: 'Deleted',
                message: 'Oder item deleted successfully',
                deletedOrderItem,
            })
        } catch (error) {
            next(error)
        }
    },
}
