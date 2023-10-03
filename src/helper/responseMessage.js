import { NextResponse } from "next/server"

export const getresponseMessage = (message,statusCode,successStatus)=>{
    return NextResponse.json({
        message:message,
        success:successStatus
    },{
        status:statusCode
    })
}