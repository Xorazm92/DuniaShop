import { ProductService } from '../services/product.service.js';
import { logger } from '../utils/logger.js';

export class ProductController {
    constructor() {
        this.productService = new ProductService();
    }

    getAllProducts = async (req, res) => {
        try {
            const { page = 1, limit = 10, sort, category } = req.query;
            const products = await this.productService.getAllProducts({ page, limit, sort, category });
            res.json(products);
        } catch (error) {
            logger.error('Error getting products:', error);
            res.status(500).json({ message: 'Mahsulotlarni olishda xatolik yuz berdi' });
        }
    }

    getProductById = async (req, res) => {
        try {
            const { id } = req.params;
            const product = await this.productService.getProductById(id);
            
            if (!product) {
                return res.status(404).json({ message: 'Mahsulot topilmadi' });
            }

            res.json(product);
        } catch (error) {
            logger.error('Error getting product:', error);
            res.status(500).json({ message: 'Mahsulotni olishda xatolik yuz berdi' });
        }
    }

    searchProducts = async (req, res) => {
        try {
            const { q } = req.query;
            const products = await this.productService.searchProducts(q);
            res.json(products);
        } catch (error) {
            logger.error('Error searching products:', error);
            res.status(500).json({ message: 'Mahsulotlarni qidirishda xatolik yuz berdi' });
        }
    }

    getProductsByCategory = async (req, res) => {
        try {
            const { categoryId } = req.params;
            const products = await this.productService.getProductsByCategory(categoryId);
            res.json(products);
        } catch (error) {
            logger.error('Error getting products by category:', error);
            res.status(500).json({ message: 'Kategoriya bo\'yicha mahsulotlarni olishda xatolik yuz berdi' });
        }
    }

    createProduct = async (req, res) => {
        try {
            const productData = req.body;
            const product = await this.productService.createProduct(productData);
            res.status(201).json(product);
        } catch (error) {
            logger.error('Error creating product:', error);
            res.status(500).json({ message: 'Mahsulot yaratishda xatolik yuz berdi' });
        }
    }

    updateProduct = async (req, res) => {
        try {
            const { id } = req.params;
            const productData = req.body;
            const product = await this.productService.updateProduct(id, productData);
            
            if (!product) {
                return res.status(404).json({ message: 'Mahsulot topilmadi' });
            }

            res.json(product);
        } catch (error) {
            logger.error('Error updating product:', error);
            res.status(500).json({ message: 'Mahsulotni yangilashda xatolik yuz berdi' });
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const { id } = req.params;
            await this.productService.deleteProduct(id);
            res.status(204).send();
        } catch (error) {
            logger.error('Error deleting product:', error);
            res.status(500).json({ message: 'Mahsulotni o\'chirishda xatolik yuz berdi' });
        }
    }
}
