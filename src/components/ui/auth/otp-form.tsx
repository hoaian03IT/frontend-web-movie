// no need to "use client" because this component currently just used for register

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "../button";
import { useActionState, useContext, useEffect, useState } from "react";
import { RiLoader4Fill } from "react-icons/ri";
import { AuthService } from "@/services/auth.service";
import { AuthCredentialsContext } from "@/contexts/auth-credentials-context";
import { ZodError } from "zod";
import clsx from "clsx";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const TIME_TO_RESEND_OTP = 60 * 2; // 2 minutes to request new OTP

export function OTPForm({ userId }: { userId: string }) {
    const { setUser } = useContext(AuthCredentialsContext);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [timeoutResend, setTimeoutResend] = useState(TIME_TO_RESEND_OTP);

    const router = useRouter();

    const handleSubmitVerification = async (currentState: any, formData: FormData) => {
        const otp = formData.get("otp")?.toString() ?? "";
        if (otp.length === 6) {
            try {
                const data = await AuthService.registerOTPVerification({ otp, userId });
                setUser({
                    email: data?.userInfo.email ?? "",
                    name: data?.userInfo.name ?? "",
                    token: data?.token ?? "",
                    isLogged: true,
                });

                // redirect user to home page after signing up
                router.push("/");
            } catch (error) {
                if (error instanceof ZodError) {
                    error.errors.forEach((error) => {
                        if (typeof error.path[0] === "string") setValidationErrors((prev) => [...prev, error.message]);
                    });
                }
            }
        } else {
            toast.warning("Please enter OTP");
        }

        return currentState;
    };

    const handleResendOTP = async () => {
        setTimeoutResend(-1);
        try {
            await AuthService.resendRegisterOTPVerification({ userId });
        } catch (error) {
            if (error instanceof ZodError) {
                error.errors.forEach((error) => {
                    if (typeof error.path[0] === "string") setValidationErrors((prev) => [...prev, error.message]);
                });
            }
        } finally {
            setTimeoutResend(TIME_TO_RESEND_OTP);
        }
    };

    const [state, formAction, isPending] = useActionState(handleSubmitVerification, { otp: "" });

    useEffect(() => {
        const handler = setInterval(() => {
            if (timeoutResend > 0) setTimeoutResend((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(handler);
    }, [timeoutResend]);

    return (
        <form className="space-y-4" action={formAction}>
            <div className="flex items-center justify-center">
                <InputOTP name="otp" maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} className="size-11 text-xl" />
                        <InputOTPSlot index={1} className="size-11 text-xl" />
                        <InputOTPSlot index={2} className="size-11 text-xl" />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                        <InputOTPSlot index={3} className="size-11 text-xl" />
                        <InputOTPSlot index={4} className="size-11 text-xl" />
                        <InputOTPSlot index={5} className="size-11 text-xl" />
                    </InputOTPGroup>
                </InputOTP>
            </div>
            <div className="text-[12x] text-red">
                {validationErrors.map((error) => (
                    <p>{error}</p>
                ))}
            </div>
            {timeoutResend >= 0 ? (
                <div className={clsx("text-sm text-center", timeoutResend > 0 ? "opacity-50" : "")}>
                    <button
                        onClick={handleResendOTP}
                        type="button"
                        className={clsx(
                            "text-cyan-700",
                            timeoutResend > 0 ? "" : "hover:underline hover:text-orange-700"
                        )}
                        disabled={timeoutResend > 0}>
                        Resend OTP
                    </button>
                    {timeoutResend > 0 && <span className="text-cyan-700">:&nbsp;{timeoutResend}s</span>}
                </div>
            ) : (
                <div className="flex justify-center">
                    <RiLoader4Fill className="animate-spin size-5" />
                </div>
            )}
            <Button className="w-full bg-yellow-400 rounded-3xl hover:bg-yellow-300" disabled={isPending}>
                {isPending && <RiLoader4Fill className="animate-spin" />} Verify
            </Button>
        </form>
    );
}
