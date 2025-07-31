'use client';

import { useEffect, useState } from 'react';
import { useMenuStore, useCartStore } from '../store';
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
    if (items.length === 0) {
      fetchMenuItems();
    }
  }, []); // Empty dependency array to run only once

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
  }, [items, selectedCategory, searchQuery]); // Remove function dependencies

  // Handle add to cart
  const handleAddToCart = (item: MenuItem) => {
    if (onAddToCart) {
      onAddToCart(item);
    } else {
      // Use cart store directly
      const { addItem } = useCartStore.getState();
      addItem(item);
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
        <div className="text-red-400 mb-4">{error}</div>
        <button
          onClick={clearError}
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <div className="text-center p-8">
        <div className="text-slate-400 text-lg">
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
        return 'bg-red-500/20 text-red-300 border border-red-500/30';
      case 'cold':
        return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
      case 'espresso':
        return 'bg-amber-500/20 text-amber-300 border border-amber-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border border-slate-500/30';
    }
  };

  return (
    <div className="bg-slate-700/50 backdrop-blur-xl rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden border border-slate-600/50">
      {/* Item Image Placeholder */}
      <div className="h-48 bg-gradient-to-br from-amber-900/20 to-orange-900/20 flex items-center justify-center border-b border-slate-600/50 overflow-hidden">
        <img
          src={`/${item.image}`}
          alt={item.name}
          className="object-cover w-full h-full"
          style={{ maxHeight: '12rem', minHeight: '100px' }}
          loading="lazy"
        />
      </div>

      {/* Item Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-white truncate">
            {item.name}
          </h3>
          <span className="text-green-400 font-bold text-lg">
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
        <p className="text-slate-300 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!item.available || isAdding}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
            item.available
              ? 'bg-amber-600 text-white hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-700'
              : 'bg-slate-600 text-slate-400 cursor-not-allowed'
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
