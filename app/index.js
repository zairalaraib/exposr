import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

// Simple in-memory storage for the photo
let capturedPhoto = null;

export function getCapturedPhoto() {
  return capturedPhoto;
}

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!permission) return <View style={{ flex: 1, backgroundColor: "#fff" }} />;

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          onPress={requestPermission}
          style={{ padding: 16, borderRadius: 8, backgroundColor: "#111" }}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>Enable Camera</Text>
        </TouchableOpacity>
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

      console.log("Taking photo...");
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      
      if (!photo) {
        Alert.alert("Error", "Failed to capture photo");
        setIsProcessing(false);
        return;
      }

      console.log("Photo captured successfully");
      console.log("Photo URI:", photo.uri);
      console.log("Has base64:", !!photo.base64);
      
      // Store photo in memory (better than URL params for large data)
      capturedPhoto = photo;
      
      console.log("Navigating to result screen...");
      // Navigate without params - we'll retrieve from memory
      router.push("/result");
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", `Failed to take photo: ${error.message}`);
      setIsProcessing(false);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="back"
        enableHighQualityPhotos={true}
      />

      <TouchableOpacity
        onPress={takePhoto}
        disabled={isProcessing}
        style={{
          position: "absolute",
          bottom: 40,
          alignSelf: "center",
          backgroundColor: isProcessing ? "#666" : "#111",
          paddingVertical: 14,
          paddingHorizontal: 32,
          borderRadius: 999,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>
          {isProcessing ? "Processing..." : "Analyze Meal"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
