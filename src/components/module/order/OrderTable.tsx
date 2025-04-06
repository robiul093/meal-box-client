// 'use client'

// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
// import { orderResponse } from '@/service/Order';
// import { TOrder } from '@/types/order'
// import React, { Dispatch, SetStateAction } from 'react'
// import { toast } from 'sonner';

// export default function OrderTable({ order, idx, setOrderUpdated }: { order: TOrder, idx: number, setOrderUpdated: Dispatch<SetStateAction<boolean>> }) {

//     const status = order.status;
//     const statusColor = {
//         pending: "bg-yellow-100 text-yellow-700",
//         "in-progress": "bg-blue-100 text-blue-700",
//         completed: "bg-green-100 text-green-700",
//         cancelled: "bg-red-100 text-red-700",
//     }

//     const handleStatusChange = async (id: string, value: string) => {
//         console.log(id, value);
//         const payload = {
//             orderId: id,
//             status: value
//         }
//         const toastId = 'toastid'
//         const res = await orderResponse(payload);
//         setOrderUpdated(pre => !pre);
//         if (!res.success) {
//             toast.error(res.message, { id: toastId });
//         };
//         if (res.success) {
//             toast.success(res.message)
//         }
//     }


//     return (
//         <div>
//             {/* <Table>
            
//             <TableHeader>
//                 <TableRow>
//                     <TableHead className="w-[100px]">No</TableHead>
//                     <TableHead>Customer Name</TableHead>
//                     <TableHead>Meal Name</TableHead>
//                     <TableHead>Quantity</TableHead>
//                     <TableHead className="text-right">Total Price</TableHead>
//                     <TableHead className="text-center">Status</TableHead>
//                 </TableRow>
//             </TableHeader> */}
//             {/* <TableBody className='space-y-2'> */}
//                 {order.mealSelection.map((meal, mealIdx) => (
//                     <TableRow className='space-y-2' key={meal._id}>
//                         <TableCell className="font-medium">{idx + 1}.{mealIdx + 1}</TableCell>
//                         <TableCell>{order?.customer?.name || "N/A"}</TableCell>
//                         <TableCell>{meal?.mealId?.name || "Unknown Meal"}</TableCell>
//                         <TableCell>{meal?.quantity}</TableCell>
//                         <TableCell className="text-right">${order?.totalPrice.toFixed(2)}</TableCell>
//                         <TableCell className={`text-center ${statusColor[status] || "bg-gray-100 text-gray-700"}`}>
//                             <select
//                                 value={order?.status}
//                                 onChange={(e) => {
//                                     e.stopPropagation();
//                                     handleStatusChange(order._id, (e.target as HTMLSelectElement).value)
//                                 }}
//                                 name="" id=""
//                                 className="px-2 py-1 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
//                                 <option value="pending">Pending</option>
//                                 <option value="in-progress">In Progress</option>
//                                 <option value="completed">Completed</option>
//                                 <option value="cancelled">Cancelled</option>
//                             </select>
//                         </TableCell>
//                     </TableRow>
//                 ))}
//             {/* </TableBody> */}
//             {/* </Table > */}
//         </div>
//     )
// }
