export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="flex flex-col"
            style={{
                backgroundImage: "linear-gradient(#b8b8b5, #e3e2dd)",
            }}>
            <div className="flex-1 mx-auto max-w-screen-lg">{children}</div>
        </div>
    );
}
