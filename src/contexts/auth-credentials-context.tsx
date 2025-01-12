"use client";

import { User } from "@/types/user";
import { createContext, ReactNode, SetStateAction, useEffect, useState } from "react";

interface AuthCredentials extends User {
    token: string;
    isLogged: boolean;
}

export const AuthCredentialsContext = createContext<{
    user: AuthCredentials;
    setUser: React.Dispatch<SetStateAction<AuthCredentials>>;
}>({
    user: {
        email: sessionStorage.getItem("user.email") || "",
        name: sessionStorage.getItem("user.name") || "",
        token: sessionStorage.getItem("user.token") || "",
        isLogged: !!sessionStorage.getItem("user.isLogged") || false,
    },
    setUser: () => {},
});

export default function AuthCredentialsContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthCredentials>({
        email: sessionStorage.getItem("user.email") || "",
        name: sessionStorage.getItem("user.name") || "",
        token: sessionStorage.getItem("user.token") || "",
        isLogged: !!sessionStorage.getItem("user.isLogged") || false,
    });

    return <AuthCredentialsContext.Provider value={{ user, setUser }}>{children}</AuthCredentialsContext.Provider>;
}
