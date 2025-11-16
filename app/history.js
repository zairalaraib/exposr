import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { BrandColors, Spacing, BorderRadius, Typography, Shadows, currentTheme } from "../constants/theme";

export default function HistoryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Demo history data
  const historyItems = [
    {
      id: "1",
      date: "Today",
      meal: "Grilled Chicken Salad",
      calories: "450",
      time: "12:30 PM",
    },
    {
      id: "2",
      date: "Yesterday",
      meal: "Pasta Carbonara",
      calories: "680",
      time: "7:15 PM",
    },
    {
      id: "3",
      date: "2 days ago",
      meal: "Avocado Toast",
      calories: "320",
      time: "9:00 AM",
    },
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
          <Text style={styles.title}>Meal History</Text>
          <Text style={styles.subtitle}>Your analyzed meals</Text>
        </View>

        {/* History Items */}
        {historyItems.length > 0 ? (
          historyItems.map((item) => (
            <Card key={item.id} style={styles.historyCard} elevated>
              <View style={styles.historyHeader}>
                <View style={styles.historyInfo}>
                  <Text style={styles.mealName}>{item.meal}</Text>
                  <Text style={styles.mealDate}>{item.date} • {item.time}</Text>
                </View>
                <View style={styles.caloriesBadge}>
                  <Text style={styles.caloriesText}>{item.calories}</Text>
                  <Text style={styles.caloriesLabel}>cal</Text>
                </View>
              </View>
            </Card>
          ))
        ) : (
          <Card style={styles.emptyCard} elevated>
            <Text style={styles.emptyIcon}>📊</Text>
            <Text style={styles.emptyTitle}>No History Yet</Text>
            <Text style={styles.emptyText}>
              Start analyzing meals to see your history here
            </Text>
            <Button
              title="Analyze Your First Meal"
              onPress={() => router.push("/")}
              variant="primary"
              size="medium"
              style={styles.emptyButton}
            />
          </Card>
        )}

        {/* CTA */}
        <Button
          title="Analyze New Meal"
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
  historyCard: {
    marginBottom: Spacing.md,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyInfo: {
    flex: 1,
  },
  mealName: {
    ...Typography.bodyBold,
    color: currentTheme.text,
    marginBottom: Spacing.xs,
  },
  mealDate: {
    ...Typography.caption,
    color: currentTheme.textTertiary,
  },
  caloriesBadge: {
    backgroundColor: BrandColors.primary + '10',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  caloriesText: {
    ...Typography.bodyBold,
    color: BrandColors.primary,
  },
  caloriesLabel: {
    ...Typography.small,
    color: BrandColors.primary,
  },
  emptyCard: {
    alignItems: 'center',
    padding: Spacing.xl,
    marginBottom: Spacing.md,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    ...Typography.h3,
    color: currentTheme.text,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    ...Typography.body,
    color: currentTheme.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  emptyButton: {
    marginTop: Spacing.sm,
  },
  ctaButton: {
    marginTop: Spacing.md,
    ...Shadows.md,
  },
});

