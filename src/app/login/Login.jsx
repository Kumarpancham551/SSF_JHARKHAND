"use client"
 import { login } from '@/services/userService'
import { useRouter } from 'next/navigation'
import React, {  useState } from 'react'
import { toast } from 'react-toastify'

const Login = () => {

    const router = useRouter();
   const [data,setData]= useState({
    serialNo:"",
        password:""
    })
  
    const loginFormSubmitted= async(event)=>{
        event.preventDefault();
        if (data.serialNo.trim() === "" || data.serialNo == null) {
            toast.warning("Invalid credential !!", {
              position: "top-center"
            })
            return;
          }
          try{
           const result = await login(data)
           console.log(result," result");
           toast.success("Logge in !!", {
            position: "top-center"
          })
            
          router.push("/") // This route is used inside functional componenet
          }catch(error){
            console.log(error)
            toast.error(error.response.data.message, {
                position: "top-center"
              })
          }
    }
    return (
        <div className='grid grid-cols-12 '>
            <div className='col-span-4 col-start-5 flex items-center justify-center h-screen'>
                <div className='py-5'>
                    <h1 className='text-3xl text-center'>Login Here</h1>
                    <form action='#!' onSubmit={loginFormSubmitted} >
                        <div className='mt-3'>
                            <label htmlFor='serialNo'
                                className='block text-sm font-medium mb-2 ps-2'>ID</label>
                            <input type='text' className='w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-100 border border-gray-800' placeholder='Enter here'
                                id='serialNo'
                                name='serialNo'
                                onChange={(event) => {
                                    setData({ ...data, serialNo: event.target.value })
                                }}
                                value={data.serialNo}
                            />
                        </div>

                        <div className='mt-3'>
                            <label htmlFor='user_password'
                                className='block text-sm font-medium mb-2 ps-2'>Password</label>
                            <input type='password' className='w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-100 border border-gray-800' placeholder='Enter here'
                                id='uer_password'
                                name='uer_password'
                           
                            />
                        </div>

                        <div className="mt-3 text-center">
                            <button type='submit'
                                className='px-2 py-3 bg-green-600 rounded hover:bg-green-400'>Login</button>
                            <button  type='button'
                                className='px-2 py-3 bg-orange-600 rounded hover:bg-orange-400 ms-5'>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login