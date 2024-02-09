'use client';

import React, {useEffect, useState} from 'react'
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
import axios, {AxiosError} from "axios";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store";
import {register} from "@/redux/auth/auth-slice";
import {redirect, useRouter} from "next/navigation";
import {useReadLocalStorage} from "usehooks-ts";

interface ResponseI {
    status: number
    data: {
        id: number
        token: string
    }
}

const Signup = () => {
    const [isAuthorized, setIsAuthorized] = useState(useReadLocalStorage('currentUser'));
    const router = useRouter();

    if (isAuthorized) {
        router.push('/users');
    }

    const dispatch = useDispatch<AppDispatch>();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const registerUser: ResponseI =
                await axios.post('https://reqres.in/api/register', {
                    email: values.email,
                    password: values.password
                });

            if (registerUser.status === 200) {
                dispatch(register(registerUser.data));
                router.push('/users');
            }
        } catch (err: AxiosError | any) {
            alert(err.response.data.error || err + ". Check console");
            console.log(err);
        }
    }

    return (
        <section className='h-screen w-full flex justify-center items-center'>
            <div className='bg-background rounded-md w-full sm:w-1/2 lg:w-1/4 sm:bg-white py-8 px-4 sm:px-8'>
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
