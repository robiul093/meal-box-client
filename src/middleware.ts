import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./service/AuthService";

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
                new URL(`http://localhost:3000/login?redirectPath=${pathname}`, request.url)
            )
        }
    }
};


export const config = {
    matcher: [
        '/login',
        '/profile',
        '/customer',
        // '/customer:/',
        '/provider',
        // '/provider:/'
    ]
}