import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
       <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Want to learn more about JavaScript?
            </h2>
            <p className='text-gray-500 my-2'>
                Checkout these resources with 24 JavaScript Projects
            </p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                <a href="https://all-24-projects-site-5x148r1f7-piyush-digraskars-projects.vercel.app/
" target='_blank' rel='noopener noreferrer'>
                    24 JavaScript Projects
                </a>
            </Button>
        </div> 
        <div className="p-7 flex-1">
            <img src="https://i.morioh.com/2023/11/10/77069503.webp" />
        </div>
    </div>
  )
}
