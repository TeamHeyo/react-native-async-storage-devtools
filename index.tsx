import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';

const AsyncStorageDevTools: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [storage, setStorage] = useState<{ key: string; value: string }[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');
  const [creatingNew, setCreatingNew] = useState(false);
  const [newKey, setNewKey] = useState<string>('');
  const [newValue, setNewValue] = useState<string>('');
  const [overlayOpacity] = useState(new Animated.Value(0));
  const [panelTranslateY] = useState(new Animated.Value(400));

  const loadStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const stores = await AsyncStorage.multiGet(keys);
      setStorage(
        stores.map(([key, value]: [string, string]) => ({
          key: key as string,
          value: value as string,
        }))
      );
    } catch (e) {
      Alert.alert('Error', 'Failed to load AsyncStorage');
    }
  };

  useEffect(() => {
    if (visible) {
      loadStorage();
      // Reset animated values first
      overlayOpacity.setValue(0);
      panelTranslateY.setValue(400);
      // Animate overlay fade in and panel slide up
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(panelTranslateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate overlay fade out and panel slide down
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(panelTranslateY, {
          toValue: 400,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleEdit = (key: string, value: string) => {
    setEditingKey(key);
    setEditingValue(value);
  };

  const handleSave = async () => {
    if (editingKey !== null) {
      await AsyncStorage.setItem(editingKey, editingValue);
      setEditingKey(null);
      setEditingValue('');
      loadStorage();
    }
  };

  const handleCreateNew = () => {
    setCreatingNew(true);
    setNewKey('');
    setNewValue('');
  };

  const handleSaveNew = async () => {
    if (newKey.trim() && newValue.trim()) {
      await AsyncStorage.setItem(newKey.trim(), newValue.trim());
      setCreatingNew(false);
      setNewKey('');
      setNewValue('');
      loadStorage();
    } else {
      Alert.alert('Error', 'Please enter both key and value');
    }
  };

  const handleDelete = async (key: string) => {
    Alert.alert('Delete Item', `Are you sure you want to delete "${key}"?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem(key);
          loadStorage();
        },
      },
    ]);
  };

  if (!__DEV__) {
    return null;
  }

  return (
    <>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>⚡️</Text>
      </TouchableOpacity>
      <Modal visible={visible} transparent animationType="none">
        <Animated.View
          style={[styles.modalOverlay, { opacity: overlayOpacity }]}
        >
          <View style={styles.overlayTouchable}>
            <Animated.View
              style={[
                styles.panel,
                { transform: [{ translateY: panelTranslateY }] },
              ]}
            >
              <View style={styles.panelContent}>
                <View style={styles.header}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>AsyncStorage DevTools</Text>
                    <Text style={styles.subtitle}>Development Tools</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setVisible(false)}
                    style={styles.closeIcon}
                  >
                    <Text style={styles.closeIconText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.content}>
                  <View style={styles.statsContainer}>
                    <Text style={styles.statsText}>
                      {storage.length} {storage.length === 1 ? 'item' : 'items'}
                    </Text>
                  </View>

                  <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                  >
                    {storage.length === 0 ? (
                      <View style={styles.emptyState}>
                        <Text style={styles.emptyStateText}>
                          No data in AsyncStorage
                        </Text>
                        <Text style={styles.emptyStateSubtext}>
                          Add some data to see it here
                        </Text>
                      </View>
                    ) : (
                      storage.map(
                        ({ key, value }: { key: string; value: string }) => (
                          <View key={key} style={styles.item}>
                            <View style={styles.itemHeaderRow}>
                              <Text style={styles.key} numberOfLines={1}>
                                {key}
                              </Text>
                              <View style={styles.itemActions}>
                                <TouchableOpacity
                                  onPress={() => handleEdit(key, value)}
                                  style={styles.editBtn}
                                >
                                  <Text style={styles.editBtnText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() => handleDelete(key)}
                                  style={styles.deleteBtn}
                                >
                                  <Text style={styles.deleteBtnText}>
                                    Delete
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                            <Text style={styles.value} numberOfLines={2}>
                              {value}
                            </Text>
                          </View>
                        )
                      )
                    )}
                  </ScrollView>
                </View>

                <View style={styles.footer}>
                  <View style={styles.footerButtons}>
                    <TouchableOpacity
                      onPress={handleCreateNew}
                      style={styles.createBtn}
                    >
                      <Text style={styles.createBtnText}>Create New</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={loadStorage}
                      style={styles.reloadBtn}
                    >
                      <Text style={styles.reloadBtnText}>Refresh</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Animated.View>
          </View>

          <Modal visible={editingKey !== null} transparent animationType="fade">
            <View style={styles.editOverlay}>
              <View style={styles.editPanel}>
                <View style={styles.editHeader}>
                  <Text style={styles.editTitle}>Edit Storage Item</Text>
                  <Text style={styles.editSubtitle}>{editingKey}</Text>
                </View>

                <Text style={styles.inputLabel}>Value</Text>
                <ScrollView
                  style={styles.editScrollView}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      value={editingValue}
                      onChangeText={setEditingValue}
                      multiline
                      placeholder="Enter value..."
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>
                </ScrollView>

                <View style={styles.editActions}>
                  <TouchableOpacity
                    onPress={() => setEditingKey(null)}
                    style={styles.cancelBtn}
                  >
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
                    <Text style={styles.saveBtnText}>Save Changes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <Modal visible={creatingNew} transparent animationType="fade">
            <View style={styles.editOverlay}>
              <View style={styles.editPanel}>
                <View style={styles.editHeader}>
                  <Text style={styles.editTitle}>Create New Storage Item</Text>
                  <Text style={styles.editSubtitle}>
                    Add a new key-value pair
                  </Text>
                </View>

                <ScrollView
                  style={styles.editScrollView}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Key</Text>
                    <TextInput
                      style={styles.keyInput}
                      value={newKey}
                      onChangeText={setNewKey}
                      placeholder="Enter key..."
                      placeholderTextColor="#9CA3AF"
                      multiline={false}
                      autoCapitalize="none"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Value</Text>
                    <TextInput
                      style={styles.input}
                      value={newValue}
                      onChangeText={setNewValue}
                      multiline
                      placeholder="Enter value..."
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>
                </ScrollView>

                <View style={styles.editActions}>
                  <TouchableOpacity
                    onPress={() => setCreatingNew(false)}
                    style={styles.cancelBtn}
                  >
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSaveNew}
                    style={styles.saveBtn}
                  >
                    <Text style={styles.saveBtnText}>Create Item</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </Animated.View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 10,
    backgroundColor: '#1F2937',
    borderRadius: 28,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 12,
  },
  fabText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  panel: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: 400,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
    fontWeight: '500',
  },
  closeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIconText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
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
  scrollView: {
    flex: 1,
  },
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
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  footerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  createBtn: {
    flex: 1,
    backgroundColor: '#059669',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  createBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  reloadBtn: {
    flex: 1,
    backgroundColor: '#1F2937',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  reloadBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  editOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  editPanel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 20,
    maxHeight: '50%',
    flex: 1,
  },
  editHeader: {
    marginBottom: 20,
  },
  editTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  editSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  editScrollView: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    minHeight: 100,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#F9FAFB',
    textAlignVertical: 'top',
  },
  keyInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#F9FAFB',
    minHeight: 0,
    height: 44,
  },
  editActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    marginTop: 14,
    borderColor: '#E5E7EB',
  },
  cancelBtnText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  saveBtn: {
    flex: 1,
    backgroundColor: '#059669',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 14,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  overlayTouchable: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  panelContent: {
    flex: 1,
  },
});

export default AsyncStorageDevTools;
