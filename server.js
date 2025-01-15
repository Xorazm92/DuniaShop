import app from './src/app.js';
import { logger } from './src/utils/logger.js';
import { config } from './src/configs/index.js';

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
