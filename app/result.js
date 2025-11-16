import { getCapturedPhoto } from "./index";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import OpenAI from "openai";

export default function ResultScreen() {
  const [photo, setPhoto] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const captured = getCapturedPhoto();
    setPhoto(captured);
    
    if (captured && captured.base64) {
      analyzeMeal(captured.base64);
    } else if (captured) {
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
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: photo.uri }} 
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}

        {/* Loading State */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0a7ea4" />
            <Text style={styles.loadingText}>Analyzing your meal...</Text>
            <Text style={styles.loadingSubtext}>This may take a few seconds</Text>
          </View>
        )}

        {/* Error State */}
        {error && !loading && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorTitle}>Oops!</Text>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={() => photo?.base64 && analyzeMeal(photo.base64)}
            >
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Analysis Results */}
        {analysis && !loading && (
          <View style={styles.analysisContainer}>
            <View style={styles.analysisHeader}>
              <Text style={styles.analysisTitle}>📊 Analysis Results</Text>
            </View>
            <View style={styles.analysisContent}>
              <Text style={styles.analysisText}>{analysis}</Text>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.retakeButton}
            onPress={handleRetake}
          >
            <Text style={styles.retakeButtonText}>📷 Retake Photo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  imageContainer: {
    margin: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 300,
  },
  loadingContainer: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },
  loadingSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
  },
  errorContainer: {
    margin: 16,
    padding: 24,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ffebee",
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#d32f2f",
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: "#0a7ea4",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  analysisContainer: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  analysisHeader: {
    backgroundColor: "#0a7ea4",
    padding: 16,
  },
  analysisTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  analysisContent: {
    padding: 20,
  },
  analysisText: {
    fontSize: 15,
    color: "#333",
    lineHeight: 24,
  },
  actionsContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  retakeButton: {
    backgroundColor: "#111",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  retakeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
