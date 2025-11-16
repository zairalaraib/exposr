import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { BrandColors, Spacing, BorderRadius, Typography, Shadows, currentTheme } from "../constants/theme";

export default function HomeScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const insets = useSafeAreaInsets();

  const handleLogout = () => {
    logout();
    router.replace("/welcome");
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name || "User"}! 👋</Text>
          <Text style={styles.subtitle}>Ready to analyze your meal?</Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/settings")} style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Actions */}
        <Card style={styles.quickActionsCard} elevated>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push("/")}
            >
              <Text style={styles.actionIcon}>📸</Text>
              <Text style={styles.actionText}>Analyze Meal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push("/instructions")}
            >
              <Text style={styles.actionIcon}>📖</Text>
              <Text style={styles.actionText}>Instructions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push("/history")}
            >
              <Text style={styles.actionIcon}>📊</Text>
              <Text style={styles.actionText}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push("/settings")}
            >
              <Text style={styles.actionIcon}>⚙️</Text>
              <Text style={styles.actionText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* How It Works */}
        <Card style={styles.infoCard} elevated>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <View style={styles.stepsContainer}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>Take a photo of your meal</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>AI analyzes the food items</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>Get nutrition info & tips</Text>
            </View>
          </View>
        </Card>

        {/* Main CTA */}
        <Button
          title="Start Analyzing"
          onPress={() => router.push("/")}
          variant="primary"
          size="large"
          fullWidth
          style={styles.ctaButton}
        />

        {/* Logout */}
        <Button
          title="Sign Out"
          onPress={handleLogout}
          variant="ghost"
          size="medium"
          fullWidth
          style={styles.logoutButton}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: currentTheme.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: currentTheme.surface,
    borderBottomWidth: 1,
    borderBottomColor: currentTheme.border,
    ...Shadows.sm,
  },
  greeting: {
    ...Typography.h3,
    color: currentTheme.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body,
    color: currentTheme.textSecondary,
  },
  settingsButton: {
    padding: Spacing.sm,
  },
  settingsIcon: {
    fontSize: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  quickActionsCard: {
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h4,
    color: currentTheme.text,
    marginBottom: Spacing.md,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  actionCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: currentTheme.background,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: currentTheme.border,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  actionText: {
    ...Typography.captionBold,
    color: currentTheme.text,
    textAlign: 'center',
  },
  infoCard: {
    marginBottom: Spacing.md,
  },
  stepsContainer: {
    gap: Spacing.md,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    backgroundColor: BrandColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    ...Typography.captionBold,
    color: currentTheme.text,
  },
  stepText: {
    ...Typography.body,
    color: currentTheme.text,
    flex: 1,
  },
  ctaButton: {
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  logoutButton: {
    marginTop: Spacing.sm,
  },
});

