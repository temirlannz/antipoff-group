import React from 'react'
import axios from "axios";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {Separator} from "@radix-ui/react-menu";
import {AtSign, ChevronLeft, ExternalLink, Link2, Mail, Mails, MoveUpRight} from "lucide-react";
import Link from "next/link";

interface UserInfoI {
    data: {
        data: {
            id: number
            email: string
            first_name: string
            last_name: string
            avatar: string
        }
        support: {
            url: string
            text: string
        }
    }
}

const getUserInfo = async (id: string): Promise<UserInfoI> => {
    return await axios.get(`https://reqres.in/api/users/${id}`);
}

const UserInfo = async ({ params }: { params: {id: string} }) => {
    const userInfo = await getUserInfo(params.id);


    return (
        <section className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-5 sm:mt-10'>
            <Link href='/users' className='flex gap-1 items-center text-sm sm:text-md mb-3 sm:mb-0'>
                <ChevronLeft strokeWidth={1.25} size={18} /> Back
            </Link>

            <div className='mx-auto w-full sm:w-1/3'>
                <Card>
                    <CardContent className='flex items-center p-6 gap-3'>
                        <Image
                            priority
                            src={userInfo.data.data.avatar}
                            width={60}
                            height={60}
                            className='rounded-full'
                            alt={userInfo.data.data.first_name}
                        />

                        <div className=''>
                            <h3 className='font-medium text-sm sm:text-md'>
                                {userInfo.data.data.first_name + ' ' + userInfo.data.data.last_name}
                            </h3>

                            <h3 className='flex items-center gap-1 text-sm text-muted-foreground'>
                                <Mails strokeWidth={1.25} size={14} />
                                {userInfo.data.data.email}
                            </h3>
                        </div>
                    </CardContent>

                    <CardContent className='flex flex-col gap-2'>
                        <a href={userInfo.data.support.url}
                           className='text-blue-800 underline hover:underline flex flex-col items-end text-sm sm:text-md'
                           target='_blank'
                        >
                            { userInfo.data.support.text }
                        </a>

                        <p className='text-sm sm:text-md'>
                            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex facere itaque laboriosam nihil praesentium quidem quis quos, repellat sit tempore ullam veniam voluptates. Ducimus error, molestias nisi nobis unde vero.</span>
                            <span>Ad adipisci amet assumenda deleniti dignissimos doloribus dolorum error et, explicabo illo inventore iure magnam minus non perferendis quaerat qui quidem quis quisquam recusandae repellat repellendus sequi similique suscipit tempora.</span>
                            <span>A accusamus commodi consequuntur deleniti dicta dolores ea earum enim esse eum exercitationem, fugiat hic ipsam magni mollitia numquam possimus quasi quibusdam repellat, repellendus reprehenderit saepe tempora ut vel vitae?</span>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
export default UserInfo
