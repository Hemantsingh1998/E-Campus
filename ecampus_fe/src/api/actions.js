import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

let url;
if (__DEV__) {
  url = 'http://192.168.43.154:9000';
} else {
  // url =
}

const instance = axios.create({
  baseURL: url,
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;