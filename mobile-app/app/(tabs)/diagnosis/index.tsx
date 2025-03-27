
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Home, Cloud, Sprout, Wheat, Menu } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Diagnosis() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-[#4A6741] p-4 flex-row items-center justify-between">
        <TouchableOpacity>
          <Menu className="text-white w-6 h-6" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-white">AgroTech</Text>
        <View className="w-6" /> {/* Spacer for alignment */}
      </View>

      {/* Welcome Section */}
      <View className="relative">
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80' }}
          className="w-full h-48 object-cover"
        />
        <View className="absolute bottom-0 left-0 p-4">
          <Text className="text-2xl font-bold text-white">Welcome, User!</Text>
        </View>
      </View>

      {/* Feature Cards */}
      <View className="p-4 space-y-4">
        {[ 
          { title: 'Crop Diagnosis', img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=300&q=80' },
          { title: 'Cattle Diagnosis', img: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&w=300&q=80' },
        ].map((item, index) => (
          <View key={index} className="bg-[#E8F3E8] rounded-2xl p-4 flex-row justify-between items-center">
            <Text className="text-xl font-semibold text-black">{item.title}</Text>
            <Image source={{ uri: item.img }} className="w-24 h-24 rounded-xl object-cover" />
          </View>
        ))}
      </View>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-[#4A6741] p-4">
        <View className="flex-row justify-around">
          {[
            { name: 'Home', icon: Home, active: true },
            { name: 'Weather', icon: Cloud },
            { name: 'Soil Health', icon: Sprout },
            { name: 'Crop Advisory', icon: Wheat }
          ].map((item, index) => (
            <TouchableOpacity key={index} className="flex items-center">
              <item.icon className={`w-6 h-6 ${item.active ? 'text-white' : 'text-white/60'}`} />
              <Text className={`text-xs mt-1 ${item.active ? 'text-white' : 'text-white/60'}`}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
