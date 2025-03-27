import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Weather from "@/components/Weather";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Weather />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0, // Remove side margins for full width
    paddingTop: 0, // Ensure full-screen coverage
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10, // Better spacing around the header
    textAlign: "center",
  },
});
