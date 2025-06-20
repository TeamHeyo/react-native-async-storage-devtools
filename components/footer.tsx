import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FooterProps {
  onCreateNew: () => void;
  onRefresh: () => void;
}

const Footer: React.FC<FooterProps> = ({ onCreateNew, onRefresh }) => {
  return (
    <View style={styles.footer}>
      <View style={styles.footerButtons}>
        <TouchableOpacity
          onPress={onCreateNew}
          style={styles.createBtn}
        >
          <Text style={styles.createBtnText}>Create New</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onRefresh}
          style={styles.reloadBtn}
        >
          <Text style={styles.reloadBtnText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Footer;
