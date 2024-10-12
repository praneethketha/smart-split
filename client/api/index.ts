import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export interface BaseResponse<T> {
  status: string;
  data: T;
}

const api = axios.create({
  baseURL: "http://192.168.29.11:8000/api/v1",
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
