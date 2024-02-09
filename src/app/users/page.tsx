'use client'

import React, {useEffect, useState} from 'react'
import axios, {AxiosResponse} from "axios";
import {Card, CardContent, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import {ChevronLeft, ChevronRight, Heart} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, useAppSelector} from "@/redux/store";
import {toggleUser} from "@/redux/users/users-slice";
import {redirect, useRouter} from "next/navigation";
import {useReadLocalStorage} from "usehooks-ts";

interface UserI {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
}

interface ResponseI {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: UserI[]
}

const Users = () => {
    const isAuthorized = useReadLocalStorage('currentUser');

    if (!isAuthorized) {
        redirect('/sign-in');
    }

    const [users, setUsers] = useState<UserI[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>();
    const dispatch = useDispatch<AppDispatch>();
    const selector = useAppSelector(state => state.userReducer.users);
    const [savedUsers, setSavedUsers] = useState<UserI[]>([]);

    useEffect(() => {
        const getUsers = async (page: number = 1) => {
            const response: AxiosResponse<ResponseI> = await axios.get(`https://reqres.in/api/users?page=${page}`);
            setUsers(response.data.data);
            setTotalPages(response.data.total_pages);
        };

        const storedUserData = localStorage.getItem('users');
        const parsedUserData = storedUserData ? JSON.parse(storedUserData) : [];
        setSavedUsers(parsedUserData);

        getUsers(page);
    }, [page, selector])

    const handleSaveUser = ({ id, email, first_name, last_name, avatar }: UserI) => {
        dispatch(toggleUser({
            id,
            email,
            first_name,
            last_name,
            avatar,
        }));
    }

    const isUserSaved = (user: UserI) => {
        return savedUsers.some((savedUser) => savedUser.id === user.id);
    }

    return (
        <section className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-5 sm:my-10'>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6'>
                {users &&
                    users.map((user, index) => (
                        <Card
                            key={index}
                            className='relative h-52 flex flex-col justify-center items-center hover:shadow-md transition p-0'
                        >
                            <Button
                                onClick={() => handleSaveUser(user)}
                                variant='ghost'
                                className='absolute p-2 top-3 right-3'
                            >
                                <Heart
                                    strokeWidth={1.25}
                                    className={`text-muted-foreground ${isUserSaved(user) ? 'text-red-500' : 'text-gray-500'}`}
                                />
                            </Button>

                            <Link
                                href={`/users/${user.id}`}
                                className='h-full w-full flex flex-col items-center justify-center'
                            >
                                <CardContent>
                                    <Image
                                        priority
                                        src={user.avatar}
                                        width={70}
                                        height={70}
                                        className='rounded-full'
                                        alt={user.first_name}
                                    />
                                </CardContent>

                                <CardTitle className='font-medium text-sm sm:text-md'>
                                    {user.first_name} {user.last_name}
                                </CardTitle>
                            </Link>
                        </Card>
                    ))}
            </div>

            <div className='flex justify-center gap-2'>
                <Button
                    variant='ghost'
                    className='p-2 flex gap-1 items-center'
                    onClick={() => setPage(prevState => prevState - 1)}
                    disabled={page === 1}
                >
                    <ChevronLeft strokeWidth={1.25} size={18} /> Previous
                </Button>
                <Button
                    variant='ghost'
                    onClick={() => setPage(prevState => prevState + 1)}
                    className='p-2 flex gap-1 items-center'
                    disabled={totalPages === page}
                >
                    Next <ChevronRight strokeWidth={1.25} size={18} />
                </Button>
            </div>
        </section>
    )
}
export default Users
