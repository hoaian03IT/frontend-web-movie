import "./globals.css";
import { NavHeader } from "../components/ui/nav-header";
import { geistMono, geistSans } from "@/components/fonts";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <header className="bg-zinc-800 shadow-lg drop-shadow-md">
                    <NavHeader />
                </header>
                <main>{children}</main>
            </body>
        </html>
    );
}
