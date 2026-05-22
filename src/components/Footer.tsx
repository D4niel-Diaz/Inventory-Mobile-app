import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.dotsRow}>
        <View style={[styles.dot, styles.dotLarge]} />
        <View style={[styles.dot, styles.dotMedium]} />
        <View style={[styles.dot, styles.dotSmall]} />
      </View>

      <Text style={styles.title}>End of Inventory List</Text>
      <Text style={styles.subtitle}>All items on this page have been displayed</Text>

      <View style={styles.tag}>
        <Text style={styles.tagText}>Developed By Daniel</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    paddingBottom: 36,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  dot: {
    borderRadius: 99,
    backgroundColor: '#2563EB',
    opacity: 0.5,
  },
  dotLarge: {
    width: 10,
    height: 10,
  },
  dotMedium: {
    width: 6,
    height: 6,
    opacity: 0.35,
  },
  dotSmall: {
    width: 4,
    height: 4,
    opacity: 0.2,
  },
  title: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 20,
  },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  tagText: {
    fontSize: 10,
    color: '#1D4ED8',
    fontWeight: '900',
  },
});

export default React.memo(Footer);
