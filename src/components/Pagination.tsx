import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PaginationProps } from '../types/inventory';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, !canGoPrevious && styles.buttonDisabled]}
        onPress={onPrevious}
        disabled={!canGoPrevious}
        activeOpacity={0.82}
        accessibilityRole="button"
        accessibilityState={{ disabled: !canGoPrevious }}
      >
        <Text style={[styles.buttonText, !canGoPrevious && styles.buttonTextDisabled]}>
          Previous
        </Text>
      </TouchableOpacity>

      <View style={styles.pagePill}>
        <Text style={styles.pageLabel}>Page</Text>
        <Text style={styles.pageValue}>
          {currentPage} of {totalPages}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.nextButton, !canGoNext && styles.buttonDisabled]}
        onPress={onNext}
        disabled={!canGoNext}
        activeOpacity={0.82}
        accessibilityRole="button"
        accessibilityState={{ disabled: !canGoNext }}
      >
        <Text style={[styles.buttonText, !canGoNext && styles.buttonTextDisabled]}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
  },
  button: {
    flex: 1,
    minHeight: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE5F0',
  },
  nextButton: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  buttonDisabled: {
    backgroundColor: '#EDF2F7',
    borderColor: '#E2E8F0',
  },
  buttonText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '800',
  },
  buttonTextDisabled: {
    color: '#94A3B8',
  },
  pagePill: {
    minWidth: 96,
    minHeight: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingHorizontal: 10,
  },
  pageLabel: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  pageValue: {
    color: '#1D4ED8',
    fontSize: 13,
    fontWeight: '900',
    marginTop: 1,
  },
});

export default React.memo(Pagination);
