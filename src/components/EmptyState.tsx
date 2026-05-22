import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EmptyStateProps } from '../types/inventory';

const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'No inventory items found',
  detail = 'Try adjusting your search query or select a different category.',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>0</Text>
      </View>

      <Text style={styles.title}>{message}</Text>
      <Text style={styles.hint}>{detail}</Text>

      <View style={styles.separator}>
        <View style={styles.line} />
        <Text style={styles.orText}>no results</Text>
        <View style={styles.line} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 90,
    paddingHorizontal: 32,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#EFF6FF',
    borderWidth: 2,
    borderColor: '#BFDBFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    elevation: 4,
  },
  icon: {
    fontSize: 30,
    color: '#2563EB',
    fontWeight: '900',
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 28,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDE5F0',
  },
  orText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '800',
    textTransform: 'uppercase',
  },
});

export default React.memo(EmptyState);
