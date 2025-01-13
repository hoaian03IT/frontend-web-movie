import "./globals.css";
import { NavHeader } from "@/components/ui/layout/nav-header";
import { geistMono, geistSans } from "@/components/fonts";
import { FooterSection } from "@/components/ui/layout/footer-section";
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import AuthCredentialsContextProvider from "@/contexts/auth-credentials-context";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthCredentialsContextProvider>
            <html lang="en">
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                    <div className="min-h-screen flex flex-col">
                        <Toaster richColors />
                        <header className="bg-zinc-800 shadow-lg drop-shadow-md">
                            <NavHeader />
                        </header>
                        <main className="flex-1">{children}</main>
                        <footer className="bg-black">
                            <FooterSection />
                        </footer>
                    </div>
                </body>
            </html>
        </AuthCredentialsContextProvider>
    );
}
