import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { InventoryCardProps } from '../types/inventory';
import {
  getStatusColor,
  getStatusTextColor,
  formatPrice,
} from '../utils/inventoryHelpers';
import { CATEGORY_COLORS } from '../constants/categories';

const CATEGORY_ICONS: Record<string, string> = {
  'Office Supply': 'OFF',
  'Medical Supply': 'MED',
  Electronics: 'ELE',
  Furniture: 'FUR',
  Asset: 'AST',
  Consumable: 'CON',
};

function getQuantityRatio(quantity: number): number {
  return Math.min(quantity / 150, 1);
}

const InventoryCard: React.FC<InventoryCardProps> = ({ item }) => {
  const { itemName, category, quantity, price, status } = item;

  const statusBg = getStatusColor(status);
  const statusText = getStatusTextColor(status);
  const catColor = CATEGORY_COLORS[category] ?? '#6C63FF';
  const catIcon = CATEGORY_ICONS[category] ?? 'INV';
  const qtyRatio = getQuantityRatio(quantity);

  return (
    <View style={styles.card}>
      <View style={[styles.accentStripe, { backgroundColor: catColor }]} />
      <View style={styles.body}>
        <View style={styles.topRow}>
          <View style={[styles.categoryIcon, { backgroundColor: catColor + '18' }]}>
            <Text style={styles.categoryIconText}>{catIcon}</Text>
          </View>

          <View style={styles.nameBlock}>
            <Text style={styles.itemName} numberOfLines={1} ellipsizeMode="tail">
              {itemName}
            </Text>
            <View style={[styles.categoryPill, { backgroundColor: catColor + '22' }]}>
              <Text style={[styles.categoryPillText, { color: catColor }]}>
                {category}
              </Text>
            </View>
          </View>

          <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
            <Text style={[styles.statusText, { color: statusText }]}>
              {status}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.bottomRow}>
          <View style={styles.qtyBlock}>
            <View style={styles.qtyLabelRow}>
              <Text style={styles.metaLabel}>Quantity</Text>
              <Text style={[styles.qtyValue, { color: statusBg }]}>
                {quantity} units
              </Text>
            </View>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${qtyRatio * 100}%`,
                    backgroundColor: statusBg,
                  },
                ]}
              />
            </View>
          </View>

          <View style={styles.priceBlock}>
            <Text style={styles.metaLabel}>Unit Price</Text>
            <Text style={styles.priceValue}>{formatPrice(price)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 7,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  accentStripe: {
    width: 4,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  body: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 14,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  categoryIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIconText: {
    fontSize: 10,
    color: '#0F172A',
    fontWeight: '900',
  },
  nameBlock: {
    flex: 1,
    gap: 4,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A',
  },
  categoryPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  categoryPillText: {
    fontSize: 10,
    fontWeight: '800',
  },
  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
    alignSelf: 'flex-start',
    minWidth: 80,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 12,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  qtyBlock: {
    flex: 1,
    gap: 5,
  },
  qtyLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 10,
    color: '#64748B',
    textTransform: 'uppercase',
    fontWeight: '800',
  },
  qtyValue: {
    fontSize: 12,
    fontWeight: '900',
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  priceBlock: {
    alignItems: 'flex-end',
    gap: 3,
  },
  priceValue: {
    fontSize: 15,
    fontWeight: '900',
    color: '#2563EB',
  },
});

export default React.memo(InventoryCard, (prev, next) => {
  return (
    prev.item.id === next.item.id &&
    prev.item.quantity === next.item.quantity &&
    prev.item.price === next.item.price &&
    prev.item.status === next.item.status
  );
});
