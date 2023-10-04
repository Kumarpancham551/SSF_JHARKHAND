import { getresponseMessage } from "@/helper/responseMessage";
import { NextResponse } from "next/server";
import { QueryDB } from "@/helper/db";

export async function POST(request) {
    try {

        let search = '';
        const { type } = await request.json();
        let query;
        let user;
        let result=[]
       if(type === "LOANTAKENUSERS"){
         query = `select l.loan_id,l.serialNo,l.loanAmount,u.name,u.mobileNumber,l.comment from loanDetails l left join user_details u on l.serialNo = u.serialNo;`
         user = await QueryDB(query)
         if (!user.success) {
            return getresponseMessage("Something Went wrong", 500, false)
        }
        result = user.data
        }else{
        query = `select s.serialNo,s.activeMonth,u.name,u.mobileNumber,u.joiningDate  from savingAmount s left join user_details u on s.serialNo = u.serialNo;`
        user = await QueryDB(query)
        if (!user.success) {
            return getresponseMessage("Something Went wrong", 500, false)
        }
        user.data.forEach(user=>{
            let joiningDate = user.joiningDate
            var past_date = new Date(joiningDate);
           
            var current_date = new Date(); 
            
            var difference = (current_date.getFullYear() * 12 + current_date.getMonth()) - (past_date.getFullYear() * 12 + past_date.getMonth()) + 1;
           
            if(user.activeMonth < difference){
                user.duesMonth=user.activeMonth-difference
                result.push(user)
            }
            
        })
   
    }
        const response = NextResponse.json(result, {
            status: 200
        });
        return response;
    } catch (error) {
        console.log(error)
        return getresponseMessage("Something Went wrong", 500, false)
    }
}