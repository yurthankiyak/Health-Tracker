import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../constants/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'blue';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({ title, variant = 'primary', style, textStyle, ...props }) => {
  const bgColor = variant === 'blue' ? theme.colors.buttonBlue : variant === 'secondary' ? theme.colors.background : theme.colors.primary;
  const color = variant === 'secondary' ? theme.colors.primary : theme.colors.background;

  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: bgColor }, style]} 
      {...props}
    >
      <Text style={[styles.text, { color }, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  }
});

export default Button;
