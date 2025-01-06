export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="min-h-[540px]"
            style={{
                backgroundImage: "linear-gradient(#b8b8b5, #e3e2dd)",
            }}>
            <div className="px-12 mx-auto max-w-screen-lg">{children}</div>
        </div>
    );
}
