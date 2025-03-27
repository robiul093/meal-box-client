import React from 'react'
import logo from '../../../../public/logoImg.png'
import Image from 'next/image'

export default function Logo() {
    return (
        <div className="flex items-center space-x-2">

            <Image
                src={logo}
                alt="MealBox Logo"
                width={50}
                height={50}
                priority
            />
            {/* Logo Text */}
            {/* <span className="text-xl font-bold text-gray-800">MealBox</span> */}
        </div>
    )
}
