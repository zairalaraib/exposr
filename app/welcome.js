import { Image, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../components/ui/Button";
import { BrandColors, Spacing, BorderRadius, Typography, Shadows, currentTheme } from "../constants/theme";

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.content}>
        {/* Logo/Icon */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🍽️</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Welcome to Exposr</Text>
        <Text style={styles.subtitle}>Your AI-powered meal analyzer</Text>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📸</Text>
            <Text style={styles.featureText}>Snap a photo of your meal</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🤖</Text>
            <Text style={styles.featureText}>Get instant AI analysis</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📊</Text>
            <Text style={styles.featureText}>Track calories & nutrition</Text>
          </View>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <Button
          title="Get Started"
          onPress={() => router.push("/login")}
          variant="primary"
          size="large"
          fullWidth
          style={styles.primaryButton}
        />
        <Button
          title="Learn More"
          onPress={() => router.push("/instructions")}
          variant="outline"
          size="large"
          fullWidth
          style={styles.secondaryButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: currentTheme.background,
    paddingHorizontal: Spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: BorderRadius.xl,
    backgroundColor: BrandColors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    ...Shadows.md,
  },
  logo: {
    fontSize: 64,
  },
  title: {
    ...Typography.h1,
    color: currentTheme.text,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.body,
    color: currentTheme.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
  },
  featuresContainer: {
    width: '100%',
    gap: Spacing.lg,
    marginTop: Spacing.xxl,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: currentTheme.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: currentTheme.border,
  },
  featureIcon: {
    fontSize: 32,
  },
  featureText: {
    ...Typography.body,
    color: currentTheme.text,
    flex: 1,
  },
  actionsContainer: {
    width: '100%',
    gap: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  primaryButton: {
    ...Shadows.md,
  },
  secondaryButton: {
    marginTop: Spacing.sm,
  },
});

