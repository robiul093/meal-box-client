"use client";

import * as React from "react";
import {
    Bot,
    Send,
    Settings,
    SquareTerminal,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import Logo from "@/app/assets/svg/Logo";


const navItems = {
    customer: [
        {
            title: "Dashboard",
            url: "/customer/dashboard",
            icon: SquareTerminal,
            isActive: true,
        },
        {
            title: "My Orders",
            url: "/customer/orders",
            icon: Bot,
        },
        {
            title: "Settings",
            url: "/profile",
            icon: Settings,
        },
    ],
    provider: [
        {
            title: "Dashboard",
            url: "/provider/dashboard",
            icon: SquareTerminal,
            isActive: true,
        },
        {
            title: "Manage Meals",
            url: "/provider/meals/update",
            icon: Bot,
            items: [
                {
                  title: "Create Meals",
                  url: "/provider/meals/create",
                },
                {
                  title: "Update Meals",
                  url: "/provider/meals/update",
                },
              ],
        },
        {
            title: "Orders",
            url: "/provider/order",
            icon: Send,
            items: [
                {
                    title: 'All Orders',
                    url: "/provider/order"
                },
                // {
                //     title: 'Order Response',
                //     url: "/providers/orders/response"
                // }
            ]
        },
        // {
        //     title: "Settings",
        //     url: "/profile",
        //     icon: Settings,
        // },
    ],
    admin: [
        {
            title: "Admin Dashboard",
            url: "/admin/dashboard",
            icon: SquareTerminal,
            isActive: true,
        },
        {
            title: "Manage Users",
            url: "/admin/users",
            icon: Bot,
        },
        {
            title: "Manage Orders",
            url: "/admin/orders",
            icon: Send,
        },
        {
            title: "Site Settings",
            url: "/admin/settings",
            icon: Settings,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

    const { user, } = useUser();
    const role = user?.role || 'customer'

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="flex items-center justify-center">
                                    <Logo />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <h2 className="font-bold text-xl">Green Bite</h2>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navItems[role]} />
            </SidebarContent>
            <SidebarFooter className="mb-10">
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}