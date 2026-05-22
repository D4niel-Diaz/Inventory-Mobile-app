import React, { useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { CategoryFilterProps } from '../types/inventory';
import { CATEGORY_COLORS } from '../constants/categories';

function getChipColor(category: string): string {
  return CATEGORY_COLORS[category] ?? '#2563EB';
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const handlePress = useCallback(
    (cat: string) => {
      onSelectCategory(cat);
    },
    [onSelectCategory],
  );

  return (
    <View style={styles.outerWrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {categories.map((cat) => {
          const isActive = cat === selectedCategory;
          const chipColor = getChipColor(cat);

          return (
            <TouchableOpacity
              key={cat}
              style={[
                styles.chip,
                isActive && { backgroundColor: chipColor, borderColor: chipColor },
                !isActive && styles.chipInactive,
              ]}
              onPress={() => handlePress(cat)}
              activeOpacity={0.75}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={`Filter by ${cat}`}
            >
              <Text
                style={[
                  styles.chipText,
                  isActive ? styles.chipTextActive : styles.chipTextInactive,
                ]}
              >
                {cat}
              </Text>

              {isActive && <View style={[styles.activeDot, { backgroundColor: '#FFFFFF99' }]} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    paddingTop: 10,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 2,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 38,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 5,
  },
  chipInactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DDE5F0',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  chipTextInactive: {
    color: '#475569',
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
});

export default React.memo(CategoryFilter);
