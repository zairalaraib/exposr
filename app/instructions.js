import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { BrandColors, Spacing, BorderRadius, Typography, Shadows, currentTheme } from "../constants/theme";

export default function InstructionsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const instructions = [
    {
      icon: "📸",
      title: "Take a Clear Photo",
      description: "Make sure your meal is well-lit and the entire plate is visible. Avoid shadows and blur.",
    },
    {
      icon: "🎯",
      title: "Center Your Meal",
      description: "Position your meal in the center of the frame for best results. Include all food items.",
    },
    {
      icon: "⏱️",
      title: "Wait for Analysis",
      description: "Our AI will analyze your meal in seconds. You'll see detailed nutrition information.",
    },
    {
      icon: "📊",
      title: "Review Results",
      description: "Check calories, macros, and get personalized health tips based on your meal.",
    },
  ];

  const tips = [
    "Use natural lighting when possible",
    "Avoid multiple plates in one photo",
    "Make sure food is in focus",
    "Include all sides and condiments",
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Instructions</Text>
          <Text style={styles.subtitle}>How to get the best results</Text>
        </View>

        {/* Instructions */}
        {instructions.map((instruction, index) => (
          <Card key={index} style={styles.instructionCard} elevated>
            <View style={styles.instructionHeader}>
              <Text style={styles.instructionIcon}>{instruction.icon}</Text>
              <Text style={styles.instructionTitle}>{instruction.title}</Text>
            </View>
            <Text style={styles.instructionDescription}>{instruction.description}</Text>
          </Card>
        ))}

        {/* Tips */}
        <Card style={styles.tipsCard} elevated>
          <Text style={styles.sectionTitle}>💡 Pro Tips</Text>
          {tips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </Card>

        {/* CTA */}
        <Button
          title="Start Analyzing"
          onPress={() => router.push("/")}
          variant="primary"
          size="large"
          fullWidth
          style={styles.ctaButton}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.h1,
    color: currentTheme.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body,
    color: currentTheme.textSecondary,
  },
  instructionCard: {
    marginBottom: Spacing.md,
  },
  instructionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    gap: Spacing.md,
  },
  instructionIcon: {
    fontSize: 32,
  },
  instructionTitle: {
    ...Typography.h4,
    color: currentTheme.text,
    flex: 1,
  },
  instructionDescription: {
    ...Typography.body,
    color: currentTheme.textSecondary,
    lineHeight: 24,
  },
  tipsCard: {
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h4,
    color: currentTheme.text,
    marginBottom: Spacing.md,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  tipBullet: {
    ...Typography.bodyBold,
    color: BrandColors.primary,
  },
  tipText: {
    ...Typography.body,
    color: currentTheme.text,
    flex: 1,
  },
  ctaButton: {
    marginTop: Spacing.md,
    ...Shadows.md,
  },
});

