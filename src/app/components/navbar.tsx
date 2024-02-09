'use client'

import React, {useEffect} from 'react'
import Link from "next/link";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {LogOut} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, useAppSelector} from "@/redux/store";
import {login, logout} from "@/redux/auth/auth-slice";
import {useRouter} from "next/navigation";

const Navbar = () => {
    const token = useAppSelector(state => state.authReducer.token);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    useEffect(() => {
        dispatch(login(JSON.parse(localStorage.getItem('currentUser') as string)))
    }, []);

    return (
        <nav className='absolute top-0 left-0 mx-auto max-w-7xl h-16 flex justify-between items-center px-4 sm:px-6 lg:px-8'>
            <Link href='/sign-in' className='text-sm sm:text-md font-medium'>
                Antipoff
            </Link>

            {token &&
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar className='w-full h-full'>
                            <AvatarFallback className='p-2 text-sm sm:text-md'>
                                CN
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuItem onClick={() => {
                            dispatch(logout());
                            router.push('/sign-in')
                        }} className='flex justify-between'>
                            Logout <LogOut strokeWidth={2} size={15} />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>}
        </nav>
    )
}
export default Navbar
