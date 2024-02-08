'use client';

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import {formSchema} from "@/app/(auth)/sign-up/formSchema";
import {formData} from "@/app/(auth)/sign-up/formData";

const Signup = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <section className='h-screen w-full flex justify-center items-center'>
            <div className='w-full bg-background rounded-md sm:w-1/5 sm:bg-white py-8 px-4 sm:px-8'>
                <div className='mb-5'>
                    <h3 className='text-md font-medium'>Create your account</h3>
                    <span className='text-muted-foreground text-sm'>
                        to continue to app
                    </span>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
                        {formData.map((item, index) => (
                            <FormField
                                key={index}
                                control={form.control}
                                name={item.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{item.label}</FormLabel>
                                        <FormControl>
                                            <Input type={item.name} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}

                        <Button className='block' type="submit">
                            Sign-up
                        </Button>

                        <span className='block text-muted-foreground text-sm'>
                            Have an account?
                            <Link className='text-blue-600 ml-1' href='/sign-in'>
                                Sign-in
                            </Link>
                        </span>
                    </form>
                </Form>
            </div>
        </section>
    )
}
export default Signup
