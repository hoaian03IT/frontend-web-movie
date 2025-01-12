"use client";

import { AuthService } from "@/services/auth.api";
import { BasicLink } from "../basic-link";
import { Button } from "../button";
import { Input } from "../input";
import { ZodError, z } from "zod";
import { useActionState, useContext, useState } from "react";
import { ValidationErrors } from "../validation-errors";
import { RiLoader4Fill } from "react-icons/ri";
import { toast } from "sonner";
import { AuthCredentialsContext } from "@/contexts/auth-credentials-context";
import { useRouter } from "next/navigation";

export function SignInForm() {
    const { setUser } = useContext(AuthCredentialsContext);

    const [validationErrors, setValidationErrors] = useState<Record<"email" | "password", string[]>>({
        email: [],
        password: [],
    });

    const router = useRouter();

    const handleSubmit = async (currentState: any, formData: FormData) => {
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();

        // create validate schema
        const schema = z.object({
            email: z.string().email({ message: "Email must be valid" }),
            password: z
                .string()
                .min(8, { message: "Password must be at least 8 characters" })
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#_&.])[A-Za-z\d!@#_&.]{8,64}$/, {
                    message: `Password must include at least one uppercase, lowercase letter, number, special character (!@#_&.).`,
                }),
        });

        try {
            // reset validation errors before submitting
            setValidationErrors({ email: [], password: [] });

            // validate inputs
            const validPayload = schema.parse({
                email,
                password,
            });

            const data = await AuthService.login(validPayload);

            setUser({
                email: data.userInfo.email,
                name: data.userInfo.name,
                isLogged: true,
                token: data.token,
            });

            router.push("/");
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
                    style: { color: "#e74c3c" },
                    actionButtonStyle: { background: "#e74c3c" },
                    description: `Created at: ${new Date().toDateString()}`,
                    action: {
                        label: "Close",
                        onClick: () => {
                            toast.dismiss(toastId);
                        },
                    },
                });
            }

            // keep value instead of resetting form values
            currentState.email = email;
            currentState.password = password;
        }
        return currentState;
    };

    const [state, formAction, isPending] = useActionState(handleSubmit, { email: "", password: "" });

    return (
        <form className="space-y-4" action={formAction}>
            <h4 className="text-2xl text-center font-semibold">Sign in</h4>
            <div>
                <label className="cursor-pointer block mb-1 font-bold">Email</label>
                <Input name="email" className="shadow-inner border-zinc-400" defaultValue={state.email} />
                <ValidationErrors errors={validationErrors.email} />
            </div>
            <div>
                <div className="flex justify-between mb-1">
                    <label className="cursor-pointer font-bold">Password</label>
                    <BasicLink href="/forgot-password">Forgot password?</BasicLink>
                </div>
                <Input
                    name="password"
                    type="password"
                    className="shadow-inner border-zinc-400"
                    defaultValue={state.password}
                />
                <ValidationErrors errors={validationErrors.password} />
            </div>
            <Button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-black w-full rounded-3xl [&_svg]:size-4 gap-1"
                disabled={isPending}>
                {isPending && <RiLoader4Fill className="animate-spin" />} Sign in
            </Button>
        </form>
    );
}
