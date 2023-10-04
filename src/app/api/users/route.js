import { getresponseMessage } from "@/helper/responseMessage";
import { NextResponse } from "next/server";
import { QueryDB } from "@/helper/db";
import jwt from "jsonwebtoken";



export async function POST(request) {
    try {

        //    const authToken = request.cookies.get("authToken")?.value;
        //    const data = jwt.verify(authToken,process.env.JWT_KEY)
        //    console.log(data,"data")
        let search = '';
        const { serialNo,status } = await request.json();
        let status_val = status || "ACTIVE";
        if (serialNo) {
            const value = serialNo.split(",").map(element => {
                return `"${element}"`;
            }).join(",");            
            search =`where serialNo in (${value}) and status = '${status_val}'`;
        }else{
            search = `where status = '${status_val}';`
        }
      

        let q = `select  * from user_details ${search} `
        const user = await QueryDB(q)
        if (!user.success) {
            return getresponseMessage("Something Went wrong", 500, false)
        }
        const response = NextResponse.json(user, {
            status: 200
        });
        return response;
    } catch (error) {
        console.log(error)
        return getresponseMessage("Something Went wrong", 500, false)
    }
}