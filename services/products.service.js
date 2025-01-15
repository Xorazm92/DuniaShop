import db from '../database/index.js'
import { AppError } from '../utils/index.js'

export const getProductService = async (type, data = '') => {
    try {
        let result

        switch (type) {
            case 'all':
                result = await db('products').select('*')
                break

            case 'filter':
                result = await db('products').where(data)
                break

            case 'id':
                result = await db('products').where({ id: data }).first()
                if (!result) {
                    throw new AppError('Product not found', 404)
                }
                break

            case 'category':
                result = await db('products').where({ category_id: data })
                if (result.length === 0) {
                    throw new AppError(
                        'No products found for this category',
                        404,
                    )
                }
                break

            case 'title':
                result = await db('products').where(
                    'title',
                    'like',
                    `%${data}%`,
                )
                if (result.length === 0) {
                    throw new AppError('Product with this title not found', 404)
                }
                break

            case 'price':
                result = await db('products').where({ price: data })
                if (result.length === 0) {
                    throw new AppError('No products found for this price', 404)
                }
                break

            default:
                throw new AppError('Invalid type for product retrieval', 400)
        }

        return result
    } catch (error) {
        throw error instanceof AppError
            ? error
            : new AppError(error.message, 500)
    }
}

export const createProductService = async (productData) => {
    try {
        const newProduct = await db('products')
            .insert(productData)
            .returning('*')
        return newProduct
    } catch (error) {
        throw new AppError(error.message, 500)
    }
}

export const updateProductService = async (id, productData) => {
    try {
        const updatedProduct = await db('products')
            .where({ id })
            .update(productData)
            .returning('*')

        if (!updatedProduct) {
            throw new AppError('Product not found or failed to update', 404)
        }

        return updatedProduct
    } catch (error) {
        throw new AppError(error.message, 500)
    }
}

export const deleteProductService = async (id) => {
    try {
        const deletedProduct = await db('products')
            .where({ id })
            .del()
            .returning('*')

        if (!deletedProduct.length) {
            throw new AppError('Product not found or failed to delete', 404)
        }

        return deletedProduct[0]
    } catch (error) {
        throw new AppError(error.message, 500)
    }
}
