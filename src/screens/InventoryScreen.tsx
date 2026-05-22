import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import CategoryFilter from '../components/CategoryFilter';
import EmptyState from '../components/EmptyState';
import Footer from '../components/Footer';
import Header from '../components/Header';
import InventoryCard from '../components/InventoryCard';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import { FILTER_CATEGORIES } from '../constants/categories';
import { MOCK_INVENTORY } from '../data/mockInventory';
import { usePagination } from '../hooks/usePagination';
import {
  filterInventory,
  formatPrice,
  getStatusColor,
  getStatusCounts,
  getTotalValue,
  sortInventory,
} from '../utils/inventoryHelpers';
import {
  InventoryItem,
  InventoryStatus,
  SortOption,
} from '../types/inventory';

const ITEMS_PER_PAGE = 25;

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Default', value: 'none' },
  { label: 'Quantity Up', value: 'quantity_asc' },
  { label: 'Quantity Down', value: 'quantity_desc' },
  { label: 'Price Up', value: 'price_asc' },
  { label: 'Price Down', value: 'price_desc' },
];

const InventoryScreen: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<SortOption>('none');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>(MOCK_INVENTORY);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

  const listRef = useRef<FlatList<InventoryItem>>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filteredItems = useMemo<InventoryItem[]>(() => {
    const filtered = filterInventory(inventoryData, debouncedSearch, selectedCategory);
    return sortInventory(filtered, sortOption);
  }, [inventoryData, debouncedSearch, selectedCategory, sortOption]);

  const {
    currentPage,
    totalPages,
    paginatedData,
    canGoNext,
    canGoPrevious,
    nextPage,
    previousPage,
    resetPage,
  } = usePagination<InventoryItem>(filteredItems, ITEMS_PER_PAGE);

  const statusCounts = useMemo(() => getStatusCounts(inventoryData), [inventoryData]);
  const totalValue = useMemo(() => getTotalValue(inventoryData), [inventoryData]);

  const scrollToTop = useCallback(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

  const handleSearchChange = useCallback(
    (text: string) => {
      setSearchText(text);
      resetPage();

      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        setDebouncedSearch(text);
      }, 250);
    },
    [resetPage],
  );

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setInventoryData([...MOCK_INVENTORY]);
      resetPage();
      setRefreshing(false);
    }, 2000);
  }, [resetPage]);

  const handleCategorySelect = useCallback(
    (category: string) => {
      setSelectedCategory(category);
      resetPage();
    },
    [resetPage],
  );

  const handleSortSelect = useCallback(
    (option: SortOption) => {
      setSortOption(option);
      resetPage();
    },
    [resetPage],
  );

  const handleNextPage = useCallback(() => {
    nextPage();
    scrollToTop();
  }, [nextPage, scrollToTop]);

  const handlePreviousPage = useCallback(() => {
    previousPage();
    scrollToTop();
  }, [previousPage, scrollToTop]);

  const renderItem = useCallback(
    ({ item }: { item: InventoryItem }) => <InventoryCard item={item} />,
    [],
  );

  const keyExtractor = useCallback((item: InventoryItem) => item.id, []);

  const ListHeaderComponent = useCallback(
    () => (
      <View style={styles.stickyControls}>
        <SearchBar
          value={searchText}
          onChangeText={handleSearchChange}
          placeholder="Search by item name..."
        />

        <CategoryFilter
          categories={FILTER_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sortBar}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.sortLabel}>Sort</Text>
          {SORT_OPTIONS.map((option) => {
            const isActive = sortOption === option.value;

            return (
              <TouchableOpacity
                key={option.value}
                style={[styles.sortChip, isActive && styles.sortChipActive]}
                onPress={() => handleSortSelect(option.value)}
                activeOpacity={0.82}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
              >
                <Text
                  style={[
                    styles.sortChipText,
                    isActive && styles.sortChipTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.resultBar}>
          <View>
            <Text style={styles.resultLabel}>Results</Text>
            <Text style={styles.resultText}>
              Showing {paginatedData.length} of {filteredItems.length} matched items
            </Text>
          </View>
          <Text style={styles.resultPage}>
            Page {currentPage}/{totalPages}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.statsToggle}
          onPress={() => setShowStats((value) => !value)}
          activeOpacity={0.84}
          accessibilityRole="button"
        >
          <Text style={styles.statsToggleText}>
            {showStats ? 'Hide Stats Dashboard' : 'Show Stats Dashboard'}
          </Text>
        </TouchableOpacity>

        {showStats && (
          <View style={styles.statsGrid}>
            {(Object.entries(statusCounts) as [InventoryStatus, number][]).map(
              ([status, count]) => (
                <View key={status} style={styles.statCard}>
                  <View
                    style={[
                      styles.statCardAccent,
                      { backgroundColor: getStatusColor(status) },
                    ]}
                  />
                  <Text style={styles.statCardCount}>{count}</Text>
                  <Text style={styles.statCardLabel}>{status}</Text>
                </View>
              ),
            )}

            <View style={styles.statCard}>
              <View
                style={[
                  styles.statCardAccent,
                  { backgroundColor: '#2563EB' },
                ]}
              />
              <Text style={styles.totalValueText}>{formatPrice(totalValue)}</Text>
              <Text style={styles.statCardLabel}>Total Value</Text>
            </View>
          </View>
        )}
      </View>
    ),
    [
      currentPage,
      filteredItems.length,
      handleCategorySelect,
      handleSearchChange,
      handleSortSelect,
      paginatedData.length,
      searchText,
      selectedCategory,
      showStats,
      sortOption,
      statusCounts,
      totalPages,
      totalValue,
    ],
  );

  const ListFooterComponent = useCallback(
    () => (
      <>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={handleNextPage}
          onPrevious={handlePreviousPage}
          canGoNext={canGoNext}
          canGoPrevious={canGoPrevious}
        />
        <Footer />
      </>
    ),
    [
      canGoNext,
      canGoPrevious,
      currentPage,
      handleNextPage,
      handlePreviousPage,
      totalPages,
    ],
  );

  const ListEmptyComponent = useCallback(
    () => (
      <EmptyState
        message="No inventory items found"
        detail="Try a different search term or choose another category."
      />
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <Header
        totalCount={inventoryData.length}
        filteredCount={filteredItems.length}
        selectedCategory={selectedCategory}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      <FlatList<InventoryItem>
        ref={listRef}
        data={paginatedData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews
        ListHeaderComponent={ListHeaderComponent}
        stickyHeaderIndices={[0]}
        ListFooterComponent={filteredItems.length > 0 ? ListFooterComponent : null}
        ListEmptyComponent={ListEmptyComponent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#2563EB"
            colors={['#2563EB']}
            progressBackgroundColor="#FFFFFF"
          />
        }
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={
          filteredItems.length === 0 ? styles.emptyContainer : styles.listContent
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  listContent: {
    paddingBottom: 8,
  },
  emptyContainer: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  stickyControls: {
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 10,
  },
  sortBar: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sortLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '800',
    marginRight: 2,
    textTransform: 'uppercase',
  },
  sortChip: {
    minHeight: 36,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE5F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortChipActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  sortChipText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '800',
  },
  sortChipTextActive: {
    color: '#FFFFFF',
  },
  resultBar: {
    marginHorizontal: 16,
    marginTop: 6,
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultLabel: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  resultText: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  resultPage: {
    color: '#1D4ED8',
    fontSize: 13,
    fontWeight: '900',
  },
  statsToggle: {
    marginHorizontal: 16,
    marginTop: 10,
    minHeight: 44,
    paddingHorizontal: 16,
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsToggleText: {
    fontSize: 13,
    color: '#1D4ED8',
    fontWeight: '900',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 10,
    gap: 10,
  },
  statCard: {
    flex: 1,
    minWidth: '44%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  statCardAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  statCardCount: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 8,
  },
  totalValueText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 10,
  },
  statCardLabel: {
    fontSize: 10,
    color: '#64748B',
    textTransform: 'uppercase',
    marginTop: 3,
    fontWeight: '800',
  },
});

export default InventoryScreen;
