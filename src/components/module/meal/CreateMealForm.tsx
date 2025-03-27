'use client'

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
// import { regestationSchema } from "./registerValidation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { createMeal } from "@/service/Meal";


export default function CreateMealForm() {

    const router = useRouter();
    const form = useForm({
        // resolver: zodResolver(regestationSchema)
    });


    const { formState: { isSubmitting } } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const category = data.ingredients.split(',').map((item: string) => item.trim());

        const mealData = {
            name: data?.name,
            description: data?.description,
            image: data?.image,
            price: Number(data?.price),
            dietaryCategory: data?.dietaryCategory,
            ingredients: category,
        }


        try {
            const res = await createMeal(mealData);
            if (res?.success) {
                toast.success(res?.message);
                router.push('/')
            }
            else {
                toast.error(res?.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="border-2 rounded-2xl max-w-[60%] w-full mx-auto p-5 mt-10">
            <div className="flex items-center space-x-4 mb-4">
                {/* <Logo /> */}
                <div className="mb-5 mx-auto px-5 text-center">
                    <h1 className="text-xl font-semibold">Create a New Meal</h1>
                    <p className="font-extralight text-base text-gray-600 px-5 pb-2">
                        Add a new meal with details like ingredients and pricing.
                    </p>
                    <Separator />
                </div>
            </div>

            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                    <FormField
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
                        control={form.control}
                        name="ingredients"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ingredients <br /> 
                                <span className="text-[10px] text-red-400">(Saparate ingredients by ,)</span>
                                </FormLabel>
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
                        type="submit">{isSubmitting ? 'Creating...' : 'Create Meal'}</Button>
                </form>
            </Form>
        </div>
    )
}