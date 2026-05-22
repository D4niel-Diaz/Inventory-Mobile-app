import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderProps } from '../types/inventory';

const Header: React.FC<HeaderProps> = ({
  totalCount,
  filteredCount,
  selectedCategory,
  currentPage,
  totalPages,
}) => {

  const isFiltered = filteredCount !== totalCount;
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <View style={styles.iconBox}>
            <Text style={styles.iconText}>Flatlist</Text>
          </View>
          <View style={styles.titleBlock}>
            <Text style={styles.appTitle}>INV</Text>
            <Text style={styles.subtitle}>Inventory Management System</Text>
          </View>
        </View>
        <View style={styles.contextRow}>
          <View style={styles.contextPill}>
            <Text style={styles.contextLabel}>Category</Text>
            <Text style={styles.contextValue} numberOfLines={1}>
              {selectedCategory}
            </Text>
          </View>
          <View style={styles.contextPill}>
            <Text style={styles.contextLabel}>Page</Text>
            <Text style={styles.contextValue}>
              {currentPage} of {totalPages}
            </Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statChip}>
            <Text style={styles.statValue}>{totalCount}</Text>
            <Text style={styles.statLabel}>Total Items</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statChip}>
            <Text style={[styles.statValue, isFiltered && styles.filteredValue]}>
              {filteredCount}
            </Text>
            <Text style={styles.statLabel}>
              {isFiltered ? 'Filtered' : 'Showing All'}
            </Text>
          </View>

          {isFiltered && (
            <>
              <View style={styles.divider} />
              <View style={styles.statChip}>
                <Text style={styles.hiddenValue}>{totalCount - filteredCount}</Text>
                <Text style={styles.statLabel}>Hidden</Text>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    elevation: 3,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  titleBlock: {
    flex: 1,
  },
  iconBox: {
    width: 46,
    height: 46,
    backgroundColor: '#2563EB',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '600',
  },
  contextRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  contextPill: {
    flex: 1,
    minHeight: 50,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  contextLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  contextValue: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '900',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  statChip: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#2563EB',
  },
  filteredValue: {
    color: '#0F766E',
  },
  hiddenValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#DC2626',
  },
  statLabel: {
    fontSize: 10,
    color: '#475569',
    marginTop: 2,
    textTransform: 'uppercase',
    fontWeight: '800',
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: '#BFDBFE',
    marginHorizontal: 6,
  },
});

export default React.memo(Header);
