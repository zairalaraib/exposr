import { StyleSheet, Text, TextInput, View, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { BrandColors, Spacing, BorderRadius, Typography, Shadows, currentTheme } from "../constants/theme";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const insets = useSafeAreaInsets();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    const success = await login(email, password);
    if (success) {
      router.replace("/home");
    } else {
      Alert.alert("Error", "Login failed. Please try again.");
    }
  };

  const handleDemoLogin = async () => {
    setEmail("demo@exposr.com");
    setPassword("demo123");
    // Small delay to show the fields being filled
    setTimeout(() => {
      handleLogin();
    }, 300);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>🍽️</Text>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        {/* Login Form */}
        <Card style={styles.formCard} elevated>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={currentTheme.textTertiary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={currentTheme.textTertiary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <Button
            title={isLoading ? "Signing in..." : "Sign In"}
            onPress={handleLogin}
            variant="primary"
            size="large"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            style={styles.loginButton}
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <Button
            title="Try Demo Login"
            onPress={handleDemoLogin}
            variant="secondary"
            size="large"
            fullWidth
            disabled={isLoading}
            style={styles.demoButton}
          />
        </Card>

        {/* Footer */}
        <Text style={styles.footerText}>
          Demo mode: Any email/password will work
        </Text>
      </View>
    </KeyboardAvoidingView>
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
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logo: {
    fontSize: 64,
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.h2,
    color: currentTheme.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body,
    color: currentTheme.textSecondary,
  },
  formCard: {
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  label: {
    ...Typography.captionBold,
    color: currentTheme.text,
    marginBottom: Spacing.sm,
  },
  input: {
    ...Typography.body,
    backgroundColor: currentTheme.backgroundSecondary,
    borderWidth: 1,
    borderColor: currentTheme.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    color: currentTheme.text,
  },
  loginButton: {
    marginTop: Spacing.md,
    ...Shadows.sm,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: currentTheme.border,
  },
  dividerText: {
    ...Typography.caption,
    color: currentTheme.textTertiary,
    marginHorizontal: Spacing.md,
  },
  demoButton: {
    ...Shadows.sm,
  },
  footerText: {
    ...Typography.caption,
    color: currentTheme.textTertiary,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});

