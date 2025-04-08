import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { TMeal } from '@/types'
import React from 'react'
import { toast } from 'sonner'
import Cookies from 'js-cookie'
import { useUser } from '@/context/UserContext'
import Image from 'next/image'

export default function MenuCard({ menu }: { menu: TMeal }) {

    const { user } = useUser();
    const token = Cookies.get('accessToken');

    const handleOrder = async (meal: TMeal) => {
        const toastId = 'toastId'

        const orderData = {
            customer: user?.userId,
            provider: meal.provider,
            mealSelection: [
                {
                    mealId: meal._id,
                    quantity: 1
                },
            ],
            dietaryPreferences: meal.dietaryCategory,
            totalPrice: meal.price,
            status: 'pending'
        };

        try {

            if (!token) {
                throw new Error('Only register customer can order');
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/customers/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token as string,
                },
                body: JSON.stringify(orderData)
            });

            if (!res.ok) {
                const errorData = await res.clone().json().catch(() => null);
                toast.error(errorData.message || `Error ${res.status}: ${res.statusText}`, { id: toastId })
            };

            if (res.ok) {
                const data = await res.clone().json().catch(() => null);
                toast.success(data.message || ` ${res.status}: ${res.statusText}`, { id: toastId })
            }
        } catch (err: unknown) {
            let errorMessage = "An unexpected error occurred";

            if (err instanceof Error) {
                errorMessage = err.message;
            }
            toast.error(errorMessage || 'Failer to create order')
        }

    }

    return (
        <Card className="w-[350px]">

            <CardContent>
                <Image
                    src={menu?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtGM4EgNZJyeptuJbnf7II20MaUutufdhUqw&s"}
                    alt="foodCard"
                    width={500}
                    height={300}
                    className="w-full"
                    objectFit="cover"
                />
            </CardContent>
            <CardHeader>
                <CardTitle>{menu?.name}</CardTitle>
                <CardDescription>{menu?.description}</CardDescription>
                <p className='text-[#60ba62] text-xl'><span className='font-semibold text-lg'>$</span>{menu?.price}</p>
            </CardHeader>
            <CardFooter className="w-full">
                <button
                    onClick={() => handleOrder(menu)}
                    className='btn w-full border-1 border-[#60ba62] rounded-none py-3 text-base text-[#60ba62] font-semibold uppercase bg-white cursor-pointer'>Order Now</button>
            </CardFooter>
        </Card>
    )
}
