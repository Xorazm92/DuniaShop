import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import expressEjsLayouts from 'express-ejs-layouts';
import path from 'path';
import { fileURLToPath } from 'url';

import { routers } from './routers/index.js';
import { logger } from './utils/logger.js';
import { swaggerSpec } from './configs/swagger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Rate limiter sozlamalari
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 daqiqa
    max: 100, // IP manzil uchun so'rovlar soni
    message: 'Juda ko\'p so\'rovlar yuborildi, iltimos kuting',
});

// EJS sozlamalari
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressEjsLayouts);
app.set('layout', 'layouts/main');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

// Static fayllar uchun
app.use(express.static(path.join(__dirname, 'public')));

// Middleware'lar
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use(morgan('dev'));
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false
}));
app.use(cors());

// Swagger hujjatlari
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Asosiy sahifalar yo'llari
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Bosh sahifa',
        page: 'home'
    });
});

app.get('/about', (req, res) => {
    res.render('about', { 
        title: 'Biz haqimizda',
        page: 'about'
    });
});

app.get('/products', (req, res) => {
    res.render('products', { 
        title: 'Mahsulotlar',
        page: 'products'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', { 
        title: 'Aloqa',
        page: 'contact'
    });
});

app.get('/login', (req, res) => {
    res.render('login', { 
        title: 'Kirish',
        page: 'login'
    });
});

app.get('/register', (req, res) => {
    res.render('register', { 
        title: 'Ro\'yxatdan o\'tish',
        page: 'register'
    });
});

// API yo'llari
app.use('/api/v1', routers);

// 404 xatolik sahifasi
app.use((req, res) => {
    res.status(404).render('404', { 
        title: 'Sahifa topilmadi',
        page: '404'
    });
});

// Xatoliklarni qayta ishlash
app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(err.status || 500).render('error', {
        title: 'Xatolik yuz berdi',
        page: 'error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// Kutilmagan xatoliklarni qayta ishlash
process.on('uncaughtException', (err) => {
    logger.error('Kutilmagan xatolik: ' + err.message);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    logger.error('Qayta ishlanmagan va\'da xatoligi: ' + err.message);
    process.exit(1);
});

export default app;
