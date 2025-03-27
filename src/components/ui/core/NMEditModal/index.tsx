'use client'

import { PenSquare } from "lucide-react"
import { Button } from "../../button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../../dialog"
import { Input } from "../../input"
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../form"
import { updateUserEmail, updateUserName } from "@/service/profile"
import { toast } from "sonner"
import { useUser } from "@/context/UserContext"
import { getCurrentUser } from "@/service/AuthService"

type IEditProps = {
    field: string;
    defaultValue: string | undefined;
    lable: string;
}

export function EditModal({ field, defaultValue, lable }: IEditProps) {

    const { setUser } = useUser();
    const form = useForm();
    const { formState: { isSubmitting } } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
        try {
            let res;
            if (data.name) {
                console.log('name');
                res = await updateUserName(data);
            }
            else if (data.email) {
                console.log('email');
                res = await updateUserEmail(data);
            }
            console.log(res);

            if (!res.success) toast.error(res.message);
            if (res.success) {
                toast.success(res.message);
                const user = await getCurrentUser();
                setUser(user);
            }

        } catch (error) {
            console.error(error)
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><PenSquare /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="items-center gap-4">
                        <FormProvider {...form} >
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">


                                <FormField
                                    control={form.control}
                                    name={field}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{lable}</FormLabel>
                                            <FormControl>
                                                <Input {...field} value={field.value || ''} placeholder={defaultValue || ''} className="w-full" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    className="mt-5 w-full cursor-pointer"
                                    type="submit">{isSubmitting ? 'Updating....' : 'Update'}</Button>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
