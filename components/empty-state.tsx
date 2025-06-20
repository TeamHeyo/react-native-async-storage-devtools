import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const EmptyState: React.FC = () => {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>No data in AsyncStorage</Text>
      <Text style={styles.emptyStateSubtext}>Add some data to see it here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '500',
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#D1D5DB',
  },
});

export default EmptyState;
