'use client'

import React from 'react'
import Logo from '@/app/assets/svg/Logo'
import Link from 'next/link'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogOut } from 'lucide-react'
import { useUser } from '@/context/UserContext'
import { logout } from '@/service/AuthService'
import { usePathname, useRouter } from 'next/navigation'
import { protectedRoutes } from '@/constants'

export default function Navbar() {

    const { user, setIsLoading } = useUser();
    const pathname = usePathname();
    const router = useRouter()

    const handleLogout = () => {
        logout();
        setIsLoading(true);
        if (protectedRoutes.some((route) => pathname.match(route))) {
            router.push("/")
        }
    };

    const links = [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'Menu',
            path: '/menu'
        },
    ]

    return (
        <header className="border-b w-full">
            <div className="container flex justify-between items-center mx-auto h-16 px-3">
                <h1 className="text-2xl font-black flex items-center">
                    <Logo />
                    Green Bite
                </h1>
                <div className="max-w-md flex-grow">
                    {/* <input
                        type="text"
                        placeholder="Search for products"
                        className="w-full max-w-6xl border border-gray-300 rounded-full py-2 px-5"
                    /> */}

                    {
                        links.map((link, idx) => <Link
                            key={idx}
                            href={link.path}
                            className='mr-5'
                        >{link.name}
                        </Link>)
                    }

                </div>
                <nav className="flex gap-2 items-center mr-5">

                    {
                        user ? <>

                            <DropdownMenu>
                                <DropdownMenuTrigger className='cursor-pointer'>
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>User</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link href={'/profile'}>Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href={`${user?.role}`}>Dashboard</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>My Shop</DropdownMenuItem>

                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={handleLogout}
                                        className="bg-red-500 m-1 mt-2">
                                        <LogOut />
                                        <span>
                                            Log Out
                                        </span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </> : <>
                            <Link href={'/login'}>
                                <Button variant="outline" className="rounded-sm bg-[#60ba62] text-white">
                                    Login
                                </Button>
                            </Link>

                            <Link href={'/register'}>
                                <Button variant="outline" className="rounded-sm bg-[#60ba62] text-white">
                                    Register
                                </Button>
                            </Link>
                        </>
                    }
                </nav>
            </div>
        </header>
    )
}
