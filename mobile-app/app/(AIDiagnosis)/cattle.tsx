import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { analyzeCattleImage } from "../(api)/cattle+api";

export default function CattlePage() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setAnalysisResult(null);
      setError(null);
    }
  };

  const analyzeImage = async () => {
    if (!imageUri) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await analyzeCattleImage(imageUri, "image/jpeg");
      setAnalysisResult(result);
    } catch (err: any) {
      setError(err.message || "An error occurred while analyzing the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, alignItems: "center", padding: 20 }}
    >
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Cattle Health Analysis
      </Text>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{
            width: 200,
            height: 200,
            borderRadius: 10,
            marginBottom: 10,
          }}
        />
      )}

      <TouchableOpacity
        onPress={pickImage}
        style={{
          backgroundColor: "#4CAF50",
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Select Image</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={analyzeImage}
        style={{
          backgroundColor: "#2196F3",
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Analyze Image</Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator
          size="large"
          color="#2196F3"
          style={{ marginTop: 10 }}
        />
      )}

      {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}

      {analysisResult && (
        <View
          style={{
            marginTop: 20,
            padding: 10,
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 5,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Analysis Result:
          </Text>
          <Text style={{ marginTop: 5 }}>
            Diseases: {JSON.stringify(analysisResult.cattle_diseases, null, 2)}
          </Text>
          <Text style={{ marginTop: 5 }}>
            Remedies: {JSON.stringify(analysisResult.remedies, null, 2)}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
