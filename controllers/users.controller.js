import {
    createUserService,
    daleteUserService,
    getUserService,
    updateUserService,
} from '../services/index.js'
import { logger } from '../utils/index.js'
export const createUserController = async (req, res, next) => {
    try {
        const body = req.body

        const newData = await createUserService(body)
        return res.status(201).send({
            message: 'created',
            data: newData[0].id,
        })
    } catch (error) {
        logger.error(error.message)
        next(error)
    }
}

export const getAllUserController = async (req, res, next) => {
    try {
        const { page, limit } = req.query
        const allData = await getUserService('all', '', +page, +limit)

        return res.status(200).send({
            message: 'success',
            data: allData,
        })
    } catch (error) {
        logger.error(error.message)

        next(error)
    }
}

export const getByIdUserController = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await getUserService('id', id)
        return res.status(200).send({
            message: 'success',
            data: data,
        })
    } catch (error) {
        logger.error(error.message)
        next(error)
    }
}

export const getBySearchUserController = async (req, res, next) => {
    try {
        const { username } = req.query

        const data = await getUserService('username', username)
        return res.status(200).send({
            message: 'success',
            data: data,
        })
    } catch (error) {
        logger.error(error.message)
        next(error)
    }
}

export const updateUserController = async (req, res, next) => {
    try {
        const id = req.params.id
        const body = req.body
        const data = await updateUserService(id, body)
        return res.status(200).send({
            message: 'updated',
            data: data[0].id,
        })
    } catch (error) {
        logger.error(error.message)
        next(error)
    }
}

export const deleteUserController = async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await daleteUserService(id)
        return res.status(200).send({
            message: 'deleted',
            data: data[0].id,
        })
    } catch (error) {
        logger.error(error.message)
        next(error)
    }
}
