import React from 'react'
import { Routes, Route } from 'react-router-dom'
import App from '../App'
import ChatPage from '../components/ChatPage'


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/chat" element={<ChatPage/>} />
      <Route path="/about" element={<h1>This is about page </h1>} />
      <Route path="/*" element={<h1 className='text-3xl text-red-800'>404 not found</h1>} />
    </Routes>
    
  )
}

export default AppRoutes
