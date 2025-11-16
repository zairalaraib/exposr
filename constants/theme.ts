/**
 * Modern Design System for Exposr
 * A comprehensive design system with colors, typography, spacing, and shadows
 */

import { Platform } from 'react-native';

// Primary Brand Colors
export const BrandColors = {
  primary: '#6366F1', // Indigo
  primaryDark: '#4F46E5',
  primaryLight: '#818CF8',
  secondary: '#10B981', // Emerald
  accent: '#F59E0B', // Amber
};

// Neutral Colors
export const NeutralColors = {
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
};

// Semantic Colors
export const SemanticColors = {
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
};

// Theme Colors - Default to Dark Theme
export const Colors = {
  light: {
    text: NeutralColors.gray900,
    textSecondary: NeutralColors.gray600,
    textTertiary: NeutralColors.gray500,
    background: NeutralColors.white,
    backgroundSecondary: NeutralColors.gray50,
    surface: NeutralColors.white,
    surfaceElevated: NeutralColors.white,
    border: NeutralColors.gray200,
    tint: BrandColors.primary,
    icon: NeutralColors.gray600,
    tabIconDefault: NeutralColors.gray400,
    tabIconSelected: BrandColors.primary,
    success: SemanticColors.success,
    error: SemanticColors.error,
    warning: SemanticColors.warning,
    info: SemanticColors.info,
  },
  dark: {
    text: NeutralColors.gray50,
    textSecondary: NeutralColors.gray300,
    textTertiary: NeutralColors.gray400,
    background: '#0A0A0A', // Pure black background
    backgroundSecondary: '#111111', // Slightly lighter black
    surface: '#1A1A1A', // Dark gray surface
    surfaceElevated: '#252525', // Elevated dark surface
    border: NeutralColors.gray700,
    tint: BrandColors.primaryLight,
    icon: NeutralColors.gray400,
    tabIconDefault: NeutralColors.gray500,
    tabIconSelected: BrandColors.primaryLight,
    success: SemanticColors.success,
    error: SemanticColors.error,
    warning: SemanticColors.warning,
    info: SemanticColors.info,
  },
};

// Use dark theme as default
export const currentTheme = Colors.dark;

// Spacing Scale
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Border Radius
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

// Typography
export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  captionBold: {
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
};

// Shadows
export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
};

// Fonts
export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
