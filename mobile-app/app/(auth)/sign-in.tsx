import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { Link, router } from "expo-router";
import { images } from "@/constants";
import { api } from "@/lib/axiosConfig"; // Import API instance

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const response = await api.post('/api/auth/login', {
        email,
        password
      });

      if (response.data.success) {
        Alert.alert("Success", "Login successful!");
        router.push("/(tabs)/home"); // Change "/home" to your actual home screen route
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      const err = error as any; // Explicitly cast error to any
      if (err.response) {
        Alert.alert("Error", err.response.data.message || "Login failed");
      } else {
        Alert.alert("Error", "An unexpected error occurred");
      }
      console.error("SignIn Error:", err.response?.data);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Image */}
      <Image source={images.SignUp} style={styles.image} />

      {/* Title */}
      <Text style={styles.headerText}>Sign In to Your Account</Text>

      {/* Sign In Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>

        <View style={styles.signUpTextContainer}>
          <Text style={styles.signUpText}>Don't have an account?</Text>
          <Link href="/sign-up" style={styles.signUpLink}>
            {" "}
            Sign Up
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 250,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  form: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#F3F4F6",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  signUpTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  signUpText: {
    fontSize: 14,
    color: "#666",
  },
  signUpLink: {
    fontSize: 14,
    color: "#28a745",
    fontWeight: "600",
  },
});

export default SignIn;
