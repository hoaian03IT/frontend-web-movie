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
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <div className="min-h-screen flex flex-col">
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
    );
}
