import React from 'react'
import MainLayout from 'src/layout/main-layout'
import { Input } from "@components/ui/input";

export default function ProfilePage() {
  return (
    <MainLayout>
      
        <div className='container pt-20 w-4/5 mx-auto'>
          <div className='flex bg-center relative w-full h-68 rounded-2xl pb-8 pl-8 shadow-md'>
            <div className='w-full absolute left-0 top-0 h-32 bg-slate-400 rounded-t-2xl z-0'
            style={{ backgroundImage: "url('https://images.axios.com/gIMCWO5TN6OlCsXW965xfSKSC9k=/0x0:1920x1080/1920x1080/2024/05/16/1715870547736.jpg')",
              backgroundSize: "cover",
             }}></div>
            <div className='flex'>
              <div className='flex mt-20 relative align-bottom'>
                <img src="https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png" 
                alt="" className='rounded-full w-40 h-40  border-4 border-white shadow-md z-10'/>
                <div className='flex flex-col absolute right-0 bottom-0'>
                  <img src="https://www.svgrepo.com/show/42233/pencil-edit-button.svg" alt="" className='w-6 h-6'/> 
                </div>
              </div>
              <div className='flex flex-col pl-6 h-auto justify-end gap-4'>
                <div className='mt-10'> 
                  <h1 className='text-2xl font-bold'>GOYOUNJUNG</h1>
                  <p className='text-gray-500 font-medium'>@goyounjung04</p>
                </div>
                <button className='bg-primary color hover:bg-primary/90 rounded-md w-3/5 h-8 text-sm text-white'>Log Out</button>
              </div>
            </div>
          </div>
          <h1 className='text-2xl font-bold my-11'>Personal Info</h1>
          <div className='flex flex-col'>

            <div className='flex flex-col w-[calc(50%+3rem)]'>
              <div className='flex gap-12  mb-8'>
                <div className='flex flex-col w-1/2'>
                  <Input type="text" id='first-name'  
                   placeholder='First Name'/>
                </div>
                <div className='flex flex-col w-1/2'>
                  <Input type="text" id='last-name'  
                   placeholder='Last Name'/>
                </div>
              </div>
              <div className='flex gap-12 mb-8'>
                <div className='flex flex-col w-1/2'>
                  <Input type="text" id='nim'  
                   placeholder='NIM'/>
                </div>
                <div className='flex flex-col w-1/2'>
                  <Input type="text" id='email'  
                   placeholder='Email'/>
                </div>
              </div>
              <div className='flex gap-12 mb-8'>
                <div className='flex flex-col w-1/2'>
                  <Input type="text" id='phone-num'  
                   placeholder='Phone Number'/>
                </div>
                <div className='flex flex-col w-1/2'>
                  <Input type="date" id='first-name'  
                   placeholder=''className='text-slate' />
                </div>
              </div>
              <div className='flex flex-col mb-8'>
                <label htmlFor="user-bio" className='font-extralight mb-1'>Bio</label>
                <textarea name="user-bio" className="resize-none border rounded-md border-primary p-2 h-60"/>
              </div>
            </div>
            <div className='flex'>
              <button className='bg-primary color hover:bg-primary/90 rounded-md w-32 h-10 text-sm text-white'>Save Changes</button>
            </div>
          </div>
        </div>

    </MainLayout>
    
  )

}