import React, { useState } from 'react';
import {ShipWheelIcon} from "lucide-react";
import {Link} from 'react-router';
import useSignUp from '../hooks/useSignUp.js';
const SignUpPage = () => {
  const [signupData,setSignUpData] = useState({fullName : "", email: "" , password:""});
const {error,isPending,SignUpmutation} = useSignUp();
  const handleSignUp = (e) => {
      e.preventDefault();
      SignUpmutation(signupData);
  }

  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="forest">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounder-xl shadow-lg overflow-hidden">
      {/*SignUpPage -LEFT SIDE*/}

      <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
      <div className='mb-4 flex items-center justify-start gap-2'>
        <ShipWheelIcon className="size-9 text-primary"/>
        <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
          Streamify
        </span>
      </div>
      {error && 
        <div className='alert alert-error mb-4'><span>{ error && error.response?.data.message}</span></div> 
      }
      <div className='w-full'>
        <form onSubmit={handleSignUp}>
        <div className='space-y-4'>
          <div>
              <h2 className='text-xl font-semibold'>Create an account</h2>
              <p className='text-sm opacity-70'>
                Join El-Stranger and start your chatting!
              </p>
          </div>
          
          <div className='space-y-3'>
            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text'>Full Name</span>
              </label>
              <input
                type="text"
                placeholder='John Doe'
                className='input input-bordered w-full'
                value={signupData.fullName}
                onChange={(e) => setSignUpData({...signupData , fullName:e.target.value})}
                required
              ></input>

              {/* EMAIL/ */}
            </div>
            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type="email"
                placeholder='john@gmail.com'
                className='input input-bordered w-full'
                value={signupData.email}
                onChange={(e) => setSignUpData({...signupData , email:e.target.value})}
                required
              ></input>
              {/* PASSWORD */}
            </div>
            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text'>Password</span>
              </label>
              <input
                type="password"
                placeholder='******'
                className='input input-bordered w-full'
                value={signupData.password}
                onChange={(e) => setSignUpData({...signupData , password:e.target.value})}
                required
              ></input>

              <div className='form-control'>
                <label className='label cursor-pointer justify-start gap-2'>
                  <input type="checkbox" className='checkbox checkbox-sm' required/>
                  <span className='text-xs leading-tight'>
                    I agree to the {" "}
                    <span className='text-primary hover:underline'>terms of service</span>and {" "}
                    <span className='text-primary hover:underline'>privacy policy</span>
                  </span>
                </label>
              </div>
            </div>
            <button className='btn btn-primary w-full' type="submit">
              {isPending ? (
                <>
                <span className='loading loading-spinner loading-xs'></span>
                Loading
                </>
              ):(
                "Create Account"
              )}
            </button>
            <div>
              <p>
                Already have an account?{" "}
                <Link to="/login" clasName="text-primary hover:underline">Sign in</Link> 
              </p>
            </div>
          </div>

        </div>
        </form>

      </div>
      </div>

      {/* SIGNUP FORM - RIGHT SIDE */}
      <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
        <div className='max-w-md p-8'>
          <div className='relative aspect-square max-w-sm mx-auto'>
            <img src="/i.png" alt="Language Connection illustartion" className='w-full h-full'></img>
          </div>
          <div clasName='text-center space-y-3 mt-6'>
            <h2 className='text-xl font-semibold'>
              Connect with partners worldwide!
            </h2>
            <p className='opacity-70'>
                Practice conversation, make friends, and improve your language skills together
            </p>
          </div>
        </div>
      </div>


      </div>

    </div>
  )
}

export default SignUpPage
