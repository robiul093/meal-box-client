'use client'

import { useUser } from "@/context/UserContext";
import { KeyRound, Mail, Mailbox, PenSquare, UserRound } from "lucide-react";
import Image from "next/image";
import profile from "../../assets/profile.png";
import { EditModal } from "@/components/ui/core/NMEditModal";

export default function Profile() {
    const { user } = useUser()
    console.log(user);

    return (
        <div className="bg-[#e0e2e8] h-screen flex justify-center items-center">
            <div className="w-[500px] mx-auto border-2 border-white rounded-2xl p-3">
                <div className="text-center">
                    <Image
                        src={profile}
                        width={100}
                        height={100}
                        alt="profile"
                        className="bg-gray-400 rounded-full mx-auto" />
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
                        <EditModal field="name" defaultValue={user?.name} lable="Name" />
                    </div>

                    <div className="flex justify-between items-center py-5 border-b-2 border-white">
                        <div className="flex gap-3 items-center ">
                            <Mail />
                            <p className="text-lg">{user?.email}</p>
                        </div>
                        <EditModal field="email" defaultValue={user?.email} lable="Email"  />
                    </div>

                    <div className="flex justify-between items-center py-5 border-white">
                        <div className="flex gap-3 items-center ">
                            <KeyRound />
                            <p className="text-lg">Change Your password</p>
                        </div>
                        <PenSquare />
                    </div>

                </div>
            </div>
        </div>
    )
}
