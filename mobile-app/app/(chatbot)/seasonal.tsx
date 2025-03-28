import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

// Define types for better type safety
interface ChatMessage {
  user: string;
  bot: string;
  timestamp: number;
}

interface SeasonalAdviceResponse {
  advice: string;
  confidence?: number;
}

export default function SeasonalFarmingScreen() {
  // State management with more explicit typing
  const [location, setLocation] = useState<string>("INDIA");
  const [hemisphere, setHemisphere] = useState<"Northern" | "Southern">(
    "Northern"
  );
  const [cropType, setCropType] = useState<string>("Wheat");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Improved advice formatting function
  const formatAdvice = useCallback((advice: string): string => {
    if (!advice) return "No advice available.";

    // Split advice into paragraphs and format each
    return advice
      .split("\n\n")
      .map((paragraph) => {
        // Split paragraph into lines
        const lines = paragraph
          .split("\n")
          .filter((line) => line.trim() !== "");

        // First line as header, rest as bullet points
        return lines
          .map((line, index) =>
            index === 0 ? `**${line.trim()}**` : `• ${line.trim()}`
          )
          .join("\n");
      })
      .join("\n\n");
  }, []);

  // Enhanced error handling in fetch
  const handleGetAdvice = async () => {
    // Input validation
    if (!location.trim()) {
      Alert.alert("Invalid Input", "Please enter a location.");
      return;
    }

    if (!cropType.trim()) {
      Alert.alert("Invalid Input", "Please specify a crop type.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://farmer-chatbot-1.onrender.com/seasonal_advice",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            location: location.trim(),
            crop_type: cropType.trim(),
            hemisphere,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: SeasonalAdviceResponse = await response.json();

      const formattedAdvice = formatAdvice(
        data.advice || "No specific advice available for your query."
      );

      const newMessage: ChatMessage = {
        user: `Advice for ${cropType} in ${location}`,
        bot: formattedAdvice,
        timestamp: Date.now(),
      };

      setChatHistory((prevHistory) => [...prevHistory, newMessage]);
    } catch (error) {
      console.error("Error fetching advice:", error);
      Alert.alert(
        "Error",
        "Could not fetch farming advice. Please check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  };

  // Clear chat history function
  const clearChatHistory = () => {
    setChatHistory([]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Input Card */}
        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="Enter your location"
              placeholderTextColor="#6B7280"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Hemisphere</Text>
            <View style={styles.radioGroup}>
              {(["Northern", "Southern"] as const).map((hemi) => (
                <TouchableOpacity
                  key={hemi}
                  style={styles.radioOption}
                  onPress={() => setHemisphere(hemi)}
                >
                  <View style={styles.radioCircle}>
                    {hemisphere === hemi && <View style={styles.radioFill} />}
                  </View>
                  <Text style={styles.radioText}>{hemi}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Crop Type</Text>
            <TextInput
              style={styles.input}
              value={cropType}
              onChangeText={setCropType}
              placeholder="Enter crop type"
              placeholderTextColor="#6B7280"
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleGetAdvice}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Fetching Advice..." : "Get Seasonal Advice"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Chat History Card */}
        <View style={styles.chatContainer}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatHeaderText}>Advice History</Text>
            {chatHistory.length > 0 && (
              <TouchableOpacity onPress={clearChatHistory}>
                <Text style={styles.clearButton}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>

          {loading && <ActivityIndicator size="small" color="#22C55E" />}

          <ScrollView style={styles.chatHistory} nestedScrollEnabled={true}>
            {chatHistory.map((msg, index) => (
              <View key={index} style={styles.chatMessage}>
                <Text style={styles.userMessage}>{msg.user}</Text>
                <Text style={styles.botMessage}>{msg.bot}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  radioGroup: {
    flexDirection: "row",
    marginTop: 8,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  radioFill: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#22C55E",
  },
  radioText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#22C55E",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    opacity: 1,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  chatContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  chatHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  clearButton: {
    color: "#22C55E",
    fontWeight: "600",
  },
  chatHistory: {
    maxHeight: 400,
    minHeight: 200,
  },
  chatMessage: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f9fafb",
    borderLeftWidth: 4,
    borderLeftColor: "#22C55E",
    borderRadius: 6,
  },
  userMessage: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  botMessage: {
    fontSize: 15,
    color: "#000",
    lineHeight: 22,
  },
});
