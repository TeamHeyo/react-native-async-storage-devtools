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

interface EditModalProps {
  visible: boolean;
  editingKey: string | null;
  editingValue: string;
  onValueChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  visible,
  editingKey,
  editingValue,
  onValueChange,
  onSave,
  onCancel,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={modalStyles.editOverlay}>
        <View style={modalStyles.editPanel}>
          <View style={modalStyles.editHeader}>
            <Text style={modalStyles.editTitle}>Edit Storage Item</Text>
            <Text style={modalStyles.editSubtitle}>{editingKey}</Text>
          </View>
          <Text style={modalStyles.inputLabel}>Value</Text>
          <ScrollView
            style={modalStyles.editScrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={modalStyles.inputContainer}>
              <TextInput
                style={modalStyles.input}
                value={editingValue}
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
              <Text style={modalStyles.saveBtnText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditModal;
