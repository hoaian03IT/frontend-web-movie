import "./globals.css";
import { NavHeader } from "../components/ui/nav-header";
import { geistMono, geistSans } from "@/components/fonts";
import { FooterSection } from "@/components/ui/footer-section";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
                <header className="bg-zinc-800 shadow-lg drop-shadow-md">
                    <NavHeader />
                </header>
                <div className="flex-1">{children}</div>
                <footer className="bg-black">
                    <FooterSection />
                </footer>
            </body>
        </html>
    );
}
