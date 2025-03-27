import { View, Text } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";

const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="/dashboard" options={{ headerShown: false }} />
      <Tabs.Screen name="/diagnosis" options={{ headerShown: false }} />
      <Tabs.Screen name="/community" options={{ headerShown: false }} />
      <Tabs.Screen name="/assistme" options={{ headerShown: false }} />
      <Tabs.Screen name="/profile" options={{ headerShown: false }} />
    </Tabs>
  );
};

export default Layout;
