export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div
            style={{
                backgroundImage: "linear-gradient(#b8b8b5, #e3e2dd)",
            }}>
            <div className="mx-auto max-w-screen-lg">{children}</div>
        </div>
    );
}
