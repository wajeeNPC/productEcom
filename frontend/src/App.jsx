import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components';
import { ManageProducts, Profile, Settings } from './pages';




function App() {

  return (
    <div className='flex'>
      <Navbar />
      <div className={`flex-1 h-screen ml-72`}>
        <Routes>
          <Route path="/manage-products" element={<ManageProducts />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Navigate to="/manage-products" replace />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
