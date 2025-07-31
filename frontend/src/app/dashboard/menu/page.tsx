'use client';

import { useState } from 'react';
import MenuGrid from '../../../components/MenuGrid';
import { MenuItem } from '../../../types';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleAddToCart = (item: MenuItem) => {
    console.log('Added to cart:', item);
    // This will be replaced with actual cart functionality in Task 3.10
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Menu Management</h1>
          <p className="text-slate-300 mt-2">
            Browse and manage your coffee menu items
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category Filter */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-2">
              Filter by Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
            >
              <option value="">All Categories</option>
              <option value="hot">Hot Drinks</option>
              <option value="cold">Cold Drinks</option>
              <option value="espresso">Espresso</option>
            </select>
          </div>

          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-slate-300 mb-2">
              Search Items
            </label>
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search menu items..."
              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Clear Filters */}
        {(selectedCategory || searchQuery) && (
          <div className="mt-4">
            <button
              onClick={() => {
                setSelectedCategory('');
                setSearchQuery('');
              }}
              className="text-sm text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Menu Grid */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
        <MenuGrid
          onAddToCart={handleAddToCart}
          selectedCategory={selectedCategory || undefined}
          searchQuery={searchQuery || undefined}
        />
      </div>
    </div>
  );
} 