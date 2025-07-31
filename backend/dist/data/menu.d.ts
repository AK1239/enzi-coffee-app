export interface MenuItem {
    id: number;
    name: string;
    price: number;
    description: string;
    category: 'hot' | 'cold' | 'espresso';
    available: boolean;
    image: string;
}
export declare const menuItems: MenuItem[];
export declare function getAllMenuItems(): MenuItem[];
export declare function getMenuItemsByCategory(category: MenuItem['category']): MenuItem[];
export declare function getMenuItemById(id: number): MenuItem | undefined;
export declare function getMenuCategories(): string[];
export declare function searchMenuItems(query: string): MenuItem[];
//# sourceMappingURL=menu.d.ts.map