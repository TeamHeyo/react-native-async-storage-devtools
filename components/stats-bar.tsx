import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StatsBarProps {
  itemCount: number;
}

const StatsBar: React.FC<StatsBarProps> = ({ itemCount }) => {
  return (
    <View style={styles.statsContainer}>
      <Text style={styles.statsText}>
        {itemCount} {itemCount === 1 ? 'item' : 'items'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    marginBottom: 16,
  },
  statsText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
});

export default StatsBar;
