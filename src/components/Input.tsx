import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { theme } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, icon, error, ...props }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.errorBorder]}>
        {icon && <Ionicons name={icon} size={20} color={theme.colors.buttonBlue} style={styles.icon} />}
        <TextInput 
          style={styles.input} 
          placeholderTextColor={theme.colors.lightText}
          {...props}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.m,
  },
  label: {
    fontSize: 12,
    color: theme.colors.lightText,
    marginBottom: 4,
    paddingLeft: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingVertical: 8,
  },
  errorBorder: {
    borderBottomColor: 'red',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  }
});

export default Input;
