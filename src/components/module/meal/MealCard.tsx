import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { TMeal } from "@/types"
import { Pencil } from "lucide-react"
import Link from "next/link"

export function CardWithForm({ item }: { item: TMeal }) {
    // console.log(item)
    const imageUrl =
        item?.image && item.image.startsWith("http")
            ? item.image
            : "https://cdn-icons-png.flaticon.com/128/739/739249.png";

    return (
        <Card className="w-[]">
            <CardHeader>
                <Image src={imageUrl} width={400} height={150} className="h-[250px] mx-auto" alt="meal img" />
            </CardHeader>
            <CardContent>
                <div className="flex items-baseline gap-3">
                    {/* <h2 className="text-black"> Name: </h2> */}
                    <CardTitle className="mt-3 mb-3">{item?.name}</CardTitle>
                </div>
                <div className="flex items-baseline gap-3">
                    <h2 className="text-black">Description: </h2>
                    <CardDescription> {item?.description} </CardDescription>
                </div>

                <div className="flex justify-between">
                    <div className="flex gap-5 my-5 items-center">
                        <h2>Price: </h2>
                        <p className="bg-orange-400 text-white p-1 rounded-[8px]"> {item?.price} </p>
                    </div>

                    <div className="flex gap-5 my-5">
                        <h2>Available: </h2>
                        <p className={item.available ? 'text-green-500' : 'text-red-500'}> {item?.available ? 'Available' : 'NotAvailable'} </p>
                    </div>
                </div>

                <div>
                    <h2>Ingredients: <span className="text-green-300">{item?.ingredients.map((item: string) => `${item}, `)}</span></h2>
                </div>
            </CardContent>
            <CardFooter className="">
                <Link className="w-full h-10" href={`/provider/meals/update/${item._id}`}>
                    <Button className="w-full h-10">
                        <Pencil /> Update Meal
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
