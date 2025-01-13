"use client";

import { authInstance } from "@/lib/axios-instances";
import { AuthService } from "@/services/auth.service";
import { User } from "@/types/user";
import { useEffect, useLayoutEffect } from "react";
import { createContext, ReactNode, SetStateAction, useState } from "react";
import jwt from "jsonwebtoken";
import { toast } from "sonner";

interface AuthCredentials extends User {
    token: string;
    isLogged: boolean;
}

interface DecodedToken {
    exp?: number; // Expiration time in seconds
}

export const AuthCredentialsContext = createContext<{
    user: AuthCredentials;
    setUser: React.Dispatch<SetStateAction<AuthCredentials>>;
    storeAuthCredentialsSession: (user: AuthCredentials) => void;
    handleSignOut: () => void;
}>({
    user: {
        email: "",
        name: "",
        token: "",
        isLogged: false,
    },
    setUser: () => {},
    storeAuthCredentialsSession: () => {},
    handleSignOut: () => {},
});

export default function AuthCredentialsContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthCredentials>({
        email: "",
        name: "",
        token: "",
        isLogged: false,
    });

    // check valid token before request with auth instance
    useLayoutEffect(() => {
        const authInterceptor = authInstance.interceptors.request.use(
            async (config) => {
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
                            setUser({ ...user, token: data?.token, isLogged: true });
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

        return () => authInstance.interceptors.request.eject(authInterceptor);
    });

    // load from local storage
    useEffect(() => {
        if (typeof sessionStorage !== "undefined")
            setUser({
                email: sessionStorage.getItem("user.email") || "",
                name: sessionStorage.getItem("user.name") || "",
                token: sessionStorage.getItem("user.token") || "",
                isLogged: !!sessionStorage.getItem("user.isLogged") || false,
            });
    }, []);

    const handleSignOut = async () => {
        try {
            await AuthService.logOut();
            setUser({ email: "", isLogged: false, name: "", token: "" });
            clearAuthCredentialsSession();
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    const storeAuthCredentialsSession = (user: AuthCredentials) => {
        if (typeof sessionStorage !== "undefined") {
            sessionStorage.setItem("user.email", user.email);
            sessionStorage.setItem("user.name", user.name);
            sessionStorage.setItem("user.token", user.token);
            sessionStorage.setItem("user.isLogged", String(user.isLogged));
        }
    };

    const clearAuthCredentialsSession = () => {
        if (typeof sessionStorage !== "undefined") {
            sessionStorage.removeItem("user.email");
            sessionStorage.removeItem("user.name");
            sessionStorage.removeItem("user.token");
            sessionStorage.removeItem("user.isLogged");
        }
    };

    return (
        <AuthCredentialsContext.Provider value={{ user, setUser, storeAuthCredentialsSession, handleSignOut }}>
            {children}
        </AuthCredentialsContext.Provider>
    );
}
