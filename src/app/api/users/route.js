import { getresponseMessage } from "@/helper/responseMessage";
import { NextResponse } from "next/server";
import {QueryDB} from "@/helper/db"



export async function POST(request) {
    try {
  
        let q = `select  * from user_details;`
        const user = await QueryDB(q)
        if(!user.success){
            return getresponseMessage("Something Went wrong",500,false) 
        }
        const response = NextResponse.json(user, {
            status: 200
        });
        return response;
    } catch (error) {
        console.log(error)
        return getresponseMessage("Something Went wrong",500,false)
    }
}