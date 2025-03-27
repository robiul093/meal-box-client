import { PenSquare } from "lucide-react";
import { Button } from "../../button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../dialog";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../form";
import { Input } from "../../input";
import { updateUserPassword } from "@/service/profile";
import { toast } from "sonner";



export default function ChangePasswordModal() {

    const form = useForm();
    const { formState: { isSubmitting } } = form;
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        
        const res = await updateUserPassword(data);
        if (!res.success) toast.error(res.message);
        if (res.success) {
            toast.success(res.message)
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
                                    name="currentPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current Password</FormLabel>
                                            <FormControl>
                                                <Input {...field} value={field.value || ''} className="w-full" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Password</FormLabel>
                                            <FormControl>
                                                <Input {...field} value={field.value || ''} className="w-full" />
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
