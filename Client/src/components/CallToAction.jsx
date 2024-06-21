import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className="p-2 flex flex-col sm:flex-row border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
        <div className='flex-1  justify-center flex flex-col'>
            <h2 className='text-2xl'>
                Want to learn more about JavaScript?
            </h2>
            <p className='text-gray-500 my-2'>
                Check out these resources with 22 JavaScript Projects
            </p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                <a href='https:www.google.com' target='_blank' rel='noopener noreferrer'>
                    Learn More
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhF59408IYYLyomaUY3_Lz0BJtsWpsbmgaumdr6MLePru7UTc0iCOIxINErcoV7Fab1jIY4lAGL-fpdcgObSnRt_T8Omja0IJjFEddl-DH9YSU0Tkn2zBwsl3C0xWnafAo94h4jJZUJYGCM_UVD3M4c301pZDDV0rADNkHkUhUdNm-ZcRIcByPChGR7/s16000/Projects%20using%20html%20css%20&%20JavaScript.png" />
        </div>
    </div>
  )
}
