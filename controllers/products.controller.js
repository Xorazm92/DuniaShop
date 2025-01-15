import db from '../database/index.js'
import {
    createProductService,
    deleteProductService,
    getProductService,
    updateProductService,
} from '../services/index.js'

export const getallProductController = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1) * limit

        const products = await getProductService('all')

        const paginatedProducts = products.slice(skip, skip + limit)

        if (paginatedProducts.length === 0) {
            return res.status(404).send({
                status: 'Not Found',
                message: 'No products found',
            })
        }

        return res.status(200).send({
            status: 'Success',
            page,
            limit,
            products: paginatedProducts,
        })
    } catch (error) {
        next(error)
    }
}

export const getoneProductController = async (req, res, next) => {
    try {
        const id = req.params.id

        const product = await getProductService('id', id)

        if (!product) {
            return res
                .status(404)
                .send({ status: 'Not Found', message: 'No product found' })
        }

        return res.status(200).send({ Status: 'Success', product })
    } catch (error) {
        next(error)
    }
}

export const createProductController = async (req, res, next) => {
    try {
        const newProducts = await createProductService(req.body)

        return res.status(201).send({
            status: 'Created',
            product: newProducts[0],
        })
    } catch (error) {
        next(error)
    }
}

export const updateProductController = async (req, res, next) => {
    try {
        const id = req.params.id
        const updates = req.body

        const updatedProduct = await updateProductService(id, updates)

        return res.status(200).send({
            status: 'Success',
            product: updatedProduct,
        })
    } catch (error) {
        next(error)
    }
}

export const deleteProductController = async (req, res, next) => {
    try {
        const id = req.params.id

        const deletedProduct = await deleteProductService(id)

        return res.status(200).send({
            status: 'Deleted',
            message: 'Product deleted successfully',
            product: deletedProduct,
        })
    } catch (error) {
        next(error)
    }
}
