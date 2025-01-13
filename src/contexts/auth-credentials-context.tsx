"use client";

import { AuthService } from "@/services/auth.service";
import { User } from "@/types/user";
import { useEffect } from "react";
import { createContext, ReactNode, SetStateAction, useState } from "react";

interface AuthCredentials extends User {
    token: string;
    isLogged: boolean;
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

const storeAuthCredentialsSession = (user: AuthCredentials) => {
    if (typeof sessionStorage !== "undefined") {
        sessionStorage.setItem("user.email", user.email);
        sessionStorage.setItem("user.name", user.name);
        sessionStorage.setItem("user.token", user.token);
        sessionStorage.setItem("user.isLogged", String(user.isLogged));
    }
};

const handleSignOut = async () => {
    try {
        await AuthService.logOut();
    } catch (error) {
        console.log(error);
    }
};

export default function AuthCredentialsContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthCredentials>({
        email: "",
        name: "",
        token: "",
        isLogged: false,
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

    return (
        <AuthCredentialsContext.Provider value={{ user, setUser, storeAuthCredentialsSession, handleSignOut }}>
            {children}
        </AuthCredentialsContext.Provider>
    );
}
