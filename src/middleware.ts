import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export  function middleware(request: NextRequest) {

    const token = request.cookies.get('token')?.value
    const signURL = new URL('/login', request.url)
    const homeURL = new URL('/user/home', request.url)


    if (!token) {
        if (request.nextUrl.pathname === '/login') {
            return NextResponse.next()
        }

        return NextResponse.redirect(signURL)
    }
    //--------------------------------------------------
  
        // api.get('/users/verifyuser', {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        // }).then().catch(() => {
            
        // })


    //--------------------------------------------------

    if (request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(homeURL)
    }

    if (request.nextUrl.pathname === '/') {
        return NextResponse.redirect(homeURL)
    }
}

export const config = {
    matcher: ['/login', '/user/:path*', '/']
}