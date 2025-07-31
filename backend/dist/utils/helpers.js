"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateOrderTotal = exports.validateEmail = exports.formatCurrency = void 0;
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount / 100);
};
exports.formatCurrency = formatCurrency;
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.validateEmail = validateEmail;
const calculateOrderTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
};
exports.calculateOrderTotal = calculateOrderTotal;
//# sourceMappingURL=helpers.js.map