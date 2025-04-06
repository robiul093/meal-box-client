'use client'

import { useUser } from "@/context/UserContext";
import { KeyRound, Mail, UserRound } from "lucide-react";
import Image from "next/image";
import profile from "../../assets/profile.png";
import { EditModal } from "@/components/ui/core/NMEditModal";
import ChangePasswordModal from "@/components/ui/core/NMEditModal/ChangePasswordModal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Profile() {
    const { user } = useUser();

    return (
        <div className="bg-[#e0e2e8] flex justify-center items-center md:py-10">
            <div className="md:w-[500px] mx-auto border-2 border-white rounded-2xl p-3">
                <div className="text-center">
                    <Image
                        src={profile}
                        width={100}
                        height={100}
                        alt="profile"
                        className="bg-gray-400 rounded-full mx-auto z-0" />
                    <h2 className="text-2xl font-semibold mt-2 mb-2">{user?.name}</h2>
                    <p className="font-medium text-[#acacac]">Role: {user?.role}</p>
                </div>

                <div className="border-2 border-white m-2 rounded-2xl p-3">
                    <h2 className="text-xl font-semibold border-b-2 pb-2 border-white">Edit Your Profile:</h2>

                    <div className="flex justify-between items-center py-5 border-b-2 border-white">
                        <div className="flex gap-3 items-center ">
                            <UserRound />
                            <p className="text-xl">{user?.name}</p>
                        </div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <EditModal field="name" defaultValue={user?.name} lable="Name" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Edit your name</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                    </div>

                    <div className="flex justify-between items-center py-5 border-b-2 border-white">
                        <div className="flex gap-3 items-center ">
                            <Mail />
                            <p className="text-lg">{user?.email}</p>
                        </div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <EditModal field="email" defaultValue={user?.email} lable="Email" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Edit your email</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                    </div>

                    <div className="flex justify-between items-center py-5 border-white">
                        <div className="flex gap-3 items-center ">
                            <KeyRound />
                            <p className="text-lg">Change Your password</p>
                        </div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <ChangePasswordModal />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Change password</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                </div>
            </div>
        </div>
    )
}
