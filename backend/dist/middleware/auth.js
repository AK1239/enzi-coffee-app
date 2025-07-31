"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
exports.optionalAuth = optionalAuth;
exports.requireRole = requireRole;
exports.requireAdmin = requireAdmin;
const auth_1 = require("../utils/auth");
const errorHandler_1 = require("./errorHandler");
async function authenticateToken(req, _res, next) {
    try {
        const authHeader = req.headers.authorization;
        const token = (0, auth_1.extractTokenFromHeader)(authHeader);
        if (!token) {
            throw new errorHandler_1.AuthenticationError('Access token required');
        }
        const payload = (0, auth_1.verifyToken)(token);
        if (!payload) {
            throw new errorHandler_1.AuthenticationError('Invalid or expired token');
        }
        const user = await (0, auth_1.getUserById)(payload.userId);
        if (!user) {
            throw new errorHandler_1.AuthenticationError('User not found');
        }
        req.user = {
            id: user.id,
            email: user.email,
            name: user.name,
        };
        next();
    }
    catch (error) {
        next(error);
    }
}
async function optionalAuth(req, _res, next) {
    try {
        const authHeader = req.headers.authorization;
        const token = (0, auth_1.extractTokenFromHeader)(authHeader);
        if (token) {
            const payload = (0, auth_1.verifyToken)(token);
            if (payload) {
                const user = await (0, auth_1.getUserById)(payload.userId);
                if (user) {
                    req.user = {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                    };
                }
            }
        }
        next();
    }
    catch (error) {
        console.error('Optional auth middleware error:', error);
        next();
    }
}
function requireRole(_requiredRole) {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'Authentication required',
                error: 'AUTH_REQUIRED',
            });
            return;
        }
        next();
    };
}
function requireAdmin(req, res, next) {
    if (!req.user) {
        res.status(401).json({
            success: false,
            message: 'Authentication required',
            error: 'AUTH_REQUIRED',
        });
        return;
    }
    next();
}
//# sourceMappingURL=auth.js.map