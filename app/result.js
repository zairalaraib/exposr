import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePhoto } from "../contexts/PhotoContext";
import OpenAI from "openai";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { BrandColors, Spacing, BorderRadius, Typography, Shadows, SemanticColors, currentTheme } from "../constants/theme";

export default function ResultScreen() {
  const { photo } = usePhoto();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (photo && photo.base64) {
      analyzeMeal(photo.base64);
    } else if (photo) {
      setError("Photo captured but base64 data is missing");
    } else {
      setError("No photo data found");
    }
  }, []);

  async function analyzeMeal(base64Image) {
    const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
    
    if (!apiKey || apiKey === "your_openai_api_key_here") {
      setError("OpenAI API key not configured. Please add EXPO_PUBLIC_OPENAI_API_KEY to your .env file");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true, // Required for React Native/Expo
      });

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this meal image and provide:\n1. A list of all food items visible\n2. Estimated calories\n3. Nutritional information (macros: protein, carbs, fats)\n4. Health tips or recommendations\n\nBe concise and helpful.",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        max_tokens: 500,
      });

      const content = response.choices[0]?.message?.content;
      if (content) {
        setAnalysis(content);
      } else {
        setError("No analysis received from API");
      }
    } catch (err) {
      console.error("OpenAI API Error:", err);
      setError(err.message || "Failed to analyze meal. Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleRetake() {
    router.back();
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Meal Analysis</Text>
          <Text style={styles.subtitle}>Your food breakdown</Text>
        </View>

        {/* Photo Display */}
        {photo && photo.uri && (
          <Card style={styles.imageCard} elevated>
            <Image 
              source={{ uri: photo.uri }} 
              style={styles.image}
              resizeMode="cover"
            />
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <Card style={styles.loadingCard} elevated>
            <LoadingSpinner 
              message="Analyzing your meal..."
              submessage="This may take a few seconds"
            />
          </Card>
        )}

        {/* Error State */}
        {error && !loading && (
          <Card style={styles.errorCard} elevated>
            <View style={styles.errorContent}>
              <Text style={styles.errorIcon}>⚠️</Text>
              <Text style={styles.errorTitle}>Oops!</Text>
              <Text style={styles.errorText}>{error}</Text>
              {photo?.base64 && (
                <Button
                  title="Try Again"
                  onPress={() => analyzeMeal(photo.base64)}
                  variant="primary"
                  size="medium"
                  style={styles.retryButton}
                />
              )}
            </View>
          </Card>
        )}

        {/* Analysis Results */}
        {analysis && !loading && (
          <Card style={styles.analysisCard} elevated>
            <View style={styles.analysisHeader}>
              <Text style={styles.analysisIcon}>📊</Text>
              <Text style={styles.analysisTitle}>Analysis Results</Text>
            </View>
            <View style={styles.analysisContent}>
              <Text style={styles.analysisText}>{analysis}</Text>
            </View>
          </Card>
        )}

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Button
            title="📷 Retake Photo"
            onPress={handleRetake}
            variant="outline"
            size="large"
            fullWidth
            style={styles.retakeButton}
          />
        </View>
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
    paddingBottom: Spacing.xl,
  },
  header: {
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
    backgroundColor: currentTheme.surface,
    borderBottomWidth: 1,
    borderBottomColor: currentTheme.border,
    ...Shadows.sm,
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
  imageCard: {
    margin: Spacing.md,
    overflow: 'hidden',
  },
  image: {
    width: "100%",
    height: 320,
    borderRadius: BorderRadius.lg,
  },
  loadingCard: {
    margin: Spacing.md,
  },
  errorCard: {
    margin: Spacing.md,
    borderWidth: 1,
    borderColor: SemanticColors.error + '20',
  },
  errorContent: {
    alignItems: 'center',
    padding: Spacing.sm,
  },
  errorIcon: {
    fontSize: 56,
    marginBottom: Spacing.md,
  },
  errorTitle: {
    ...Typography.h4,
    color: SemanticColors.error,
    marginBottom: Spacing.sm,
  },
  errorText: {
    ...Typography.body,
    color: currentTheme.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    lineHeight: 24,
  },
  retryButton: {
    marginTop: Spacing.sm,
  },
  analysisCard: {
    margin: Spacing.md,
  },
  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BrandColors.primary,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  analysisIcon: {
    fontSize: 24,
  },
  analysisTitle: {
    ...Typography.h4,
    color: '#FFFFFF',
    flex: 1,
  },
  analysisContent: {
    padding: Spacing.lg,
  },
  analysisText: {
    ...Typography.body,
    color: currentTheme.text,
    lineHeight: 26,
  },
  actionsContainer: {
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.md,
  },
});
