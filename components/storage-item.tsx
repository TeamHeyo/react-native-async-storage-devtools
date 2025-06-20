import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface StorageItemProps {
  itemKey: string;
  value: string;
  onEdit: (key: string, value: string) => void;
  onDelete: (key: string) => void;
}

const StorageItem: React.FC<StorageItemProps> = ({
  itemKey,
  value,
  onEdit,
  onDelete,
}) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemHeaderRow}>
        <Text style={styles.key} numberOfLines={1}>
          {itemKey}
        </Text>
        <View style={styles.itemActions}>
          <TouchableOpacity
            onPress={() => onEdit(itemKey, value)}
            style={styles.editBtn}
          >
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelete(itemKey)}
            style={styles.deleteBtn}
          >
            <Text style={styles.deleteBtnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.value} numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  itemHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
    gap: 8,
  },
  key: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  value: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
  itemActions: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 2,
  },
  editBtn: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  editBtnText: {
    color: '#1D4ED8',
    fontSize: 12,
    fontWeight: '700',
  },
  deleteBtn: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  deleteBtnText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default StorageItem;
