import axios from "axios";
import Cookies from "js-cookie";

const api = "http://localhost:3000/api/v1"; // "https://courier-service-app-he8z.onrender.com/api/v1"; ;

const ApiInstance = axios.create({
  baseURL: api,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Access Token

ApiInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("userAccessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Handle 401 (No Refresh Token)

ApiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      handleAuthFailure();
    }

    return Promise.reject(error);
  },
);

// Logout / Cleanup

const handleAuthFailure = () => {
  Cookies.remove("userAccessToken");
  Cookies.remove("userId");
  Cookies.remove("userEmail");
  Cookies.remove("userRole");

  window.location.href = "/admin";
};

export default ApiInstance;
