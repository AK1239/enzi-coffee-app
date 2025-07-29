export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  category: 'hot' | 'cold' | 'espresso';
  available: boolean;
}

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Espresso',
    price: 2.5,
    description:
      'Rich, concentrated shot of coffee brewed by forcing hot water through finely-ground coffee beans',
    category: 'espresso',
    available: true,
  },
  {
    id: 2,
    name: 'Latte',
    price: 3.5,
    description:
      'Smooth espresso with steamed milk and a light layer of milk foam',
    category: 'hot',
    available: true,
  },
  {
    id: 3,
    name: 'Cappuccino',
    price: 3.0,
    description:
      'Equal parts espresso, steamed milk, and milk foam for a balanced coffee experience',
    category: 'hot',
    available: true,
  },
  {
    id: 4,
    name: 'Mocha',
    price: 4.0,
    description:
      'Espresso combined with rich chocolate syrup and steamed milk, topped with whipped cream',
    category: 'hot',
    available: true,
  },
  {
    id: 5,
    name: 'Americano',
    price: 2.75,
    description:
      'Espresso diluted with hot water for a lighter coffee experience',
    category: 'hot',
    available: true,
  },
  {
    id: 6,
    name: 'Macchiato',
    price: 2.75,
    description: 'Espresso "marked" with a small amount of steamed milk',
    category: 'espresso',
    available: true,
  },
  {
    id: 7,
    name: 'Iced Latte',
    price: 3.75,
    description:
      'Chilled espresso with cold milk over ice for a refreshing coffee drink',
    category: 'cold',
    available: true,
  },
  {
    id: 8,
    name: 'Iced Mocha',
    price: 4.25,
    description: 'Cold espresso with chocolate syrup and milk, served over ice',
    category: 'cold',
    available: true,
  },
];

/**
 * Get all menu items
 */
export function getAllMenuItems(): MenuItem[] {
  return menuItems.filter(item => item.available);
}

/**
 * Get menu items by category
 */
export function getMenuItemsByCategory(
  category: MenuItem['category']
): MenuItem[] {
  return menuItems.filter(item => item.category === category && item.available);
}

/**
 * Get menu item by ID
 */
export function getMenuItemById(id: number): MenuItem | undefined {
  return menuItems.find(item => item.id === id && item.available);
}

/**
 * Get menu categories
 */
export function getMenuCategories(): string[] {
  return [...new Set(menuItems.map(item => item.category))];
}

/**
 * Search menu items by name
 */
export function searchMenuItems(query: string): MenuItem[] {
  const lowercaseQuery = query.toLowerCase();
  return menuItems.filter(
    item => item.available && item.name.toLowerCase().includes(lowercaseQuery)
  );
}
