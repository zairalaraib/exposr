import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BorderRadius, Spacing, Shadows, currentTheme } from '../../constants/theme';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  elevated?: boolean;
  padding?: keyof typeof Spacing;
}

export function Card({ children, style, elevated = true, padding = 'md' }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        elevated && Shadows.md,
        { padding: Spacing[padding] },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: currentTheme.surface,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
});

