import axios from "axios";



const API = axios.create({
    baseURL: process.env.API_URL,
    timeout: process.env.API_TIMEOUT,
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