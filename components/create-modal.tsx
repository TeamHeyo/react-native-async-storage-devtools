import React from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { modalStyles } from './sharedStyles';

interface CreateModalProps {
  visible: boolean;
  newKey: string;
  newValue: string;
  onKeyChange: (key: string) => void;
  onValueChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const CreateModal: React.FC<CreateModalProps> = ({
  visible,
  newKey,
  newValue,
  onKeyChange,
  onValueChange,
  onSave,
  onCancel,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={modalStyles.editOverlay}>
        <View style={modalStyles.editPanel}>
          <View style={modalStyles.editHeader}>
            <Text style={modalStyles.editTitle}>Create New Storage Item</Text>
            <Text style={modalStyles.editSubtitle}>
              Add a new key-value pair
            </Text>
          </View>
          <ScrollView
            style={modalStyles.editScrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={modalStyles.inputContainer}>
              <Text style={modalStyles.inputLabel}>Key</Text>
              <TextInput
                style={modalStyles.keyInput}
                value={newKey}
                onChangeText={onKeyChange}
                placeholder="Enter key..."
                placeholderTextColor="#9CA3AF"
                multiline={false}
                autoCapitalize="none"
              />
            </View>
            <View style={modalStyles.inputContainer}>
              <Text style={modalStyles.inputLabel}>Value</Text>
              <TextInput
                style={modalStyles.input}
                value={newValue}
                onChangeText={onValueChange}
                multiline
                placeholder="Enter value..."
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </ScrollView>
          <View style={modalStyles.editActions}>
            <TouchableOpacity onPress={onCancel} style={modalStyles.cancelBtn}>
              <Text style={modalStyles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSave} style={modalStyles.saveBtn}>
              <Text style={modalStyles.saveBtnText}>Create Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateModal;
