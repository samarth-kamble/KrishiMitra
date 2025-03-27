import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";
import { images } from "@/constants";
import axios from "axios";
import { Alert } from "react-native";
import { router } from "expo-router";
import { api } from "@/lib/axiosConfig";



const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await api.post('/api/auth/register', { 
        name, 
        email, 
        password 
      });
      
      if (response.data.success) {
        router.push("/sign-in");
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message;
        Alert.alert("Error", errorMessage);
        console.error("Signup Error:", error.response?.data);
      } else {
        Alert.alert("Error", "An unexpected error occurred");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Image */}
      <Image source={images.SignUp} style={styles.image} />

      {/* Title Outside the Image */}
      <Text style={styles.headerText}>Create Your Account</Text>

      {/* Sign Up Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />

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

        <Pressable style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>

        <View style={styles.signInTextContainer}>
          <Text style={styles.signInText}>Already have an account?</Text>
          <Link href="/sign-in" style={styles.signInLink}>
            {" "}
            Sign In
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
    marginTop: 10, // ✅ Just a little space below image
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
  signInTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  signInText: {
    fontSize: 14,
    color: "#666",
  },
  signInLink: {
    fontSize: 14,
    color: "#28a745",
    fontWeight: "600",
  },
});

export default SignUp;
