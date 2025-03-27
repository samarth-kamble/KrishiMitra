import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Cloud, Wind, Droplets, Sun, Moon, Eye, Thermometer } from "lucide-react-native";

export default function Weather() {
  return (
    <View className="flex-1 bg-[#4A6741] p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mb-4">
          <Text className="text-xl font-semibold text-white">AgroTech</Text>
          <Text className="text-sm opacity-90 text-white">
            S Block 17, Bodhanga, Cuttack-08
          </Text>
        </View>

        {/* Current Weather */}
        <Text className="text-2xl font-bold text-white mb-4">Current Weather</Text>
        <View className="bg-[#E8F3E8] rounded-3xl p-6 mb-4">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-sm text-gray-600">Now</Text>
              <Text className="text-6xl font-bold">26°</Text>
            </View>
            <View className="items-end">
              <View className="flex-row items-center gap-2">
                <Cloud size={32} color="#4A4A4A" />
                <Text className="text-xl">Cloudy</Text>
              </View>
              <Text className="text-gray-600">Feels like 31°</Text>
            </View>
          </View>
          <View className="flex-row gap-2 text-sm">
            <Text>High: 28°</Text>
            <Text>Low: 24°</Text>
          </View>
        </View>

        {/* Navigation Tabs */}
        <View className="flex-row gap-2 mb-4">
          {["Today", "Tomorrow", "10 Days"].map((tab) => (
            <TouchableOpacity
              key={tab}
              className={`px-4 py-2 rounded-full text-sm ${
                tab === "Today" ? "bg-[#E8F3E8] text-gray-800" : "bg-[#5A7751] text-white/90"
              }`}
            >
              <Text>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Weather Details Grid */}
        <View className="flex-wrap flex-row justify-between">
          {[
            { label: "Wind speed", value: "12 km/hr", icon: <Wind size={24} color="#4A4A4A" /> },
            { label: "Precipitation", value: "86%", icon: <Cloud size={24} color="#4A4A4A" /> },
            { label: "Sunrise/Sunset", value: "6:03/17:34", icon: <Sun size={24} color="#4A4A4A" /> },
            { label: "Humidity", value: "60%", icon: <Droplets size={24} color="#4A4A4A" /> },
            { label: "UV Index", value: "6", icon: <Sun size={24} color="#4A4A4A" /> },
            { label: "Moon Phase", value: "Waning Gibbous", icon: <Moon size={24} color="#4A4A4A" /> },
            { label: "Dew Point", value: "27°", icon: <Thermometer size={24} color="#4A4A4A" /> },
            { label: "Visibility", value: "6.4 km", icon: <Eye size={24} color="#4A4A4A" /> },
          ].map((item, index) => (
            <View key={index} className="bg-[#E8F3E8] rounded-2xl p-4 w-[48%] mb-3">
              <View className="mb-2">{item.icon}</View>
              <Text className="text-sm text-gray-600">{item.label}</Text>
              <Text className="text-lg font-semibold">{item.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-[#4A6741] border-t border-[#5A7751] p-4">
        <View className="flex-row justify-around">
          {["Home", "Weather", "Soil Health", "Crop Advisory"].map((item) => (
            <TouchableOpacity key={item}>
              <Text className={`text-sm ${item === "Weather" ? "text-white" : "text-white/60"}`}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
