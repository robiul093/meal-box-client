'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { TOrder } from '@/types/order';
import CustomerOrderTable from '@/components/module/order/CustomerOrderTable';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function CustomerOrdersPage() {
    const [orders, setOrders] = useState<TOrder[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const token = Cookies.get('accessToken');

    const getCustomerOrders = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/customers/orders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token as string,
                },
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => null);
                toast.error(errorData?.message || `Error ${res.status}: ${res.statusText}`);
                throw new Error(errorData?.message || `Request failed with status ${res.status}`);
            }

            const result = await res.json();
            setOrders(result.data);
        } catch (err: unknown) {
            let errorMessage = 'Failed to fetch orders';
            if (err instanceof Error) {
                errorMessage = err.message;
            }
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        getCustomerOrders();
    }, [getCustomerOrders]); // ✅ No unnecessary semicolon

    console.log(orders);

    return (
        <div>
            {loading && <div className="text-center text-4xl mt-5">Loading...</div>}
            {error && <p className="text-red-500">Error: {error}</p>}

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">No</TableHead>
                        <TableHead></TableHead>
                        <TableHead>Meal Name</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-right">Total Price</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {orders?.map((order: TOrder, idx: number) => (
                        <CustomerOrderTable key={idx} order={order} idx={idx} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
