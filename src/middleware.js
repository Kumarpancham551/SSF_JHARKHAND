import { NextResponse } from 'next/server';
import {NextRequest} from 'next/server';
import jwt from "jsonwebtoken";

 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
   

   const authToken = request.cookies.get("authToken")?.value;


     console.log("middleware",authToken)
     if(request.nextUrl.pathname === "/api/login"){
        return;
       }
       else{
        // if(authToken){
        //     const validToken = jwt.verify(authToken, process.env.JWT_KEY);
        //     console.log(validToken, "validToken")
        // }
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
    "/",
    "/login",
    "/signup",
    "/add-task",
    "/show-tasks",
    "/profile/:path*",
    "/api/:path*"
]
}