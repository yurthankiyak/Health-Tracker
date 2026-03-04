import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { theme } from '../constants/theme';

interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outlined';
}

const Card: React.FC<CardProps> = ({ children, variant = 'elevated', style, ...props }) => {
  return (
    <View style={[styles.card, variant === 'outlined' ? styles.outlined : styles.elevated, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  outlined: {
    borderWidth: 1,
    borderColor: theme.colors.border,
  }
});

export default Card;
