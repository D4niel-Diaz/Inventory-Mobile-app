import { InventoryItem, InventoryStatus, StatusColorMap, SortOption } from '../types/inventory';

export function getStatus(quantity: number): InventoryStatus {
  if (quantity === 0) return 'Out of Stock';
  if (quantity <= 10) return 'Critical';
  if (quantity <= 30) return 'Low Stock';
  return 'Normal';
}

export const STATUS_COLORS: StatusColorMap = {
  'Out of Stock': '#FF3B30',
  Critical: '#FF9500',
  'Low Stock': '#FFCC00',
  Normal: '#34C759',
};

export const STATUS_TEXT_COLORS: Record<InventoryStatus, string> = {
  'Out of Stock': '#FFFFFF',
  Critical: '#FFFFFF',
  'Low Stock': '#1A1A1A',
  Normal: '#FFFFFF',
};

export function getStatusColor(status: InventoryStatus): string {
  return STATUS_COLORS[status];
}

export function getStatusTextColor(status: InventoryStatus): string {
  return STATUS_TEXT_COLORS[status];
}

export function formatPrice(price: number): string {
  return `PHP ${price.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

const ADJECTIVES = [
  'Premium',
  'Standard',
  'Heavy-Duty',
  'Lightweight',
  'Professional',
  'Industrial',
  'Portable',
  'Digital',
  'Wireless',
  'Ergonomic',
  'High-Speed',
  'Ultra',
  'Smart',
  'Compact',
  'Advanced',
];

const CATEGORY_PRODUCTS: Record<string, string[]> = {
  'Office Supply': [
    'Ballpen Set',
    'Sticky Notes',
    'File Folder',
    'Stapler',
    'Paper Ream',
    'Correction Tape',
    'Highlighter Pack',
    'Binder Clip Set',
    'Ruler',
    'Tape Dispenser',
    'Whiteboard Marker',
    'Index Cards',
    'Envelope Pack',
    'Rubber Band Box',
    'Paper Clip Set',
  ],
  'Medical Supply': [
    'Surgical Gloves',
    'Face Mask Box',
    'Alcohol Bottle',
    'Cotton Roll',
    'Bandage Roll',
    'Syringe Pack',
    'Thermometer',
    'Blood Pressure Monitor',
    'First Aid Kit',
    'Antiseptic Solution',
    'Gauze Pad',
    'IV Drip Set',
    'Oxygen Mask',
    'Pulse Oximeter',
    'Tongue Depressor',
  ],
  Electronics: [
    'USB-C Hub',
    'HDMI Cable',
    'Mechanical Keyboard',
    'Gaming Mouse',
    'Monitor Stand',
    'Webcam',
    'Microphone',
    'External SSD',
    'RAM Module',
    'Power Bank',
    'LED Desk Lamp',
    'Noise-Cancelling Headset',
    'Laptop Cooling Pad',
    'Wireless Charger',
    'Smart Switch',
  ],
  Furniture: [
    'Office Chair',
    'Standing Desk',
    'Filing Cabinet',
    'Bookshelf',
    'Conference Table',
    'Storage Rack',
    'Locker Unit',
    'Reception Desk',
    'Visitor Chair',
    'Whiteboard',
    'Cubicle Partition',
    'Sofa Set',
    'Display Shelf',
    'TV Cabinet',
    'Workstation',
  ],
  Asset: [
    'Laptop Unit',
    'Desktop PC',
    'Projector',
    'Printer',
    'Scanner',
    'Photocopier',
    'Server Rack',
    'UPS Battery',
    'CCTV Camera',
    'Access Control Terminal',
    'POS Terminal',
    'Tablet Device',
    'IP Phone',
    'Network Switch',
    'WiFi Router',
  ],
  Consumable: [
    'Printer Ink Cartridge',
    'Toner Cartridge',
    'Coffee Pack',
    'Cleaning Solution',
    'Tissue Roll',
    'Disinfectant Spray',
    'Trash Bag Roll',
    'Dishwashing Liquid',
    'Hand Soap Refill',
    'Air Freshener',
    'Detergent Powder',
    'Floor Wax',
    'Mop Head',
    'Sponge Pack',
    'Water Jug',
  ],
};

export function generateItemName(category: string, index: number): string {
  const products = CATEGORY_PRODUCTS[category] ?? ['Generic Item'];
  const adjective = ADJECTIVES[index % ADJECTIVES.length];
  const product = products[index % products.length];

  return `${adjective} ${product}`;
}

export function filterInventory(
  items: InventoryItem[],
  searchText: string,
  selectedCategory: string,
): InventoryItem[] {
  const query = searchText.trim().toLowerCase();

  return items.filter((item) => {
    const matchesSearch = query === '' || item.itemName.toLowerCase().includes(query);
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
}

export function sortInventory(
  items: InventoryItem[],
  sortOption: SortOption,
): InventoryItem[] {
  if (sortOption === 'none') return items;

  return [...items].sort((a, b) => {
    switch (sortOption) {
      case 'quantity_asc':
        return a.quantity - b.quantity;
      case 'quantity_desc':
        return b.quantity - a.quantity;
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });
}

export function getTotalValue(items: InventoryItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
}

export function getStatusCounts(items: InventoryItem[]): Record<InventoryStatus, number> {
  const counts: Record<InventoryStatus, number> = {
    Normal: 0,
    'Low Stock': 0,
    Critical: 0,
    'Out of Stock': 0,
  };

  items.forEach((item) => {
    counts[item.status] = (counts[item.status] ?? 0) + 1;
  });

  return counts;
}
