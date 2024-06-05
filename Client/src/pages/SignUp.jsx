import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Label, TextInput} from 'flowbite-react';

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        {/*left */}
        <div className="flex-1">
          <Link
            to='/'
            className=' font-bold dark:text-white text-4xl'
          >
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Piyush's
            </span>
            Blog
          </Link>
          <p className='text-sm mt-5'>
            You can Sign up with your Email and password at this blog
          </p>
        </div>
        {/*Right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Your Username:' />
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
              />
            </div>
            <div>
              <Label value='Your Email:' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
              />
            </div>
            <div>
              <Label value='Your Password:' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
              />
            </div>
            <Button className='bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded' type='submit'>
              Sign-Up
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span >Have an Account</span>
            <Link to='/sign-in' className='text-blue-500'>
               Sign-in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
