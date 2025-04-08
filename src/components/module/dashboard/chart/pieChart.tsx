"use client"

import { Label, Pie, PieChart, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useMemo } from "react"

type TChartData = {
  name: string,
  value: number
}

// Custom colors for statuses
const STATUS_COLORS: Record<string, string> = {
  pending: "#facc15",        // yellow-400
  "in-progress": "#60a5fa",  // blue-400
  completed: "#4ade80",      // green-400
  cancelled: "#f87171",      // red-400
  delivered: "#66BB6A",
  other: "hsl(var(--chart-5))",
}


const chartConfig: ChartConfig = {
  orders: {
    label: "Total Orders",
  },
};


export function OrderStatusChart({ data }: { data: TChartData[] }) {
  const totalOrders = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.value, 0)
  }, [data])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Order Status Overview</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-row-reverse pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] min-w-[400px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={STATUS_COLORS[entry.name] || STATUS_COLORS.other}
                />
              ))}

              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalOrders}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Orders
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="mt-4 grid grid-cols-2 gap-4">
          {data.map((entry, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: STATUS_COLORS[entry.name] || STATUS_COLORS.other }}
              />
              <div className="text-sm text-muted-foreground">
                {entry.name.charAt(0).toUpperCase() + entry.name.slice(1)}:{" "}
                <span className="text-foreground font-medium">{entry.value}</span>
              </div>
            </div>
          ))}
        </div>

      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
        Total orders distributed by their progress.
        </div>
      </CardFooter>
    </Card>
  )
}
