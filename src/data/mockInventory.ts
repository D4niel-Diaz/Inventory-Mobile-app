
import { InventoryItem } from '../types/inventory';
import { CATEGORIES } from '../constants/categories';
import { getStatus, generateItemName } from '../utils/inventoryHelpers';


function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPrice(): number {
  return parseFloat((Math.random() * 9989 + 10).toFixed(2));
}
export const MOCK_INVENTORY: InventoryItem[] = Array.from(
  { length: 500 },
  (_, index): InventoryItem => {
    const id       = `item-${String(index + 1).padStart(3, '0')}`;
    const category = CATEGORIES[index % CATEGORIES.length];

    
    let quantity: number;
    const roll = index % 25; // deterministic distribution (no random seed drift)
    if (roll < 2)       quantity = 0;
    else if (roll < 6)  quantity = randomInt(1, 10);
    else if (roll < 11) quantity = randomInt(11, 30);
    else                quantity = randomInt(31, 150);

    const price    = randomPrice();
    const itemName = generateItemName(category, index);
    const status   = getStatus(quantity);

    return { id, itemName, category, quantity, price, status };
  },
);

export default MOCK_INVENTORY;
