import {z} from "zod";

export const formSchema = z.object({
    first_name: z.string().min(2, {
        message: "First name must to be at least 2 characters."
    }),
    last_name: z.string().min(2, {
        message: "Last name must to be at least 2 characters."
    }),
    email: z.string().email({
        message: "Enter correct email.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters."
    }),
});