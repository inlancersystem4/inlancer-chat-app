import axios from "axios";
import { useSessionStore } from "@/stores";

const apiUrl = import.meta.env.VITE_API_KEY;
const sessionStore = useSessionStore();

const api = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: sessionStore.sessionToken,
  },
});

export const post = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
  if (error.response) {
    console.error("Error Response:", error.response.data);
    console.error("Error Status:", error.response.status);
  } else if (error.request) {
    console.error("Error Request:", error.request);
  } else {
    console.error("Error Message:", error.message);
  }
  throw error;
};
