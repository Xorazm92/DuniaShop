import { AppError, logger } from '../utils/index.js'
import db from '../database/index.js'

export const getCartService = async (
    type,
    data = '',
    page = '',
    limit = '',
) => {
    try {
        let result
        switch (type) {
            case 'all':
                const offset = (page - 1) * limit
                result = await db('cart').limit(limit).offset(offset)
                break
            case 'id':
                result = await db.select().from('cart').where('id', '=', data)
                break
            default:
                break
        }
        return result
    } catch (error) {
        logger.error(error.message)
        throw new AppError(error.message, 500)
    }
}

export const createCartService = async (cart) => {
    try {
        const newCart = await db('cart').insert(cart).returning('*')
        return newCart
    } catch (error) {
        logger.error(error.message)
        throw new AppError(error.message, 500)
    }
}

export const updateCartService = async (id, cart) => {
    try {
        const updatedCart = await db('cart')
            .where('id', '=', id)
            .update(cart)
            .returning('*')
        if (updatedCart.length === 0) {
            throw new AppError('cart not found', 404)
        }
        return updatedCart
    } catch (error) {
        logger.error(error.message)
        throw new AppError(error.message, 500)
    }
}

export const daleteCartService = async (id) => {
    try {
        const deleteUser = await db('cart')
            .where('id', '=', id)
            .del()
            .returning('*')
        if (deleteUser.length === 0) {
            throw new AppError('cart not found', 404)
        }
        return deleteUser
    } catch (error) {
        logger.error(error.message)
        throw new AppError(error.message, 500)
    }
}
