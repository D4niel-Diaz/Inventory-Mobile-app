import React, { useRef, useCallback } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { SearchBarProps } from '../types/inventory';

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search inventory items...',
}) => {
  const inputRef = useRef<TextInput>(null);

  const handleClear = useCallback(() => {
    onChangeText('');
    inputRef.current?.focus();
  }, [onChangeText]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.icon}>Search</Text>

      <TextInput
        ref={inputRef}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#5A5A7A"
        returnKeyType="search"
        clearButtonMode="never"
        autoCorrect={false}
        autoCapitalize="none"
        selectionColor="#6C63FF"
      />

      {value.length > 0 && (
        <TouchableOpacity
          style={styles.clearBtn}
          onPress={handleClear}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityLabel="Clear search"
        >
          <Text style={styles.clearText}>X</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DDE5F0',
    paddingHorizontal: 14,
    marginHorizontal: 16,
    marginTop: 12,
    height: 50,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  icon: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '900',
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
    paddingVertical: 0,
    height: '100%',
  },
  clearBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  clearText: {
    color: '#475569',
    fontSize: 11,
    fontWeight: '900',
    lineHeight: 14,
  },
});

export default React.memo(SearchBar);
