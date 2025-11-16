import { StyleSheet, Text, View, ScrollView, Switch, TouchableOpacity, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { BrandColors, Spacing, BorderRadius, Typography, Shadows, currentTheme } from "../constants/theme";

export default function SettingsScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const insets = useSafeAreaInsets();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: () => {
            logout();
            router.replace("/welcome");
          },
        },
      ]
    );
  };

  const settingsSections = [
    {
      title: "Account",
      items: [
        {
          label: "Email",
          value: user?.email || "Not set",
          type: "text",
        },
        {
          label: "Name",
          value: user?.name || "Not set",
          type: "text",
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          label: "Notifications",
          value: notificationsEnabled,
          type: "switch",
          onToggle: setNotificationsEnabled,
        },
        {
          label: "Dark Mode",
          value: darkModeEnabled,
          type: "switch",
          onToggle: setDarkModeEnabled,
        },
      ],
    },
    {
      title: "About",
      items: [
        {
          label: "Version",
          value: "1.0.0",
          type: "text",
        },
        {
          label: "Help & Support",
          value: null,
          type: "button",
          onPress: () => router.push("/instructions"),
        },
      ],
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
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Settings</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <Card key={sectionIndex} style={styles.sectionCard} elevated>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <View
                key={itemIndex}
                style={[
                  styles.settingItem,
                  itemIndex < section.items.length - 1 && styles.settingItemBorder,
                ]}
              >
                <Text style={styles.settingLabel}>{item.label}</Text>
                {item.type === "text" && (
                  <Text style={styles.settingValue}>{item.value}</Text>
                )}
                {item.type === "switch" && (
                  <Switch
                    value={item.value}
                    onValueChange={item.onToggle}
                    trackColor={{ false: currentTheme.border, true: BrandColors.primary }}
                    thumbColor={currentTheme.surface}
                  />
                )}
                {item.type === "button" && (
                  <TouchableOpacity onPress={item.onPress}>
                    <Text style={styles.settingButton}>→</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </Card>
        ))}

        {/* Logout Button */}
        <Button
          title="Sign Out"
          onPress={handleLogout}
          variant="outline"
          size="large"
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.sm,
  },
  backButton: {
    padding: Spacing.sm,
  },
  backIcon: {
    ...Typography.h3,
    color: currentTheme.text,
  },
  title: {
    ...Typography.h2,
    color: currentTheme.text,
  },
  placeholder: {
    width: 40,
  },
  sectionCard: {
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h4,
    color: currentTheme.text,
    marginBottom: Spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: currentTheme.border,
  },
  settingLabel: {
    ...Typography.body,
    color: currentTheme.text,
    flex: 1,
  },
  settingValue: {
    ...Typography.body,
    color: currentTheme.textTertiary,
  },
  settingButton: {
    ...Typography.h4,
    color: BrandColors.primary,
  },
  logoutButton: {
    marginTop: Spacing.md,
  },
});

