import Navbar from '@/components/shared/Navbar'
import React, { ReactNode } from 'react'

export default function ComminLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Navbar></Navbar>
            <main>{children}</main>
        </div>
    )
}
