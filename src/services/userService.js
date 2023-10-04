import { httpAxios } from "@/helper/httpHelper";

export async function find(type){
    const result = await httpAxios.post("/api/users/find",type).then((response)=>response.data);
return result;
}

export async function login(loginData){
    const result = await httpAxios.post("/api/login",loginData).then((response)=>response.data);
    return result;
}
