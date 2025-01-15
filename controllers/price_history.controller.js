import { priceHistoryService } from '../services/index.js'

export const priceHistoryController = {
    getAll: async (req, res, next) => {
        try {
            const history = await priceHistoryService.getAll()
            return res.status(200).send({
                status: 'Success',
                history,
            })
        } catch (error) {
            next(error)
        }
    },

    getById: async (req, res, next) => {
        try {
            const { id } = req.params
            const history = await priceHistoryService.getById(id)
            return res.status(200).send({
                status: 'Success',
                history,
            })
        } catch (error) {
            next(error)
        }
    },

    getByProductId: async (req, res, next) => {
        try {
            const { product_id } = req.params
            const history = await priceHistoryService.getByProductId(product_id)
            return res.status(200).send({
                status: 'Success',
                history,
            })
        } catch (error) {
            next(error)
        }
    },

    getByUserId: async (req, res, next) => {
        try {
            const { user_id } = req.params
            const history = await priceHistoryService.getByUserId(user_id)
            return res.status(200).send({
                status: 'Success',
                history,
            })
        } catch (error) {
            next(error)
        }
    },

    create: async (req, res, next) => {
        try {
            const historyData = req.body
            const newHistory = await priceHistoryService.create(historyData)
            return res.status(201).send({
                status: 'Created',
                newHistory,
            })
        } catch (error) {
            next(error)
        }
    },

    update: async (req, res, next) => {
        try {
            const { id } = req.params
            const updateData = req.body
            const updatedHistory = await priceHistoryService.update(
                id,
                updateData,
            )
            return res.status(200).send({
                status: 'Updated',
                updatedHistory,
            })
        } catch (error) {
            next(error)
        }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params
            const deletedHistory = await priceHistoryService.delete(id)
            return res.status(200).send({
                status: 'Deleted',
                message: 'Price history deleted successfully',
                deletedHistory,
            })
        } catch (error) {
            next(error)
        }
    },
}
