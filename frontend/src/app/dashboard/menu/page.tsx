'use client';

import React, { useState } from 'react';
import MenuGrid from '../../../components/MenuGrid';
import { MenuItem } from '../../../types';
import { useCartStore, useLoadingStore } from '../../../store';
import { SkeletonCard } from '../../../components';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { menuLoading, setMenuLoading } = useLoadingStore();

  const handleAddToCart = (item: MenuItem) => {
    // Use cart store directly
    const { addItem } = useCartStore.getState();
    addItem(item);
  };

  // Clear loading state when component mounts
  React.useEffect(() => {
    setMenuLoading(false);
  }, [setMenuLoading]);

  // Show skeleton loading for menu page
  if (menuLoading) {
    return (
      <div className="space-y-6">
        {/* Page Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="h-8 bg-slate-700/50 rounded-lg w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-slate-700/50 rounded w-80 animate-pulse"></div>
          </div>
        </div>

        {/* Filters Skeleton */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="h-4 bg-slate-700/50 rounded w-32 mb-2 animate-pulse"></div>
              <div className="h-10 bg-slate-700/50 rounded-lg animate-pulse"></div>
            </div>
            <div>
              <div className="h-4 bg-slate-700/50 rounded w-24 mb-2 animate-pulse"></div>
              <div className="h-10 bg-slate-700/50 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Menu Grid Skeleton */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

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
            <label
              htmlFor="category"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Filter by Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
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
            <label
              htmlFor="search"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Search Items
            </label>
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
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
