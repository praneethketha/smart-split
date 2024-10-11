import axios from "axios";

export interface BaseResponse<T> {
  status: string;
  data: T;
}

const api = axios.create({
  baseURL: "http://192.168.29.11:8000/api/v1",
});

export default api;
