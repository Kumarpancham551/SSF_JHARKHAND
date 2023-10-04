import { NextResponse } from 'next/server';
import {NextRequest} from 'next/server';

 
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
   

   const authToken = request.cookies.get("authToken")?.value;

     if(request.nextUrl.pathname === "/api/login"){
      return ;
       }
       else{
        if(authToken){
           return NextResponse.next()
        }
        return  NextResponse.json({
            message: "Access Denied",
            success:false
          },
          {
            status:401
          })
      }
 
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:[ 
    // "/login",
    // "/signup",
    // "/add-task",
    // "/show-tasks",
    // "/profile/:path*",
    "/api/:path*"
]
}