import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./service/AuthService";

const protectedRoutes = [
    { path: '/customer', role: 'customer' },
    { path: '/provider', role: 'provider' },
    { path: '/admin', role: 'admin' },
]
const authRoute = ['/login', '/register'];

export const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        if (authRoute.includes(pathname)) {
            return NextResponse.next();
        }
        else {
            return NextResponse.redirect(
                new URL(`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/login?redirectPath=${pathname}`, request.url)
            )
        }
    }
    else {
        for(const route of protectedRoutes){
            if(pathname.startsWith(route.path) && currentUser.role !== route.role){
                return NextResponse.redirect(new URL('/login', request.url))
            }
        }
        return NextResponse.next();
    }
};


export const config = {
    matcher: [
        '/login',
        '/profile',
        '/customer/:path*',
        '/provider/:path*',
    ]
}