import axios from "axios";

const API = axios.create({
    baseURL: "https://master-barber-api.onrender.com",
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