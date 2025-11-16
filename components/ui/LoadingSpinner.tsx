import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { BrandColors, Spacing, Typography, currentTheme } from '../../constants/theme';

interface LoadingSpinnerProps {
  message?: string;
  submessage?: string;
  size?: 'small' | 'large';
}

export function LoadingSpinner({ message, submessage, size = 'large' }: LoadingSpinnerProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={BrandColors.primaryLight} />
      {message && <Text style={styles.message}>{message}</Text>}
      {submessage && <Text style={styles.submessage}>{submessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  message: {
    ...Typography.bodyBold,
    marginTop: Spacing.md,
    color: currentTheme.text,
  },
  submessage: {
    ...Typography.caption,
    marginTop: Spacing.sm,
    color: currentTheme.textSecondary,
  },
});

