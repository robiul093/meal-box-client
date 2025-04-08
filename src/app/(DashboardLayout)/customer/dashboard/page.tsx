import { OrderStatusChart } from "@/components/module/dashboard/chart/pieChart";
import { getCustomerAllOrder } from "@/service/Order"
import { TOrder } from "@/types/order";
import { CheckCircle, List, LoaderCircle } from "lucide-react";

type OrderStatus = "pending" | "in-progress" | "delivered" | "cancelled";

export default async function CustomerHomePage() {

  const pastStatuses = ['delivered', 'cancelled'];
  const activeStatuses = ['pending', 'in-progress'];

  const { data: orders } = await getCustomerAllOrder();
  const activeOrders = orders?.filter((order: TOrder) => activeStatuses.includes(order.status));
  const pastOrders = orders?.filter((order: TOrder) => pastStatuses.includes(order.status));

  const formatDatePretty = (isoDate: string) => {
    const date = new Date(isoDate);
    console.log('inside function', isoDate);

    const month = date.toLocaleString("en-US", { month: "long" })
    const day = date.getDate()
    const weekday = date.toLocaleString("en-US", { weekday: "long" })
    // const time = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })

    return `${month} ${day} (${weekday})`
  }

  const activeOrderDbDate = activeOrders[0]?.createdAt;
  const pastOrderDbDate = pastOrders[0]?.createdAt;
  // const 
  // const pastOrderDate = formatDatePretty(pastOrderDbDate)
  // console.log(pastOrderDbDate);


  // console.log(activeOrders, pastOrders);
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

  const chartData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }));




  return (
    <div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">

        {/* card --1 */}
        <div className="aspect-video rounded-xl p-4 shadow-md text-blue-800 bg-blue-200">
          <div className="flex gap-4 mb-2 border-b-2 border-b-blue-800 pb-2">
            <List />
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

        {/* card --2 */}
        <div className="aspect-video rounded-xl p-4 shadow-md text-yellow-800 bg-yellow-200" >
          <div className="flex gap-4 mb-2 border-b-2 border-b-yellow-800 pb-2">
            <LoaderCircle />
            <h2>Active Orders</h2>
            <p>{activeOrders?.length}</p>
          </div>

          <div className='grid grid-cols-auto-fit gap-4 w-full'>

            <div className='flex gap-3'>
              <h3>Last order placed :</h3>
              <p>{activeOrders.length ? formatDatePretty(activeOrderDbDate) : 'No order'}</p>
            </div>

            <div className='flex gap-3'>
              <h3>Last order status :</h3>
              <p>{pastOrders.length ? formatDatePretty(pastOrderDbDate) : 'No order'}</p>
            </div>

            {/* <div className='flex gap-3'>
              <h3>Delivered :</h3>
              <p>{statusCounts?.delivered}</p>
            </div> */}
          </div>
        </div>

        {/* card --3 */}
        <div className="aspect-video rounded-xl p-4 shadow-md text-green-800 bg-green-200" >
          <div className="flex gap-4 mb-2 border-b-2 border-b-green-800 pb-2">
            <CheckCircle />
            <h2>Completed Orders</h2>
            <p>{pastOrders?.length}</p>
          </div>

          <div className='grid grid-cols-auto-fit gap-4 w-full'>

            <div className='flex gap-3'>
              <h3>Last order placed :</h3>
              <p>{pastOrders.length ? formatDatePretty(pastOrderDbDate) : 'No order'}</p>
            </div>

            <div className='flex gap-3'>
              <h3>Last order status :</h3>
              <p>{pastOrders.length ? pastOrders[0].status : 'No order'}</p>
            </div>
          </div>
        </div>

      </div>
      <div className="min-h-[100vh] rounded-xl bg-muted mt-4" >
        <OrderStatusChart data={chartData} />
      </div>
    </div>
  )
}
