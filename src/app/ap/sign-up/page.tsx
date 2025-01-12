import { SignUpForm } from "@/components/ui/auth/sign-up-form";
import { BasicLink } from "@/components/ui/basic-link";
import { ButtonHome } from "@/components/ui/button-home";
import { Separator } from "@/components/ui/separator";

export default function SignUpWithIMDb() {
    return (
        <div>
            <div className="m-8 bg-white max-w-sm mx-auto space-y-5 text-[13px]">
                <div className="text-center">
                    <ButtonHome size="xl" />
                </div>
                <div className="p-8 border border-zinc-300 rounded-lg shadow-md drop-shadow-sm space-y-4">
                    <SignUpForm />
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
