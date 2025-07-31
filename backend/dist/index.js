"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const app_1 = require("./app");
const logger_1 = require("./utils/logger");
dotenv_1.default.config();
const PORT = process.env['PORT'] || 3001;
async function startServer() {
    try {
        const app = (0, app_1.createServer)();
        app.listen(PORT, () => {
            logger_1.logger.info(`🚀 Enzi Coffee Shop Backend running on port ${PORT}`);
            logger_1.logger.info(`📊 Health check available at http://localhost:${PORT}/health`);
        });
    }
    catch (error) {
        logger_1.logger.error('Failed to start server:', error);
        throw error;
    }
}
const gracefulShutdown = (signal) => {
    logger_1.logger.info(`${signal} received, shutting down gracefully`);
    process.exit(0);
};
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
startServer();
//# sourceMappingURL=index.js.map