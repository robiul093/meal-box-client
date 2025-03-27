'use client'

import MenuCard from '@/components/module/meal/MenuCard';
import { Separator } from '@/components/ui/separator'
import { TMeal } from '@/types';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

export default function MenuPage() {

    const [menus, setMenus] = useState<TMeal[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const menuToast = 'menuToast';
    useEffect(() => {
        const getAllMenu = async () => {
            setLoading(true);


            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/customers/meal`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    let errorData;
                    try {
                        errorData = await res.json();
                    } catch {
                        errorData = null;
                    }
                    toast.error(errorData?.message || `Error ${res.status}: ${res.statusText}`, { id: menuToast });
                    throw new Error(errorData?.message || `Request failed with status ${res.status}`);
                }


                // if (res.ok) {
                //     const data = await res.clone().json().catch(() => null);
                //     toast.success(data.message || ` ${res.status}: ${res.statusText}`, { id: menuToast })
                // };

                const result = await res.json();
                setMenus(result?.data);

            } catch (err: unknown) {
                let errorMessage = "Failed to fetch orders";

                if (err instanceof Error) {
                    errorMessage = err.message;
                }

                setError(errorMessage);

            } finally {
                setLoading(false)
            }
        };

        getAllMenu();
    }, []);

    // console.log(menus)
    return (
        <div className='w-[90%] mx-auto'>
            <div >
                <h2 className='text-2xl text-[#484848] uppercase mt-5 mb-3 mx-auto text-center font-semibold'>SHOP</h2>
                <Separator />
            </div>

            <div>
                <div className='md:flex justify-between items-center my-10'>
                    <h2 className='text-lg text-[#484848] font-semibold'>Showing all {menus?.length} result</h2>
                    <select defaultValue={'Default sorting'} className='w-60 py-3 pl-5 outline outline-[#60ba62] text-[#60ba62] text-[16px]'>
                        <option value="latest">Default sorting</option>
                        <option value="latest">Sort by latest</option>
                        <option value="rating">Sort by average rating</option>
                        <option value="populatery">Sort by populatery</option>
                    </select>
                </div>
            </div>

            <div className='md:grid grid-cols-3 justify-between items-center gap-5'>
                {
                    loading && <div className='text-center text-4xl mt-5'>Loading...</div>
                }
                {
                    error && <p>Error: {error}</p>
                }
                {
                    menus?.map((menu, idx: number) => <MenuCard key={idx} menu={menu} />)
                }
            </div>
        </div>
    )
}
