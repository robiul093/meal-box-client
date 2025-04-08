
import { getAllOrders, getPopularMeal } from "@/service/Order";
import { TOrder } from "@/types/order";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


type OrderStatus = "pending" | "in-progress" | "delivered" | "cancelled";

export default async function ProviderHomePage() {

  const { data: orders } = await getAllOrders();


  const { data: popularMeals } = await getPopularMeal();
  const popularMeal = popularMeals[0];

  const statusColor = {
    pending: "bg-yellow-200 text-yellow-700",
    "in-progress": "bg-blue-200 text-blue-700",
    delivered: "bg-green-200 text-green-700",
    cancelled: "bg-red-200 text-red-700",
  }
  const statusCounts: Record<OrderStatus, number> = orders?.reduce(
    (acc: Record<OrderStatus, number>, order: TOrder) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    },
    {
      pending: 0,
      "in-progress": 0,
      delivered: 0,
      cancelled: 0,
    }
  );

  return (
    <div>
      <div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted p-4">
            <div className="flex gap-4 mb-2 border-b-2 pb-2">
              <h2>Total Orders</h2>
              <p>{orders?.length}</p>
            </div>
            <div className='grid grid-cols-auto-fit gap-4 w-full'>
              <div className='flex gap-3'>
                <h3>Pending :</h3>
                <p>{statusCounts?.pending}</p>
              </div>
              <div className='flex gap-3'>
                <h3>In Progress :</h3>
                <p>{statusCounts?.["in-progress"]}</p>
              </div>
              <div className='flex gap-3'>
                <h3>Delivered :</h3>
                <p>{statusCounts?.delivered}</p>
              </div>
            </div>
          </div>
          <div className="aspect-video rounded-xl bg-muted p-4" >
            <div className="flex gap-4 mb-2 border-b-2 pb-2">
              <h2>Popular Meal</h2>
              {/* <p>{orders?.length}</p> */}
            </div>

            <div>
              <div className='grid grid-cols-auto-fit gap-4 w-full'>
                <div className='flex gap-3'>
                  <h3>Name :</h3>
                  <p>{popularMeal?.name}</p>
                </div>
                <div className='flex gap-3'>
                  <h3>Total Order :</h3>
                  <p>{popularMeal?.totalOrdered}</p>
                </div>
                <div className='flex gap-3'>
                  <h3>Price :</h3>
                  <p>{popularMeal?.price}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="aspect-video rounded-xl bg-muted p-4" >
            <h2 className='mb-6'>Customer Feedback</h2>
            <div>
              <Rating value={3.7} readOnly />
            </div>
          </div>
        </div>
        <div className=" rounded-xl bg-muted mt-4" >
          <Table className='border rounded-xl'>
            {/* <TableCaption>List of customer orders.</TableCaption> */}
            <TableHeader>
              <TableRow >
                <TableHead>Order Id</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Meal Name</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                orders?.map((order: TOrder) =>
                  order.mealSelection.map((meal) => <TableRow className='' key={meal._id}>
                    <TableCell className="font-medium">{meal._id}</TableCell>
                    <TableCell>{order?.customer?.name || "N/A"}</TableCell>
                    <TableCell>{meal?.mealId?.name || "Unknown Meal"}</TableCell>
                    <TableCell className={`text-center font-semibold ${statusColor[order.status] || "bg-gray-100 text-gray-700"}`}>
                    {order?.status}
                    </TableCell>
                  </TableRow>))
              }
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
