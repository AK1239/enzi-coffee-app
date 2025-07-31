"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuItems = void 0;
exports.getAllMenuItems = getAllMenuItems;
exports.getMenuItemsByCategory = getMenuItemsByCategory;
exports.getMenuItemById = getMenuItemById;
exports.getMenuCategories = getMenuCategories;
exports.searchMenuItems = searchMenuItems;
exports.menuItems = [
    {
        id: 1,
        name: 'Espresso',
        price: 2.5,
        description: 'Rich, concentrated shot of coffee brewed by forcing hot water through finely-ground coffee beans',
        category: 'espresso',
        available: true,
        image: 'espresso.jpg',
    },
    {
        id: 2,
        name: 'Latte',
        price: 3.5,
        description: 'Smooth espresso with steamed milk and a light layer of milk foam',
        category: 'hot',
        available: true,
        image: 'latte.jpg',
    },
    {
        id: 3,
        name: 'Cappuccino',
        price: 3.0,
        description: 'Equal parts espresso, steamed milk, and milk foam for a balanced coffee experience',
        category: 'hot',
        available: true,
        image: 'cappucino.jpg',
    },
    {
        id: 4,
        name: 'Mocha',
        price: 4.0,
        description: 'Espresso combined with rich chocolate syrup and steamed milk, topped with whipped cream',
        category: 'hot',
        available: true,
        image: 'mocha.jpg',
    },
    {
        id: 5,
        name: 'Americano',
        price: 2.75,
        description: 'Espresso diluted with hot water for a lighter coffee experience',
        category: 'hot',
        available: true,
        image: 'americano.webp',
    },
    {
        id: 6,
        name: 'Macchiato',
        price: 2.75,
        description: 'Espresso "marked" with a small amount of steamed milk',
        category: 'espresso',
        available: true,
        image: 'macchiato.webp',
    },
    {
        id: 7,
        name: 'Iced Latte',
        price: 3.75,
        description: 'Chilled espresso with cold milk over ice for a refreshing coffee drink',
        category: 'cold',
        available: true,
        image: 'iced-latte.jpg',
    },
    {
        id: 8,
        name: 'Iced Mocha',
        price: 4.25,
        description: 'Cold espresso with chocolate syrup and milk, served over ice',
        category: 'cold',
        available: true,
        image: 'iced-mocha.jpg',
    },
];
function getAllMenuItems() {
    return exports.menuItems.filter(item => item.available);
}
function getMenuItemsByCategory(category) {
    return exports.menuItems.filter(item => item.category === category && item.available);
}
function getMenuItemById(id) {
    return exports.menuItems.find(item => item.id === id && item.available);
}
function getMenuCategories() {
    return [...new Set(exports.menuItems.map(item => item.category))];
}
function searchMenuItems(query) {
    const lowercaseQuery = query.toLowerCase();
    return exports.menuItems.filter(item => item.available && item.name.toLowerCase().includes(lowercaseQuery));
}
//# sourceMappingURL=menu.js.map