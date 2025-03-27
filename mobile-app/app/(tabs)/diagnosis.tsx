import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function Diagnosis() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>AgroTech</Text>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeContainer}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
          }}
          style={styles.welcomeImage}
        />
        <View style={styles.welcomeOverlay}>
          <Text style={styles.welcomeText}>Welcome, User!</Text>
        </View>
      </View>

      {/* Feature Cards */}
      <View style={styles.cardContainer}>
        {/* Crop Diagnosis Card */}
        <Link href="/(AIDiagnosis)/plant" asChild>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Crop Diagnosis</Text>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=300&q=80",
              }}
              style={styles.cardImage}
            />
          </TouchableOpacity>
        </Link>

        {/* Cattle Diagnosis Card */}
        <Link href="/(AIDiagnosis)/cattle" asChild>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Cattle Diagnosis</Text>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&w=300&q=80",
              }}
              style={styles.cardImage}
            />
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#22C55E", // Green-500
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  welcomeContainer: {
    position: "relative",
  },
  welcomeImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  welcomeOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  cardContainer: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: "#E8F3E8",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    resizeMode: "cover",
  },
});
