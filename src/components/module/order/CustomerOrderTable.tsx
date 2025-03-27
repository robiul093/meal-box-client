import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { TOrder } from '@/types/order';

type Props = {
    order: TOrder;
    idx: number;
};

export default function CustomerOrderTable({ order, idx }: Props) {
    const status = order.status;
    const statusColor = {
        pending: "bg-yellow-100 text-yellow-700",
        "in-progress": "bg-blue-100 text-blue-700",
        completed: "bg-green-100 text-green-700",
        cancelled: "bg-red-100 text-red-700",
    }

    return (
        <>
            {order.mealSelection.map((meal, mealIdx) => (
                <TableRow key={meal._id}>
                    <TableCell className="font-medium">{idx + 1}.{mealIdx + 1}</TableCell>
                    <TableCell>
                        {/* <img src={meal.mealId.image || '/placeholder.jpg'} alt={meal.mealId.name} className="w-12 h-12 rounded" /> */}
                    </TableCell>
                    <TableCell>{meal.mealId.name}</TableCell>
                    <TableCell>{meal.quantity}</TableCell>
                    <TableCell className="text-right">${(meal.mealId.price * meal.quantity).toFixed(2)}</TableCell>
                    <TableCell className="text-center">
                        <span className={`px-2 py-1 rounded text-white ${statusColor[status] || "bg-gray-100 text-gray-700"}`}>
                            {order.status}
                        </span>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
}
