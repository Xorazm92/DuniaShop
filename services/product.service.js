import { db } from '../db/index.js';
import { logger } from '../utils/logger.js';

export class ProductService {
    async getAllProducts({ page = 1, limit = 10, sort, category }) {
        try {
            let query = db('products')
                .select('*')
                .where('active', true);

            if (category) {
                query = query.where('category_id', category);
            }

            if (sort) {
                const [field, order] = sort.split(':');
                query = query.orderBy(field, order);
            }

            const offset = (page - 1) * limit;
            const products = await query.limit(limit).offset(offset);
            const total = await db('products').where('active', true).count('id').first();

            return {
                data: products,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total: parseInt(total.count)
                }
            };
        } catch (error) {
            logger.error('Get all products error:', error);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const product = await db('products')
                .select('*')
                .where({ id, active: true })
                .first();

            return product;
        } catch (error) {
            logger.error('Get product by id error:', error);
            throw error;
        }
    }

    async searchProducts(query) {
        try {
            const products = await db('products')
                .select('*')
                .where('active', true)
                .whereRaw('LOWER(name) LIKE ?', [`%${query.toLowerCase()}%`])
                .orWhereRaw('LOWER(description) LIKE ?', [`%${query.toLowerCase()}%`])
                .limit(10);

            return products;
        } catch (error) {
            logger.error('Search products error:', error);
            throw error;
        }
    }

    async getProductsByCategory(categoryId) {
        try {
            const products = await db('products')
                .select('*')
                .where({ category_id: categoryId, active: true });

            return products;
        } catch (error) {
            logger.error('Get products by category error:', error);
            throw error;
        }
    }

    async createProduct(productData) {
        try {
            const [product] = await db('products')
                .insert(productData)
                .returning('*');

            return product;
        } catch (error) {
            logger.error('Create product error:', error);
            throw error;
        }
    }

    async updateProduct(id, productData) {
        try {
            const [product] = await db('products')
                .where({ id })
                .update(productData)
                .returning('*');

            return product;
        } catch (error) {
            logger.error('Update product error:', error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            await db('products')
                .where({ id })
                .update({ active: false });

            return true;
        } catch (error) {
            logger.error('Delete product error:', error);
            throw error;
        }
    }
}
