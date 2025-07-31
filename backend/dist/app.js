"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = createServer;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const logger_1 = require("./utils/logger");
const errorHandler_1 = require("./middleware/errorHandler");
const auth_1 = tslib_1.__importDefault(require("./routes/auth"));
const menu_1 = tslib_1.__importDefault(require("./routes/menu"));
const orders_1 = tslib_1.__importDefault(require("./routes/orders"));
function createServer() {
    const app = (0, express_1.default)();
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)({
        origin: process.env['FRONTEND_URL'] || 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    app.use(express_1.default.json({ limit: '10mb' }));
    app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
    app.use((_req, _res, next) => {
        logger_1.logger.info(`${_req.method} ${_req.path}`, {
            ip: _req.ip,
            userAgent: _req.get('User-Agent'),
        });
        next();
    });
    app.get('/health', (_req, res) => {
        res.status(200).json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env['NODE_ENV'] || 'development',
        });
    });
    app.use('/api/auth', auth_1.default);
    app.use('/api/menu', menu_1.default);
    app.use('/api/orders', orders_1.default);
    app.get('/', (_req, res) => {
        res.json({
            message: 'Welcome to Enzi Coffee Shop API',
            version: '1.0.0',
            documentation: '/health',
            endpoints: {
                auth: '/api/auth',
                menu: '/api/menu',
                orders: '/api/orders',
            },
        });
    });
    app.use(errorHandler_1.notFoundHandler);
    app.use(errorHandler_1.errorHandler);
    return app;
}
//# sourceMappingURL=app.js.map