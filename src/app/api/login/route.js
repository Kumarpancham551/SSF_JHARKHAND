import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getresponseMessage } from "@/helper/responseMessage";
import { NextResponse } from "next/server";
import {QueryDB} from "@/helper/db"


export async function POST(request) {
    
    try {
        const { serialNo } = await request.json();
        if(!serialNo){
            return getresponseMessage("Please provide login credential",401,false)
        }
        let q = `select  * from user_details where serialNo = '${serialNo}' and status = "ACTIVE";`
        const user = await QueryDB(q);
     
        if (!(user.success && user.data.length)) {
            throw new Error("user not found");
        }

        if(user.data[0].desiganation === "CX"){
            return getresponseMessage("You are not authorized ",401,false)
        }
        

        // const matched = bcrypt.compareSync(password, user.password)
        // if (!matched) {
        //     throw new Error("password not matced !!")
        // }
        const token = jwt.sign({
            serialNo: serialNo,
            desiganation: user.data[0].desiganation
        }, process.env.JWT_KEY);

         // add token into cookies
    
        const response = NextResponse.json({
            message: "Login Success",
            success: true,
            user:user.data[0]
        })
        response.cookies.set("authToken", token,
         {
            expiresIn: "35d",
             httpOnly:true
        })
        return response
    } catch (error) {
        console.log(error)
        return getresponseMessage("Something Went wrong",500,false)
    }
}