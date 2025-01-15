import app from './src/app.js';
import { logger } from './src/utils/logger.js';
import { config } from './src/configs/index.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Raya Dunia API',
            version: '1.0.0',
            description: 'API documentation for Raya Dunia',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./src/routers/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const startServer = async () => {
    try {
        const PORT = config.app.port || 5050;
        app.listen(PORT, () => {
            logger.info(`Server ${PORT} portida ishga tushdi`);
        });
    } catch (error) {
        logger.error('Server ishga tushishda xatolik:', error);
        process.exit(1);
    }
};

startServer();
