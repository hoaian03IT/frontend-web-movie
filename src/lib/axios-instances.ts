import { AuthCredentialsContext } from "@/contexts/auth-credentials-context";
import axios from "axios";
import { useContext } from "react";
import jwt from "jsonwebtoken";
import { AuthService } from "@/services/auth.service";

interface DecodedToken {
    exp?: number; // Expiration time in seconds
}

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

authInstance.interceptors.request.use(
    async (config) => {
        const { user, setUser } = useContext(AuthCredentialsContext);

        let currentToken = user.token;
        let isTokenExpired = false;

        if (currentToken) {
            const decoded = jwt.decode(currentToken) as DecodedToken | null;

            if (!decoded || !decoded.exp) {
                throw new Error("Invalid token");
            }

            isTokenExpired = decoded && decoded?.exp < new Date().getTime() / 1000;
        }

        if (isTokenExpired && user.isLogged) {
            try {
                const data = await AuthService.refreshToken();
                if (data?.token) {
                    setUser({ ...user, token: currentToken, isLogged: true });
                } else {
                    throw new Error("Token refresh failed");
                }
            } catch (error) {
                setUser({ ...user, isLogged: false });
                throw new Error("Token refresh failed");
            }
        }

        config.headers.Authorization = "Bearer " + currentToken;
        return config;
    },
    (error) => {
        console.warn("Interceptor error:", error);
        throw new Error("Token refresh failed");
    }
);

export { authInstance, instance };
