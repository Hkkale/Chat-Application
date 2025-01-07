import React from 'react'
import chatIcon from '../assets/speak.png'

const JoinCreateChat = () => {
  return (
    <div className='min-h-screen flex items-center justify-center '>

      <div className='p-10 border border-gray-700 w-full max-w-md rounded bg-gray-900 shadow flex flex-col gap-5'>
        <div className='flex justify-center items-center'>
          <img src={chatIcon} alt="" className='w-20' />
        </div>
        <h1 className='text-2xl font-semibold text-center'>Join Room / Create Room</h1>

        <div className=''>

          <label htmlFor="name" className='block font-medium mb-2'>Your Name</label>

          <input type="text" name="" id="name" className='w-full bg-gray-600 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'/>

        </div>


        <div className=''>

          <label htmlFor="roomId" className='block font-medium mb-2'>Room Id / New Room Id</label>

          <input type="text" name="" id="roomId" className='w-full bg-gray-600 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'/>

        </div>


        <div className='flex justify-center gap-2 mt-2'>
          <button className='px-3 py-2 bg-blue-500 hover:bg-blue-800 rounded-full '>Join Room</button>
          <button className='px-3 py-2 bg-orange-500 hover:bg-orange-800 rounded-full '>Create Room</button>
        </div>


      </div>
    
      
    </div>
  )
}

export default JoinCreateChat
