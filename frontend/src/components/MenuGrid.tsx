'use client';

import { useEffect, useState } from 'react';
import { useMenuStore } from '../store';
import { MenuItem } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface MenuGridProps {
  onAddToCart?: (item: MenuItem) => void;
  selectedCategory?: string;
  searchQuery?: string;
}

export default function MenuGrid({
  onAddToCart,
  selectedCategory,
  searchQuery,
}: MenuGridProps) {
  const {
    items,
    isLoading,
    error,
    fetchMenuItems,
    getItemsByCategory,
    searchItems,
    clearError,
  } = useMenuStore();

  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);

  // Fetch menu items on component mount
  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  // Filter items based on category and search query
  useEffect(() => {
    let filtered = items;

    // Filter by category if selected
    if (selectedCategory) {
      filtered = getItemsByCategory(selectedCategory);
    }

    // Filter by search query if provided
    if (searchQuery) {
      filtered = searchItems(searchQuery);
    }

    setFilteredItems(filtered);
  }, [items, selectedCategory, searchQuery, getItemsByCategory, searchItems]);

  // Handle add to cart
  const handleAddToCart = (item: MenuItem) => {
    if (onAddToCart) {
      onAddToCart(item);
    } else {
      // Placeholder for when cart store is implemented
      console.log('Add to cart:', item);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={clearError}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <div className="text-center p-8">
        <div className="text-gray-500 text-lg">
          {searchQuery
            ? `No items found for "${searchQuery}"`
            : selectedCategory
              ? `No items found in ${selectedCategory} category`
              : 'No menu items available'}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredItems.map(item => (
        <MenuItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
      ))}
    </div>
  );
}

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!item.available) return;

    setIsAdding(true);
    try {
      onAddToCart(item);
      // Add a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 200));
    } finally {
      setIsAdding(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hot':
        return 'bg-red-100 text-red-800';
      case 'cold':
        return 'bg-blue-100 text-blue-800';
      case 'espresso':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {/* Item Image Placeholder */}
      <div className="h-48 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
        <div className="text-amber-600 text-4xl">☕</div>
      </div>

      {/* Item Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-900 truncate">
            {item.name}
          </h3>
          <span className="text-green-600 font-bold text-lg">
            ${item.price.toFixed(2)}
          </span>
        </div>

        {/* Category Badge */}
        <div className="mb-3">
          <span
            className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(
              item.category
            )}`}
          >
            {item.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!item.available || isAdding}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
            item.available
              ? 'bg-amber-600 text-white hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          } ${isAdding ? 'opacity-75 cursor-wait' : ''}`}
        >
          {isAdding ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner size="sm" className="mr-2" />
              Adding...
            </div>
          ) : item.available ? (
            'Add to Cart'
          ) : (
            'Not Available'
          )}
        </button>
      </div>
    </div>
  );
}
