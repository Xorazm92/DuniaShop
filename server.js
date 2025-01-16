import app from './src/app.js';
import { logger } from './src/utils/logger.js';
import { config } from './src/configs/index.js';

const startServer = async () => {
    try {
        const port = config.app.port || 3000;
        app.listen(port, () => {
            logger.info(`Server ${port}-portda ishga tushdi`);
        });
    } catch (error) {
        logger.error('Server ishga tushishida xatolik: ' + error.message);
        process.exit(1);
    }
};

startServer();
