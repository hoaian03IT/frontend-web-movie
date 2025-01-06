"use client";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SignIn() {
    // const domain = document.location.origin;
    const [domain, setDomain] = useState<string | null>(null);

    useEffect(() => {
        setDomain(document ? document.location.origin : null);
    }, []);

    return (
        <div className="bg-white flex">
            <div className="p-8 basis-5/12 text-black">
                <div className="w-[240px] mx-auto text-center space-y-3">
                    <h3 className="text-xl font-bold">Sign in</h3>
                    <div className="flex flex-col gap-3">
                        <Link
                            href="/"
                            className="flex items-center gap-4 border border-zinc-300 px-2 py-1 text-sm font-semibold rounded-sm">
                            <div
                                style={{
                                    width: "32px",
                                    height: "24px",
                                    backgroundImage: domain ? `url('${domain}/sign-in-with.png')` : "",
                                    backgroundSize: "32px, 96px",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "0 2px",
                                    verticalAlign: "middle",
                                }}></div>
                            Sign in with IMDb
                        </Link>
                        <Link
                            href="/"
                            className="flex items-center gap-4 border border-zinc-300 px-2 py-1 text-sm font-semibold rounded-sm">
                            <div
                                style={{
                                    width: "32px",
                                    height: "24px",
                                    backgroundImage: domain ? `url('${domain}/sign-in-with.png')` : "",
                                    backgroundSize: "32px, 96px",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "0 -24px",
                                    verticalAlign: "middle",
                                }}></div>
                            Sign in with Amazon
                        </Link>
                        <Link
                            href="/"
                            className="flex items-center gap-4 border border-zinc-300 px-2 py-1 text-sm font-semibold rounded-sm">
                            <div
                                style={{
                                    width: "32px",
                                    height: "24px",
                                    backgroundImage: domain ? `url('${domain}/sign-in-with.png')` : "",
                                    backgroundSize: "32px, 96px",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "0 -76px",
                                    verticalAlign: "middle",
                                }}></div>
                            Sign in with Google
                        </Link>
                        <Link
                            href="/"
                            className="flex items-center gap-4 border border-zinc-300 px-2 py-1 text-sm font-semibold rounded-sm">
                            <div
                                style={{
                                    width: "32px",
                                    height: "24px",
                                    backgroundImage: domain ? `url('${domain}/sign-in-with.png')` : "",
                                    backgroundSize: "32px, 96px",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "0 -102px",
                                    verticalAlign: "middle",
                                }}></div>
                            Sign in with Apple
                        </Link>
                        <Link
                            href="/"
                            className="flex items-center gap-4 border border-zinc-300 px-2 py-1 text-sm font-semibold rounded-sm">
                            <div
                                style={{
                                    width: "32px",
                                    height: "24px",
                                    backgroundImage: domain ? `url('${domain}/sign-in-with.png')` : "",
                                    backgroundSize: "32px, 96px",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "0 -50px",
                                    verticalAlign: "middle",
                                }}></div>
                            Sign in with Facebook
                        </Link>
                    </div>
                    <div className="flex items-center justify-between text-[12px] text-zinc-800">
                        <Separator className="w-[100px] bg-black" />
                        or
                        <Separator className="w-[100px] bg-black" />
                    </div>
                    <Link
                        href="/sign-up"
                        className="p-2 flex justify-center items-center rounded-sm bg-yellow-500 text-sm font-bold">
                        Create new account
                    </Link>
                    <p className="px-4 text-[10px] text-zinc-800">
                        By signing in, you agree to IMDb&apos;s&nbsp;
                        <Link className="text-blue-500 hover:underline" href="/condition-of-use">
                            Conditions of Use
                        </Link>
                        &nbsp; and&nbsp;
                        <Link className="text-blue-500 hover:underline" href="/privacy-policy">
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>
            </div>
            <Separator orientation="vertical" className="mt-8 h-60" />
            <div className="p-8 text-black tracking-wide space-y-3">
                <h3 className="text-xl font-bold">Benefits of your free IMDb account</h3>
                <div className="text-[12px]">
                    <p>
                        <strong>Personalized Recommendations</strong>
                    </p>
                    <p>Discover shows you&apos;ll love.</p>
                </div>
                <div className="text-[12px]">
                    <p>
                        <strong>Your Watchlist</strong>
                    </p>
                    <p>Track everything you want to watch and receive e-mail when movies open in theaters.</p>
                </div>
                <div className="text-[12px]">
                    <p>
                        <strong>Your Ratings</strong>
                    </p>
                    <p>Rate and remember everything you&apos;ve seen.</p>
                </div>
                <div className="text-[12px]">
                    <p>
                        <strong>Contribute to IMDb</strong>
                    </p>
                    <p>Add data that will be seen by millions of people and get cool badges.</p>
                </div>
            </div>
        </div>
    );
}
