'use client'

import { Progress } from '@/components/ui/progress';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import Cookies from "js-cookie";
import OrderTable from '@/components/module/order/OrderTable';
import { TOrder } from '@/types/order';
import { getAllOrders } from '@/service/Order';

export default function AllOrder() {

    // const { user } = useUser();
    const [orders, setOrders] = useState<TOrder[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [orderUpdated, setOrderUpdated] = useState(false);
    const token = Cookies.get('accessToken')

    useEffect(() => {
        const getOrder = async () => {
            const toastOrderId = 'orderId'
            const res = await getAllOrders();
            if (!res.success) {
                toast.error(res.message, { id: toastOrderId })
                setError(res.message)
            }
            if (res.success) {
                setOrders(res.data)
                setLoading(false)
            }
            console.log(res)
            // try {
            //     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/orders`, {
            //         method: 'GET',
            //         headers: {
            //             'Authorization': token as string
            //         },
            //     });

            //     if (!res.ok) {
            //         const errorData = await res.clone().json().catch(() => null);
            //         toast.error(errorData.message || `Error ${res.status}: ${res.statusText}`, { id: toastOrderId })
            //     };

            //     if (res.ok) {
            //         const data = await res.clone().json().catch(() => null);
            //         toast.success(data.message || ` ${res.status}: ${res.statusText}`, { id: toastOrderId })
            //     }

            //     const result = await res.json();


            //     setOrders(result?.data)

            // } catch (err: unknown) {
            //     let errorMessage = "An unexpected error occurred";

            //     if (err instanceof Error) {
            //         errorMessage = err.message;
            //     }
            //     setError(errorMessage)
            // } finally {
            //     setLoading(false)
            // }
        };

        getOrder()
    }, [orderUpdated, token])

    // console.log(orders)
    if (loading) return <div>Loading...<Progress value={33} className='w-[50%] mx-auto' /></div>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2 className='text-2xl font-semibold my-4 border-b-2 pb-3 text-black/80'>Manage Your Order:</h2>
            {
                orders?.map((order: TOrder, idx: number) => <OrderTable
                    key={idx}
                    order={order}
                    idx={idx}
                    setOrderUpdated={setOrderUpdated}
                />)
            }
        </div>
    )
}
