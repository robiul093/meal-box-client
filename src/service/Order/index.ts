'use server'

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


export const getAllOrders = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/orders`, {
            method: 'GET',
            headers: {
                Authorization: (await cookies()).get('accessToken')!.value,
            },
            next: {
                tags: ["Order"]
            }
        });

        return res.json()
    } catch (err: unknown) {
        console.error(err)
    }
};


export const orderResponse = async (payload: { orderId: string, status: string }) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/response`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: (await cookies()).get('accessToken')!.value,
            },
            body: JSON.stringify(payload)
        });

        revalidateTag('Order')
        return res.json();
    } catch (err: unknown) {
        console.error(err)
    }
};



export const getPopularMeal = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/popular-meal`, {
            method: 'GET',
            headers: {
                Authorization: (await cookies()).get('accessToken')!.value
            },

            next: {
                tags: ["Order"]
            }
        });

        return res.json();
    } catch (err: unknown) {
        console.error(err)
    }
};



export const getCustomerAllOrder = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/customers/orders`,{
            method: 'GET',
            headers: {
                Authorization: (await cookies()).get('accessToken')!.value
            },
            
            next: {
                tags: ["Order"]
            }

        });

        return res.json();
    } catch (err: unknown) {
        console.error(err)
    }
}