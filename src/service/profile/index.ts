'use server'

import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form";


export const updateUserName = async (payload: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/update-name`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: (await cookies()).get('accessToken')!.value
            },
            body: JSON.stringify(payload)
        });

        const result = await res.json();

        if (result.success) {
            (await cookies()).set('accessToken', result.data)
        }


        return result;
    } catch (err: unknown) {
        console.error(err)
    }
};



export const updateUserEmail = async (payload: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/update-email`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: (await cookies()).get('accessToken')!.value
            },
            body: JSON.stringify(payload)
        });

        const result = await res.json();

        if (result.success) {
            (await cookies()).set('accessToken', result.data)
        }


        return result;
    } catch (err: unknown) {
        console.error(err)
    }
};


export const updateUserPassword = async (payload: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/update-password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: (await cookies()).get('accessToken')!.value
            },
            body: JSON.stringify(payload)
        });

        return res.json();
    } catch (err: unknown) {
        console.error(err)
    }
};