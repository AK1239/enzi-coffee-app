"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const auth_2 = require("../utils/auth");
const router = (0, express_1.Router)();
router.post('/register', async (req, res) => {
    try {
        const validation = (0, auth_2.validateRegistration)(req.body);
        if (!validation.success) {
            res.status(400).json({
                success: false,
                message: 'Invalid input data',
                errors: validation.errors,
            });
            return;
        }
        const { email, password, name } = validation.data;
        const emailExists = await (0, auth_2.isEmailExists)(email);
        if (emailExists) {
            res.status(409).json({
                success: false,
                message: 'Email already registered',
                error: 'EMAIL_EXISTS',
            });
            return;
        }
        const user = await (0, auth_2.createUser)({ email, password, name });
        const token = (0, auth_2.generateToken)(user);
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
                token,
            },
        });
    }
    catch {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: 'REGISTRATION_ERROR',
        });
    }
});
router.post('/login', async (req, res) => {
    try {
        const validation = (0, auth_2.validateLogin)(req.body);
        if (!validation.success) {
            res.status(400).json({
                success: false,
                message: 'Invalid input data',
                errors: validation.errors,
            });
            return;
        }
        const { email, password } = validation.data;
        const user = await (0, auth_2.authenticateUser)(email, password);
        if (!user) {
            res.status(401).json({
                success: false,
                message: 'Invalid email or password',
                error: 'INVALID_CREDENTIALS',
            });
            return;
        }
        const token = (0, auth_2.generateToken)(user);
        res.json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
                token,
            },
        });
    }
    catch {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: 'LOGIN_ERROR',
        });
    }
});
router.get('/me', auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'Authentication required',
                error: 'AUTH_REQUIRED',
            });
            return;
        }
        res.json({
            success: true,
            message: 'User information retrieved successfully',
            data: {
                user: req.user,
            },
        });
    }
    catch {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: 'GET_USER_ERROR',
        });
    }
});
router.post('/logout', (_req, res) => {
    res.json({
        success: true,
        message: 'Logout successful',
        data: {
            message: 'Token should be removed from client storage',
        },
    });
});
router.post('/refresh', (_req, res) => {
    res.status(501).json({
        success: false,
        message: 'Token refresh not implemented yet',
        error: 'NOT_IMPLEMENTED',
    });
});
exports.default = router;
//# sourceMappingURL=auth.js.map