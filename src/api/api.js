import axios from "axios";
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

const API = axios.create({
    baseURL: REACT_APP_BACKEND_URL,
    timeout: 10000,
});

API.interceptors.request.use(async (config) => {
    try {
        const token = await localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    } catch (error) {
        return null;
    }

});

export default API;