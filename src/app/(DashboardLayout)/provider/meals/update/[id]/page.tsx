'use client'


import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea";
import { TMeal } from '@/types';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import { Separator } from '@/components/ui/separator';
import { toast } from "sonner";
import { getSingleMeal, updateMeal } from "@/service/Meal";

export default function DynamicMealUpdate() {
    const params = useParams();
    const id = params?.id as string;
    const [meal, setMeal] = useState<TMeal | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const token = Cookies.get('accessToken')

    const form = useForm({
    });

    const { formState: { isSubmitting } } = form;


    useEffect(() => {
        const fetchMeal = async () => {
            const { data } = await getSingleMeal(id);
            console.log(id, data);
            setMeal(data)
            setLoading(false)
            // try {
            //     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/menu/${id}`,
            //         {
            //             method: 'GET',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //                 'Authorization': token as string
            //                 // (await cookies()).get('accessToken')!.value
            //             },
            //         },
            //     )
            //     const result = await res.json();

            //     setMeal(result?.data);
            // } catch (err: unknown) {
            //     let errorMessage = "An unexpected error occurred";

            //     if (err instanceof Error) {
            //         errorMessage = err.message;
            //     }

            //     setError(errorMessage);
            // } finally {
            //     setLoading(false);
            // }
        }

        fetchMeal();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    const onSubmit: SubmitHandler<FieldValues> = async (updatedData) => {

        const res = await updateMeal(id, updatedData);
        toast.success(res.message)

        // const updateToast = 'updateToast'
        // try {
        //     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/menu/${id}`, {
        //         method: 'PATCH',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': token as string
        //         },
        //         body: JSON.stringify(data)
        //     });

        //     if (!res.ok) {
        //         const errorData = await res.clone().json().catch(() => null);
        //         console.log(errorData)
        //         toast.error(errorData.message || `Error ${res.status}: ${res.statusText}`, { id: updateToast })
        //     };

        //     if (res.ok) {
        //         const data = await res.clone().json().catch(() => null);
        //         toast.success(data.message || ` ${res.status}: ${res.statusText}`, { id: updateToast })
        //     }

        //     const result = await res.json();

        //     return result
        // } catch (err: unknown) {
        //     let errorMessage = "An unexpected error occurred";

        //     if (err instanceof Error) {
        //         errorMessage = err.message;
        //     }
        //     toast.error(errorMessage || "Something went wrong!", { id: updateToast });
        //     return Error(errorMessage)
        // }
    }

    return (
        <div>
            <div className="border-2 rounded-2xl max-w-[60%] w-full mx-auto p-5 mt-10">
                <div className="flex items-center space-x-4 mb-4">
                    {/* <Logo /> */}
                    <div className="mb-5 mx-auto px-5 text-center">
                        <h1 className="text-xl font-semibold">Update Meal Details</h1>
                        <p className="font-extralight text-base text-gray-600 px-5 pb-2">
                            Modify meal information, ingredients, and pricing effortlessly.
                        </p>
                        <Separator />
                    </div>
                </div>

                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <FormField
                            defaultValue={meal?.name}
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Meal Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            defaultValue={meal?.description}
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            defaultValue={meal?.image}
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value || ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-between">
                            <FormField
                                defaultValue={meal?.price}
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input {...field} value={field.value || ''} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                defaultValue={meal?.dietaryCategory}
                                control={form.control}
                                name="dietaryCategory"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Dietary Category</FormLabel>
                                        <FormControl>
                                            <Input {...field} value={field.value || ''} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                        </div>

                        <FormField
                            defaultValue={meal?.ingredients}
                            control={form.control}
                            name="ingredients"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ingredients <br /> <span className="text-[10px] text-red-400">(Saparate ingredients by &#39,&#39)</span></FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="h-36"
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />


                        <Button
                            className="mt-5 w-full cursor-pointer"
                            type="submit">{isSubmitting ? 'Updating...' : 'Update Meal'}</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
