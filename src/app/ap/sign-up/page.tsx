"use client";
import { BasicLink } from "@/components/ui/basic-link";
import { Button } from "@/components/ui/button";
import { ButtonHome } from "@/components/ui/button-home";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FaInfoCircle } from "react-icons/fa";

export default function SignUpWithIMDb() {
    return (
        <div>
            <div className="m-8 bg-white max-w-sm mx-auto space-y-5 text-[13px]">
                <div className="text-center">
                    <ButtonHome size="xl" />
                </div>
                <div className="p-8 border border-zinc-300 rounded-lg shadow-md drop-shadow-sm space-y-4">
                    <form className="space-y-4">
                        <h4 className="text-2xl text-center font-semibold">Sign up</h4>
                        <div>
                            <label className="cursor-pointer block mb-1 font-bold">Your name</label>
                            <Input
                                name="name"
                                className="shadow-inner border-zinc-400"
                                placeholder="Your first and last name"
                            />
                        </div>
                        <div>
                            <label className="cursor-pointer block mb-1 font-bold">Email</label>
                            <Input
                                name="email"
                                className="shadow-inner border-zinc-400"
                                placeholder="username@domain.com"
                            />
                        </div>
                        <div>
                            <label className="cursor-pointer block mb-1 font-bold">Password</label>
                            <Input className="shadow-inner border-zinc-400" placeholder="at least 8 characters" />
                            <span className="flex items-center gap-2 my-2">
                                <FaInfoCircle className="size-6 text-cyan-600" /> Password must be at least 8 characters
                            </span>
                        </div>
                        <div>
                            <label className="cursor-pointer block mb-1 font-bold">Re-enter password</label>
                            <Input className="shadow-inner border-zinc-400" />
                        </div>
                        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black w-full rounded-3xl">
                            Create your IMDb account
                        </Button>
                    </form>
                    <Separator className="bg-zinc-300 h-[2px]" />
                    <div className="flex items-center">
                        <p>Already have an account?</p>&nbsp;
                        <BasicLink href="/ap/sign-in">Sign in &gt;</BasicLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
