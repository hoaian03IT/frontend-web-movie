import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Email must be valid" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#_&.])[A-Za-z\d!@#_&.]{8,64}$/, {
            message: `Password must include at least one uppercase, lowercase letter, number, special character (!@#_&.).`,
        }),
});

export const registerSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters" })
        .regex(
            /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžæÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
            { message: "Name must ve valid" }
        ),
    email: z.string().email({ message: "Email must be valid" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#_&.])[A-Za-z\d!@#_&.]{8,64}$/, {
            message: `Password must include at least one uppercase, lowercase letter, number, special character (!@#_&.).`,
        }),
    confirmPassword: z.string().nonempty({ message: "Password must be required" }),
});
