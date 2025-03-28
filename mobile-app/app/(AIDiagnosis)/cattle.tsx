import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

// Import Google API key from environment
const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

export default function CattlePage() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to pick an image
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Needed",
        "We need access to your photos to analyze cattle health."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setBase64Image(result.assets[0].base64 || null);
      setAnalysisResult(null);
      setError(null);
    }
  };

  // Function to analyze the image
  const analyzeImage = async () => {
    if (!base64Image) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GOOGLE_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: "Analyze this cattle image for diseases and provide a diagnosis.",
                  },
                  {
                    inline_data: { mime_type: "image/jpeg", data: base64Image },
                  },
                ],
              },
            ],
          }),
        }
      );

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error.message);
      }

      setAnalysisResult(result);
    } catch (err: any) {
      setError(err.message || "An error occurred while analyzing the image.");
      Alert.alert("Analysis Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Extract and Format Data
  const diagnosisText =
    analysisResult?.candidates?.[0]?.content?.parts?.[0]?.text || "N/A";

  // Format the diagnosis in bold & pointwise
  const formattedDiagnosis: string[] = diagnosisText
    .replace(/\*\*(.*?)\*\*/g, "🔹 **$1**") // Add bullet points to bold text
    .split("\n")
    .filter((line: string) => line.trim() !== ""); // Remove empty lines

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>🐄 Cattle Health Analysis</Text>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={pickImage}
          style={[styles.button, styles.selectButton]}
        >
          <Text style={styles.buttonText}>📷 Select Image</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={analyzeImage}
          style={[styles.button, styles.analyzeButton]}
          disabled={!imageUri || loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "🔍 Analyzing..." : "🧪 Analyze Image"}
          </Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <ActivityIndicator size="large" color="#2196F3" style={styles.loader} />
      )}

      {error && <Text style={styles.errorText}>❌ {error}</Text>}

      {analysisResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>📋 Analysis Result:</Text>
          <Text style={styles.diagnosisText}>
            {formattedDiagnosis.map((line, index) => (
              <Text key={index}>
                {line}
                {"\n"}
              </Text>
            ))}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: "center",
  },
  selectButton: {
    backgroundColor: "#4CAF50",
  },
  analyzeButton: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  resultContainer: {
    width: "100%",
    marginTop: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  diagnosisText: {
    fontSize: 16,
    color: "#444",
    textAlign: "left",
    lineHeight: 22,
  },
});
