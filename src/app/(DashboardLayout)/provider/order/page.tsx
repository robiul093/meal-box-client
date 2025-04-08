'use client'

import { Progress } from '@/components/ui/progress';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import Cookies from "js-cookie";
import { TOrder } from '@/types/order';
import { getAllOrders, orderResponse } from '@/service/Order';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AllOrder() {

    // const { user } = useUser();
    const [orders, setOrders] = useState<TOrder[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [orderUpdated, setOrderUpdated] = useState(false);
    const token = Cookies.get('accessToken');

    const statusColor = {
        pending: "bg-yellow-300 text-yellow-900",
        "in-progress": "bg-blue-400 text-blue-900",
        delivered: "bg-green-400 text-green-900",
        cancelled: "bg-red-400 text-red-900",
    }

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
        };

        getOrder()
    }, [orderUpdated, token]);


    const handleStatusChange = async (id: string, value: string) => {
        console.log(id, value);
        const payload = {
            orderId: id,
            status: value
        }
        const toastId = 'toastid'
        const res = await orderResponse(payload);
        setOrderUpdated(pre => !pre);
        if (!res.success) {
            toast.error(res.message, { id: toastId });
        };
        if (res.success) {
            toast.success(res.message)
        }
    }

    // console.log(orders)
    if (loading) return <div>Loading...<Progress value={33} className='w-[50%] mx-auto' /></div>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2 className='text-2xl font-semibold my-4 border-b-2 pb-3 text-black/80'>Manage Your Order:</h2>

            <div>
                <Table className='border rounded-md'>
                    {/* <TableCaption>List of customer orders.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No</TableHead>
                            <TableHead>Customer Name</TableHead>
                            <TableHead>Meal Name</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead className="text-right">Total Price</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            orders?.map((order, idx) =>
                                order.mealSelection.map((meal, mealIdx) => <TableRow className='' key={meal._id}>
                                    <TableCell className="font-medium">{idx + 1}.{mealIdx + 1}</TableCell>
                                    <TableCell>{order?.customer?.name || "N/A"}</TableCell>
                                    <TableCell>{meal?.mealId?.name || "Unknown Meal"}</TableCell>
                                    <TableCell>{meal?.quantity}</TableCell>
                                    <TableCell className="text-right">${order?.totalPrice.toFixed(2)}</TableCell>
                                    <TableCell className={`text-center font-semibold ${statusColor[order.status] || "bg-gray-100 text-gray-700"}`}>
                                        <select
                                            value={order?.status}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                handleStatusChange(order._id, (e.target as HTMLSelectElement).value)
                                            }}
                                            name="" id=""
                                            className="px-2 py-1 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                                            <option value="pending">Pending</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </TableCell>
                                </TableRow>))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
