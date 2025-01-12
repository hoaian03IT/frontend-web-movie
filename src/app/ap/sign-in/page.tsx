import { ButtonSwitchPage } from "@/components/ui/auth/button-switch-page";
import { SignInForm } from "@/components/ui/auth/sign-in-form";
import { ButtonHome } from "@/components/ui/button-home";
import { Separator } from "@/components/ui/separator";

export default function SignInWithIMDb() {
    return (
        <div>
            <div className="m-8 bg-white max-w-sm mx-auto space-y-5 text-[13px]">
                <div className="text-center">
                    <ButtonHome size="xl" />
                </div>
                <div className="p-8 border border-zinc-300 rounded-lg shadow-md drop-shadow-sm space-y-4">
                    <SignInForm />
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-[12px] text-zinc-500">
                            <Separator className="w-[100px] bg-zinc-300" />
                            New to IMDb?
                            <Separator className="w-[100px] bg-zinc-300" />
                        </div>
                        <ButtonSwitchPage href="/ap/sign-up" content="Create your new IMDb" />
                    </div>
                </div>
            </div>
        </div>
    );
}
