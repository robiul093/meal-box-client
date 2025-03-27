'use server'

import { TMeal } from "@/types"
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";


export const createMeal = async (mealData: TMeal) => {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/menu`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': (await cookies()).get('accessToken')!.value,
            },
            credentials: 'include',
            body: JSON.stringify(mealData)
        });
        revalidateTag('Meal')
        const result = await res.json();

        return result;
    } catch (err: unknown) {
        let errorMessage = "An unexpected error occurred";

        if (err instanceof Error) {
            errorMessage = err.message;
        }
        return Error(errorMessage)
    }
};


export const getProviderMeal = async () => {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/menu`, {
            method: 'GET',
            headers: {
                'Authorization': (await cookies()).get('accessToken')!.value,
            },

            next: {
                tags: ["Meal"]
            }
        });

        const data = await res.json();

        return data;
    } catch (err: unknown) {
        console.error("Error fetching meals:", err);
        return [];
    }
};


export const getSingleMeal = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/menu/${id}`, {
            headers: {
                Authorization: (await cookies()).get('accessToken')!.value
            },

            next: {
                tags: ["Meal"]
            }
        });
        const data = await res.json();

        return data;
    } catch (err: unknown) {
        console.error('Error fetching meal:', err)
        return [];
    }
};


export const updateMeal = async (id: string, updateData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/menu/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': (await cookies()).get('accessToken')!.value
            },
            body: JSON.stringify(updateData)
        });

        revalidateTag('Meal')
        const data = res.json()

        return data
    } catch (err: unknown) {
        console.error(err)
    }
}