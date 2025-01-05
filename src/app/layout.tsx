import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "../components/ui/header";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Header />
                <main className="bg-black text-white">
                    <div className="px-2 mx-auto max-w-screen-xl">{children}</div>
                </main>
            </body>
        </html>
    );
}
