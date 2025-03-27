'use server'

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form"
import { jwtDecode } from "jwt-decode";


export const loginUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
            credentials: 'include',
        });

        const result = await res.json();

        if (result.success) {
            (await cookies()).set('accessToken', result.data)
        }

        console.log(result)

        return result;
    } catch (err: unknown) {
        let errorMessage = "An unexpected error occurred";

        if (err instanceof Error) {
            errorMessage = err.message;
        }
        return Error(errorMessage)
    }
};



export const registerUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/create-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const result = await res.json();

        return result
    } catch (err: unknown) {
        let errorMessage = "An unexpected error occurred";

        if (err instanceof Error) {
            errorMessage = err.message;
        }
        return Error(errorMessage)
    }
};



export const getCurrentUser = async () => {
    const accessToken = (await cookies()).get('accessToken')?.value;
    let decodedData = null;

    if (accessToken) {
        decodedData = await jwtDecode(accessToken);

        return decodedData;
    }
    else {
        return null;
    }
};


export const logout = async () => {
    (await cookies()).delete('accessToken');
};