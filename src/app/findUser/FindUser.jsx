"use client"
import { find } from '@/services/userService'
import React, {  useState } from 'react'
// import Task from './Task'
import { toast } from 'react-toastify'

const FindUser = () => {
   const [data,setData]= useState({
    type:""
    })
  const [user,setUser] = useState([])
    const findUser= async(event)=>{
        event.preventDefault();
          try{
           const result = await find(data)
           setUser(result)
            console.log(user)
          }catch(error){
            console.log(error)
            toast.error(error.response.data.message, {
                position: "top-center"
              })
          }
    }




  return (
    <div className='grid grid-cols-12 '>
    <div className='col-span-4 col-start-5 '>
        <div className='py-5'>
            <form action='#!'  onSubmit={findUser}  >
                <div className='mt-3'>
                    <label htmlFor='type'
                        className='block text-sm font-medium mb-2 ps-2'>TYPE</label>
                    <input type='text' className='w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-100 border border-gray-800' placeholder='Enter here'
                        id='type'
                        name='type'
                        onChange={(event) => {
                            setData({ ...data, type: event.target.value })
                        }}
                        value={data.type}
                    />
                </div>

              

                <div className="mt-3 text-center">
                    <button type='submit'
                        className='px-2 py-3 bg-green-600 rounded hover:bg-green-400'>Find</button>
                </div>
            </form>
           
            <div className='mt-3 bg-slate-700'>
  {user.map((item, index) => (
    <div key={index} className='p-3 mb-3 rounded bg-gray-800'>
      {item.loan_id && (
        <div>
          <strong>Loan ID:</strong> {item.loan_id}
        </div>
      )}
      {item.serialNo && (
        <div>
          <strong>Serial No:</strong> {item.serialNo}
        </div>
      )}
      {item.loanAmount && (
        <div>
          <strong>Loan Amount:</strong> {item.loanAmount}
        </div>
      )}
      {item.name && (
        <div>
          <strong>Name:</strong> {item.name}
        </div>
      )}
      {item.mobileNumber && (
        <div>
          <strong>Mobile Number:</strong> {item.mobileNumber}
        </div>
      )}
      {item.comment && (
        <div>
          <strong>Comment:</strong> {item.comment}
        </div>
      )}
      {item.activeMonth !== undefined && (
        <div>
          <strong>Active Month:</strong> {item.activeMonth}
        </div>
      )}
      {item.joiningDate && (
        <div>
          <strong>Joining Date:</strong> {new Date(item.joiningDate).toLocaleDateString('en-US')}
        </div>
      )}
      {item.duesMonth !== undefined && (
        <div>
          <strong>Dues Month:</strong> {item.duesMonth}
        </div>
      )}
    </div>
  ))}
</div>



        </div>
    </div>
</div>
  )
}

export default FindUser