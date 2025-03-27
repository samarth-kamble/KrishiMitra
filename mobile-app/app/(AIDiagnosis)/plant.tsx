import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { predictPlantDisease } from "../(api)/predict";

export default function PlantDiagnosis() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Handle Image Upload
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setPrediction(null); // Reset previous prediction
    }
  };

  // Handle Prediction
  const handlePredict = async () => {
    if (!imageUri) return;

    setLoading(true);
    setPrediction(null);

    try {
      const result = await predictPlantDisease(imageUri);
      setPrediction(result);
    } catch (error) {
      console.error("Prediction failed:", error);
      setPrediction({ error: "Failed to get prediction" });
    }

    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌱 Plant Disease Diagnosis</Text>

      {/* Upload Section */}
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.uploadText}>📤 Upload Image</Text>
      </TouchableOpacity>

      {/* Show Image Preview */}
      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
      )}

      {/* Predict Button */}
      <TouchableOpacity
        style={[styles.predictButton, !imageUri && styles.disabledButton]}
        onPress={handlePredict}
        disabled={!imageUri || loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.predictText}>🔍 Get Prediction</Text>
        )}
      </TouchableOpacity>

      {/* Prediction Result */}
      {prediction && (
        <View style={styles.resultContainer}>
          {prediction.error ? (
            <Text style={styles.errorText}>❌ {prediction.error}</Text>
          ) : (
            <>
              <Text style={styles.resultTitle}>Prediction Result:</Text>
              <Text style={styles.resultText}>
                🩺 Disease: {prediction.disease || "Unknown"}
              </Text>
              <Text style={styles.resultText}>
                💊 Remedy: {prediction.remedy || "No remedy found"}
              </Text>
            </>
          )}
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
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#22C55E",
  },
  uploadButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  uploadText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "cover",
  },
  predictButton: {
    backgroundColor: "#FF9800",
    padding: 12,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "gray",
  },
  predictText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 4,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
});
