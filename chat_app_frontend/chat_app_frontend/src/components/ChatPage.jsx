import React from 'react'

function ChatPage() {
  return (
    <div className=''>

      <header className='border border-gray-700 py-2 flex justify-around items-center bg-gray-900'>

        {/* Room name Container */}
        
        <div>
          <h1 className='text-xl font-semibold'>Room : <span>Family Room</span></h1>
        </div>

        {/* UserName Container */}
        <div>
        <h1 className='text-xl font-semibold'>User : <span>Hitendra Kale</span></h1>
        </div>

        {/* button: leave Room */}
        <div>
          <button className='bg-red-500 hover:bg-red-700 px-1.5 py-1.5 rounded-full'>Leave Room</button>
        </div>
      </header>

      
      
    </div>
  )
}

export default ChatPage
