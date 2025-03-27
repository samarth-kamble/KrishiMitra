import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import {
  Cloud,
  Wind,
  Droplets,
  Eye,
  Thermometer,
  RefreshCcw,
} from "lucide-react-native";
import * as Location from "expo-location";

const API_KEY = "ab2964ddf7a5d322f2b2047b10ed7142";

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
}

export default function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Location permission denied");
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
      } else {
        setError(data.message || "Failed to load weather");
      }
    } catch (err: any) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#1976D2" />;
  if (error || !weather)
    return (
      <Text style={styles.errorText}>
        {error || "Weather data not available"}
      </Text>
    );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Current Weather</Text>
          <TouchableOpacity onPress={fetchWeather}>
            <RefreshCcw size={24} color="#1976D2" />
          </TouchableOpacity>
        </View>

        <View style={styles.weatherBox}>
          <View style={styles.weatherTopRow}>
            <View>
              <Text style={styles.label}>Now</Text>
              <Text style={styles.temp}>{weather.main.temp}°</Text>
            </View>
            <View style={styles.weatherDetails}>
              <View style={styles.weatherRow}>
                <Cloud size={32} color="#1565C0" />
                <Text style={styles.weatherMain}>
                  {weather.weather[0].main}
                </Text>
              </View>
              <Text style={styles.feelsLike}>
                Feels like {weather.main.feels_like}°
              </Text>
            </View>
          </View>
          <View style={styles.weatherBottomRow}>
            <Text>High: {weather.main.temp_max}°</Text>
            <Text>Low: {weather.main.temp_min}°</Text>
          </View>
        </View>

        <View style={styles.weatherDetailsContainer}>
          {[
            {
              label: "Wind speed",
              value: `${weather.wind.speed} m/s`,
              icon: <Wind size={24} color="#1565C0" />,
            },
            {
              label: "Humidity",
              value: `${weather.main.humidity}%`,
              icon: <Droplets size={24} color="#1565C0" />,
            },
            {
              label: "Visibility",
              value: `${(weather.visibility / 1000).toFixed(1)} km`,
              icon: <Eye size={24} color="#1565C0" />,
            },
            {
              label: "Dew Point",
              value: `${weather.main.temp}°`,
              icon: <Thermometer size={24} color="#1565C0" />,
            },
          ].map((item, index) => (
            <View key={index} style={styles.detailBox}>
              <View>{item.icon}</View>
              <Text style={styles.detailLabel}>{item.label}</Text>
              <Text style={styles.detailValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16, // Added uniform padding to prevent UI edge clipping
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10, // Added spacing for better visibility
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12, // Adjusted to reduce unnecessary gaps
  },
  headerText: {
    fontSize: 20, // Slightly increased for better readability
    fontWeight: "bold",
    color: "#1976D2",
  },
  weatherBox: {
    backgroundColor: "#E3F2FD",
    borderRadius: 20,
    padding: 14,
    marginBottom: 10, // Adjusted margin to maintain uniformity
  },
  weatherTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8, // Reduced for better compactness
  },
  temp: {
    fontSize: 46,
    fontWeight: "bold",
  },
  weatherMain: {
    fontSize: 18,
    fontWeight: "600",
  },
  feelsLike: {
    fontSize: 14,
    color: "#4A4A4A",
  },
  weatherDetailsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8, // Added spacing between weather details
  },
  detailBox: {
    backgroundColor: "#E3F2FD",
    borderRadius: 16,
    padding: 12,
    width: "48%",
    marginBottom: 8, // Reduced margin to optimize spacing
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 14,
    color: "#4A4A4A",
    marginTop: 4, // Ensured text has proper spacing below the icon
  },
  detailValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  weatherBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingHorizontal: 12,
  },
});
