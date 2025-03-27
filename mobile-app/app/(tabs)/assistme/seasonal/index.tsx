import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Leaf } from 'lucide-react-native';

export default function SeasonalFarmingScreen() {
  const [location, setLocation] = useState('INDIA');
  const [hemisphere, setHemisphere] = useState('Northern');
  const [cropType, setCropType] = useState('Wheat');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Leaf size={24} color="#22C55E" />
        <Text style={styles.headerText}>Seasonal Farming Advice</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Your location (country/region):</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="Enter your location"
            placeholderTextColor="#6B7280"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Hemisphere:</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity 
              style={styles.radioOption}
              onPress={() => setHemisphere('Northern')}
            >
              <View style={styles.radioCircle}>
                {hemisphere === 'Northern' && <View style={styles.radioFill} />}
              </View>
              <Text style={styles.radioText}>Northern</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.radioOption}
              onPress={() => setHemisphere('Southern')}
            >
              <View style={styles.radioCircle}>
                {hemisphere === 'Southern' && <View style={styles.radioFill} />}
              </View>
              <Text style={styles.radioText}>Southern</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Crop type (optional):</Text>
          <TextInput
            style={styles.input}
            value={cropType}
            onChangeText={setCropType}
            placeholder="Enter crop type"
            placeholderTextColor="#6B7280"
          />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Seasonal Advice</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 48,
  },
  headerText: {
    color: '#22C55E',
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    color: '#374151',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 12,
    color: '#1f2937',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  radioGroup: {
    flexDirection: 'row',
    marginTop: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  radioFill: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22C55E',
  },
  radioText: {
    color: '#374151',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#22C55E',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});