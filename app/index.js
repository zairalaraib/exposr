import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function CameraScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

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
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({ base64: true });

    navigation.navigate("result", { base64: photo.base64 });
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
        style={{
          position: "absolute",
          bottom: 40,
          alignSelf: "center",
          backgroundColor: "#111",
          paddingVertical: 14,
          paddingHorizontal: 32,
          borderRadius: 999,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>Analyze Meal</Text>
      </TouchableOpacity>
    </View>
  );
}
