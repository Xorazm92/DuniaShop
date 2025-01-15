import {
    createCartService,
    daleteCartService,
    getCartService,
    updateCartService,
} from '../services/index.js'
import { logger } from '../utils/index.js'

export const createCartController = async (req, res, next) => {
    try {
        const body = req.body
        const newData = await createCartService(body)
        return res.status(201).send({
            message: 'created',
            data: newData[0].id,
        })
    } catch (error) {
        logger.error(error.message)

        next(error)
    }
}

export const getAllCartController = async (req, res, next) => {
    try {
        const { page, limit } = req.query
        const allData = await getCartService('all', '', +page, +limit)
        return res.status(200).send({
            message: 'success',
            data: allData,
        })
    } catch (error) {
        logger.error(error.message)

        next(error)
    }
}

export const getByIdCartController = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await getCartService('id', id)
        return res.status(200).send({
            message: 'success',
            data: data,
        })
    } catch (error) {
        logger.error(error.message)
        next(error)
    }
}

export const updateCartController = async (req, res, next) => {
    try {
        const id = req.params.id
        const body = req.body
        const data = await updateCartService(id, body)
        return res.status(200).send({
            message: 'updated',
            data: data[0].id,
        })
    } catch (error) {
        logger.error(error.message)
        next(error)
    }
}

export const deleteCartController = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await daleteCartService(id)
        return res.status(200).send({
            message: 'deleted',
            data: data[0].id,
        })
    } catch (error) {
        logger.error(error.message)
        next(error)
    }
}
