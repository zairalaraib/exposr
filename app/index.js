import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useRef, useState, useEffect } from "react";
import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePhoto } from "../contexts/PhotoContext";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/Button";
import { BrandColors, Spacing, BorderRadius, Typography, Shadows, currentTheme } from "../constants/theme";

export default function CameraScreen() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const { setPhoto } = usePhoto();
  const [isProcessing, setIsProcessing] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!isAuthenticated) {
      // Use setTimeout to ensure router is ready
      const timer = setTimeout(() => {
        router.replace("/welcome");
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, router]);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, styles.permissionContainer]}>
        <View style={styles.permissionContent}>
          <Text style={styles.permissionIcon}>📷</Text>
          <Text style={styles.permissionTitle}>Camera Access Needed</Text>
          <Text style={styles.permissionText}>
            We need access to your camera to analyze your meals. Please enable camera permissions to continue.
          </Text>
          <Button
            title="Enable Camera"
            onPress={requestPermission}
            variant="primary"
            size="large"
            fullWidth
            style={styles.permissionButton}
          />
        </View>
      </View>
    );
  }

  async function takePhoto() {
    if (isProcessing) return;
    
    try {
      setIsProcessing(true);
      
      if (!cameraRef.current) {
        Alert.alert("Error", "Camera is not ready");
        setIsProcessing(false);
        return;
      }

      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      
      if (!photo) {
        Alert.alert("Error", "Failed to capture photo");
        setIsProcessing(false);
        return;
      }
      
      setPhoto({
        uri: photo.uri,
        base64: photo.base64,
        width: photo.width,
        height: photo.height,
      });
      
      router.push("/result");
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", `Failed to take photo: ${error.message}`);
      setIsProcessing(false);
    }
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
        enableHighQualityPhotos={true}
      />

      {/* Overlay gradient */}
      <View style={styles.overlay} pointerEvents="none">
        <View style={styles.topGradient} />
        <View style={styles.bottomGradient} />
      </View>

      {/* Header */}
      <View style={[styles.headerContainer, { top: insets.top + Spacing.md }]}>
        <TouchableOpacity
          onPress={() => router.push("/home")}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.instructionsText}>Position your meal in the frame</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Capture Button */}
      <View style={[styles.buttonContainer, { bottom: insets.bottom + Spacing.lg }]}>
        <Button
          title={isProcessing ? "Processing..." : "Analyze Meal"}
          onPress={takePhoto}
          variant="primary"
          size="large"
          disabled={isProcessing}
          loading={isProcessing}
          fullWidth
          style={styles.captureButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NeutralColors.black,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  topGradient: {
    height: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  bottomGradient: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  headerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
  },
  backButton: {
    padding: Spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: BorderRadius.full,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    ...Typography.h4,
    color: '#FFFFFF',
  },
  instructionsText: {
    ...Typography.body,
    color: '#FFFFFF',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    flex: 1,
    marginHorizontal: Spacing.sm,
  },
  placeholder: {
    width: 40,
  },
  permissionContainer: {
    backgroundColor: currentTheme.surface,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  permissionContent: {
    alignItems: 'center',
    maxWidth: 400,
  },
  permissionIcon: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },
  permissionTitle: {
    ...Typography.h2,
    color: currentTheme.text,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  permissionText: {
    ...Typography.body,
    color: currentTheme.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 24,
  },
  permissionButton: {
    marginTop: Spacing.md,
  },
  buttonContainer: {
    position: 'absolute',
    left: Spacing.lg,
    right: Spacing.lg,
  },
  captureButton: {
    ...Shadows.lg,
  },
});
