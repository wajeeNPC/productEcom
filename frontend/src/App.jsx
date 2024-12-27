import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components';
import { ManageProducts } from './pages';



function App() {

  const [navOpen,setNavOpen] = useState(false)

  return (
    <div className=' flex'>
     <Navbar Toggle={()=>{setNavOpen(!navOpen)}} isOpen={navOpen}/>

     <div className={`flex-1 h-screen`}>
      <ManageProducts/>
     </div>
    </div>
  )
}

export default App
