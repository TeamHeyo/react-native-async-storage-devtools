import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import Header from './components/header';
import Footer from './components/footer';
import StorageItem from './components/storage-item';
import EmptyState from './components/empty-state';
import EditModal from './components/edit-modal';
import CreateModal from './components/create-modal';
import StatsBar from './components/stats-bar';
import FloatingActionButton from './components/floating-action-button';

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
      overlayOpacity.setValue(0);
      panelTranslateY.setValue(400);
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
      <FloatingActionButton onPress={() => setVisible(true)} />
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
                <Header onClose={() => setVisible(false)} />
                <View style={styles.content}>
                  <StatsBar itemCount={storage.length} />
                  <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                  >
                    {storage.length === 0 ? (
                      <EmptyState />
                    ) : (
                      storage.map(({ key, value }) => (
                        <StorageItem
                          key={key}
                          itemKey={key}
                          value={value}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                        />
                      ))
                    )}
                  </ScrollView>
                </View>
                <Footer onCreateNew={handleCreateNew} onRefresh={loadStorage} />
              </View>
            </Animated.View>
          </View>

          <EditModal
            visible={editingKey !== null}
            editingKey={editingKey}
            editingValue={editingValue}
            onValueChange={setEditingValue}
            onSave={handleSave}
            onCancel={() => setEditingKey(null)}
          />

          <CreateModal
            visible={creatingNew}
            newKey={newKey}
            newValue={newValue}
            onKeyChange={setNewKey}
            onValueChange={setNewValue}
            onSave={handleSaveNew}
            onCancel={() => setCreatingNew(false)}
          />
        </Animated.View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollView: {
    flex: 1,
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
