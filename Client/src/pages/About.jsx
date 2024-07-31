import React from 'react'

export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font-semibold text-center my-7">About Piyush's Blog</h1>
          <div className="text-md text-gray-400 flex flex-col gap-6 ">
            <p>
              Welcome to my Tech Journal! I created this blog as a personal project to share my experiences, knowledge, and insights with the tech community. I'm Piyush Digaskar, a dedicated developer with a passion for coding, innovation, and everything related to technology.
            </p>
            <p>
              On this blog, you'll find regular articles, tutorials, and musings on topics such as web development, software engineering, programming languages, and more. I'm always exploring new technologies, experimenting with novel approaches, and learning from my mistakes, so be sure to check back often for fresh content and inspiration!
            </p>
            <p>
              I invite you to engage with my posts, leave comments, and interact with other readers. You can like and reply to comments, and I believe that a collaborative community of learners can help each other grow, improve, and thrive.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
