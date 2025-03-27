import axios from 'axios';
import { Platform } from 'react-native';

// Create an axios instance with base config
export const api = axios.create({
  baseURL: Platform.OS === 'android' 
    ? 'http://192.168.149.3:8000'
    : 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000 // 10 seconds timeout
});

// In your SignUp component
