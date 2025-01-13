"use client";

import { FaInfoCircle } from "react-icons/fa";
import { Input } from "../input";
import { Button } from "../button";
import { useActionState, useState } from "react";
import { registerSchema } from "@/lib/zod-validations";
import { AuthService } from "@/services/auth.service";
import { ZodError } from "zod";
import { toast } from "sonner";
import { RiLoader4Fill } from "react-icons/ri";
import { OTPForm } from "./otp-form";
import { ValidationErrors } from "../validation-errors";

const initValidationFormData = {
    name: [],
    email: [],
    password: [],
    confirmPassword: [],
};

export function SignUpForm() {
    const [userId, setUserId] = useState<string | null>(null);

    const [validationErrors, setValidationErrors] = useState<{
        name: string[];
        email: string[];
        password: string[];
        confirmPassword: string[];
    }>(initValidationFormData);

    const handleSubmit = async (currentState: any, formData: FormData) => {
        const name = formData.get("name")?.toString();
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();
        const confirmPassword = formData.get("confirmPassword")?.toString();

        // reset validation errors before validation
        setValidationErrors(initValidationFormData);
        try {
            // validate inputs
            const validData = registerSchema.parse({ name, email, password, confirmPassword });

            const data = await AuthService.register({
                email: validData.email,
                name: validData.name,
                password: validData.password,
            });

            setUserId(data || null);
        } catch (error: any) {
            if (error instanceof ZodError) {
                error.errors.forEach((error) => {
                    if (typeof error.path[0] === "string")
                        setValidationErrors((prev) => ({
                            ...prev,
                            [error.path[0]]: [...prev[error.path[0] as "email" | "password"], error.message],
                        }));
                });
            } else {
                let toastId = toast.error(error.message, {
                    description: `Created at: ${new Date().toDateString()}`,
                    action: {
                        label: "Close",
                        onClick: () => {
                            toast.dismiss(toastId);
                        },
                    },
                });
            }

            // keep current form value
            currentState.email = email;
            currentState.name = name;
            currentState.password = password;
            currentState.confirmPassword = confirmPassword;
        }

        return currentState;
    };

    const [state, formAction, isPending] = useActionState(handleSubmit, {
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
    });

    return userId === null ? (
        <form className="space-y-4" action={formAction}>
            <h4 className="text-2xl text-center font-semibold">Sign up</h4>
            <div>
                <label className="cursor-pointer block mb-1 font-bold">Your name</label>
                <Input
                    name="name"
                    className="shadow-inner border-zinc-400"
                    defaultValue={state.name}
                    placeholder="Your first and last name"
                />
                <ValidationErrors errors={validationErrors.name} />
            </div>
            <div>
                <label className="cursor-pointer block mb-1 font-bold">Email</label>
                <Input
                    name="email"
                    className="shadow-inner border-zinc-400"
                    defaultValue={state.email}
                    placeholder="username@domain.com"
                />
                <ValidationErrors errors={validationErrors.email} />
            </div>
            <div>
                <label className="cursor-pointer block mb-1 font-bold">Password</label>
                <Input
                    name="password"
                    type="password"
                    className="shadow-inner border-zinc-400"
                    defaultValue={state.password}
                    placeholder="at least 8 characters"
                />
                {validationErrors.password.length > 0 ? (
                    <ValidationErrors errors={validationErrors.password} />
                ) : (
                    <span className="flex items-center gap-2 my-2">
                        <FaInfoCircle className="size-6 text-cyan-600" /> Password must be at least 8 characters
                    </span>
                )}
            </div>
            <div>
                <label className="cursor-pointer block mb-1 font-bold">Re-enter password</label>
                <Input
                    name="confirmPassword"
                    type="password"
                    className="shadow-inner border-zinc-400"
                    defaultValue={state.confirmPassword}
                />
                <ValidationErrors errors={validationErrors.confirmPassword} />
            </div>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black w-full rounded-3xl" disabled={isPending}>
                {isPending && <RiLoader4Fill className="animate-spin" />} Create your IMDb account
            </Button>
        </form>
    ) : (
        <OTPForm userId={userId} />
    );
}
