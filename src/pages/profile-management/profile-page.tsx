import React, { useEffect, useState } from 'react'
import MainLayout from 'src/layout/main-layout'
import { Input } from "@components/ui/input";
import { auth } from 'src/firebase/firebase-config';
import UserMiddleware from 'src/middleware/user-middleware';
import { AuthController } from '@lib/controller/auth-controller';
import { useQuery } from 'react-query';
import { User, UserType } from '@lib/types/user-types';
import { useNavigate } from 'react-router-dom';
import LoadingCircle from '@components/ui/loading-circle';
import { DatePicker } from '@components/ui/date-picker';
import { useAuth } from '@lib/hooks/useAuth';

export default function ProfilePage() {
  const { user, userType, isLoading } = useAuth();
  const [dob, setDob] = useState<Date | null>();

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading) {
      if (
        userType != UserType.USER 
      ) {
        navigate("/auth");
      }
    }
  }, [isLoading]);
  return (
    <MainLayout>
      <UserMiddleware>
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
                  <h1 className='text-2xl font-bold'>{isLoading ? "Loading" : (user as User).firstName + " " + (user as User).lastName}</h1>
                  {/* <p className='text-gray-500 font-medium'>@goyounjung04</p> */}
                </div>
                <button className='bg-primary color hover:bg-primary/90 rounded-md w-20 h-8 text-sm text-white'>Log Out</button>
              </div>
            </div>
          </div>
          {/* <h1 className='text-2xl font-bold my-11'>Personal Info</h1> */}
          <div className='flex flex-col my-11'>

            <div className='flex flex-col w-full'>
              <div className='flex gap-12  mb-8'>
                <div className='flex flex-col w-1/2'>
                  <Input type="text" id='first-name'  defaultValue={isLoading ? "Loading" : (user as User).firstName}
                   placeholder='First Name'/>
                </div>
                <div className='flex flex-col w-1/2'>
                  <Input type="text" id='last-name'  defaultValue={isLoading ? "Loading" : (user as User).lastName}
                   placeholder='Last Name'/>
                </div>
              </div>
              <div className='flex gap-12 mb-8'>
                <div className='flex flex-col w-1/2'>
                  <Input type="text" id='nim'  defaultValue={isLoading ? "Loading" : (user as User).nim}
                   placeholder='NIM'/>
                </div>
                <div className='flex flex-col w-1/2'>
                  <Input type="text" id='email'  defaultValue={isLoading ? "Loading" : (user as User).email}
                   placeholder='Email'/>
                </div>
              </div>
              <div className='flex gap-12 mb-8'>
                <div className='flex flex-col w-1/2'>
                  <Input type="text" id='phone-num' defaultValue={isLoading ? "Loading" : (user as User).phoneNumber} 
                   placeholder='Phone Number'/>
                </div>
                <div className='flex flex-col w-1/2'>
                  <DatePicker
                    // value={field.value}
                    onChange={(date)=>{setDob(date)}}
                    value={dob}
                    placeholder="Date Of Birth"
                    className="col-span-2 lg:col-span-1"
                  />
                </div>
              </div>
              {/* <div className='flex flex-col mb-8'>
                <label htmlFor="user-bio" className='font-extralight mb-1'>Bio</label>
                <textarea name="user-bio" className="resize-none border rounded-md border-primary p-2 h-60"/>
              </div> */}
            </div>
            <div className='flex justify-start items-start'>
              <button className='bg-primary color hover:bg-primary/90 rounded-md w-32 h-10 text-sm text-white'>Save Changes</button>
            </div>
          </div>
        </div>
      </UserMiddleware>

    </MainLayout>
    
  )

}