import db from '../database/index.js'
import { AppError } from '../utils/index.js'

export const getCategorySevice = async (type, data = '') => {
    try {
        let result

        switch (type) {
            case 'all':
                result = await db('categories').select('*')
                break
            case 'filter':
                result = await db('categories').where(data)
                break
            case 'id':
                result = await db('categories').where({ id: data }).first()
                break
            case 'title':
                result = await db('categories').where(
                    'title',
                    'like',
                    `%${data}%`,
                )
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

export const createCategoryService = async (categoryData) => {
    try {
        const newCategory = await db('categories')
            .insert(categoryData)
            .returning('*')

        return newCategory
    } catch (error) {
        throw new AppError(error.message, 500)
    }
}

export const updateCategoryService = async (id, productData) => {
    try {
        const updatedCategory = await db('categories')
            .where({ id })
            .update(productData)
            .returning('*')

        if (!updatedCategory) {
            return res.status(404).send({
                status: 'Not Found',
                message: 'No Category found with the provided ID',
            })
        }

        return updatedCategory
    } catch (error) {
        throw new AppError(error.message, 500)
    }
}

export const deleteCategoryService = async (id) => {
    try {
        const deletedCategory = await db('categories')
            .where({ id })
            .del()
            .returning('*')

        if (!deletedCategory.length) {
            throw new AppError('categories not found or failed to delete', 404)
        }

        return deletedCategory[0]
    } catch (error) {
        throw new AppError(error.message, 500)
    }
}
