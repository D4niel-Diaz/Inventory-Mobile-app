// ============================================================
// src/constants/categories.ts
// Centralized category definitions for the inventory system
// ============================================================

/**
 * All available product categories in the inventory system.
 * Modify this array to add or remove categories globally.
 */
export const CATEGORIES: string[] = [
  'Office Supply',
  'Medical Supply',
  'Electronics',
  'Furniture',
  'Asset',
  'Consumable',
];

/**
 * The "All" category sentinel string used for filter logic.
 * When this is selected, no category filter is applied.
 */
export const ALL_CATEGORY = 'All';

/**
 * All filter options shown in the CategoryFilter component,
 * including the "All" option at the beginning.
 */
export const FILTER_CATEGORIES: string[] = [ALL_CATEGORY, ...CATEGORIES];

/**
 * A mapping of category to a representative accent color.
 * Used for subtle category theming if desired.
 */
export const CATEGORY_COLORS: Record<string, string> = {
  'Office Supply':   '#6C63FF',
  'Medical Supply':  '#FF6584',
  'Electronics':     '#43CBFF',
  'Furniture':       '#F7971E',
  'Asset':           '#56CCF2',
  'Consumable':      '#A8EDEA',
};
