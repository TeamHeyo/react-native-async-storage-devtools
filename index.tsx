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
} from 'react-native';

const AsyncStorageDevTool: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [storage, setStorage] = useState<{ key: string; value: string }[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');

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

  const handleDelete = async (key: string) => {
    await AsyncStorage.removeItem(key);
    loadStorage();
  };

  if (!__DEV__) {
    return null;
  }

  return (
    <>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.fabText}>⚡️</Text>
      </TouchableOpacity>
      <Modal visible={visible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.panel}>
            <View style={styles.stickyTitleContainer}>
              <Text style={styles.title}>AsyncStorage DevTools ⚡️</Text>
            </View>
            <ScrollView style={{ maxHeight: 400 }}>
              {storage.map(({ key, value }: { key: string; value: string }) => (
                <View key={key} style={styles.item}>
                  <Text style={styles.key}>{key}</Text>
                  <Text style={styles.value} numberOfLines={1}>
                    {value}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleEdit(key, value)}
                    style={styles.actionBtn}
                  >
                    <Text style={{ color: '#2563eb', fontWeight: 'bold' }}>
                      Edit
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDelete(key)}
                    style={styles.deleteBtn}
                  >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={loadStorage} style={styles.reloadBtn}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Reload</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={styles.closeBtn}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </View>
          <Modal visible={editingKey !== null} transparent animationType="fade">
            <View style={styles.editOverlay}>
              <View style={styles.editPanel}>
                <Text style={styles.editTitle}>
                  Edit Value for {editingKey}
                </Text>
                <ScrollView
                  style={{ maxHeight: 400 }}
                  contentContainerStyle={{ flexGrow: 1 }}
                >
                  <TextInput
                    style={styles.input}
                    value={editingValue}
                    onChangeText={setEditingValue}
                    multiline
                  />
                </ScrollView>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                      Save
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setEditingKey(null)}
                    style={styles.cancelBtn}
                  >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#2563eb',
    borderRadius: 30,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
  },
  panel: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    minHeight: 300,
    elevation: 10,
    paddingBottom: 32,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  stickyTitleContainer: {
    backgroundColor: '#fff',
    paddingBottom: 8,
    paddingTop: 4,
    zIndex: 2,
    elevation: 2,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 4,
  },
  key: { flex: 2, fontWeight: 'bold', fontSize: 12 },
  value: { flex: 3, fontSize: 12, color: '#555' },
  actionBtn: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: '#e0f0ff',
    borderRadius: 4,
  },
  reloadBtn: {
    marginTop: 10,
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  closeBtn: {
    marginTop: 10,
    backgroundColor: '#888',
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  editOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editPanel: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    elevation: 10,
    maxHeight: 500,
  },
  editTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    minHeight: 60,
    marginBottom: 12,
    fontSize: 14,
  },
  saveBtn: {
    backgroundColor: '#22c55e',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
    marginTop: 12,
  },
  cancelBtn: {
    backgroundColor: '#888',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
    flex: 1,
  },
  deleteBtn: {
    backgroundColor: '#ef4444',
    padding: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
});

export default AsyncStorageDevTool;
