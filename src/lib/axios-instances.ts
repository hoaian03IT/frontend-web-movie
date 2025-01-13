import axios from "axios";

// non-authenticated axios instance
const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    timeout: 10000, // ms
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// authenticated axios instance
const authInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    timeout: 10000, // ms
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export { authInstance, instance };
