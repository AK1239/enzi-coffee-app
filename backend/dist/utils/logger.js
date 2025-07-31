"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
class Logger {
    formatMessage(level, message, data) {
        return {
            level,
            message,
            timestamp: new Date().toISOString(),
            data,
        };
    }
    log(level, message, data) {
        const logMessage = this.formatMessage(level, message, data);
        if (process.env['NODE_ENV'] === 'development') {
            console.log(`[${logMessage.timestamp}] ${level.toUpperCase()}: ${logMessage.message}`, data || '');
        }
        else {
            console.log(JSON.stringify(logMessage));
        }
    }
    info(message, data) {
        this.log('info', message, data);
    }
    warn(message, data) {
        this.log('warn', message, data);
    }
    error(message, data) {
        this.log('error', message, data);
    }
    debug(message, data) {
        if (process.env['NODE_ENV'] === 'development') {
            this.log('debug', message, data);
        }
    }
}
exports.logger = new Logger();
//# sourceMappingURL=logger.js.map