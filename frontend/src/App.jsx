import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components';
import { ManageProducts } from './pages';



function App() {

  return (
    <div className=' flex'>
     <Navbar/>

     <div className={`flex-1 h-screen`}>
      <ManageProducts/>
     </div>
    </div>
  )
}

export default App
