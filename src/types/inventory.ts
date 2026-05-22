export interface InventoryItem {
  id: string;
  itemName: string;
  category: string;
  quantity: number;
  price: number;
  status: InventoryStatus;
}

export type InventoryStatus = 'Out of Stock' | 'Critical' | 'Low Stock' | 'Normal';

export type StatusColorMap = {
  [key in InventoryStatus]: string;
};

export interface InventoryCardProps {
  item: InventoryItem;
}

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export interface HeaderProps {
  totalCount: number;
  filteredCount: number;
  selectedCategory: string;
  currentPage: number;
  totalPages: number;
}

export interface EmptyStateProps {
  message?: string;
  detail?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export type SortOption = 'none' | 'quantity_asc' | 'quantity_desc' | 'price_asc' | 'price_desc';
