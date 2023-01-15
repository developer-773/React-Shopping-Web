import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import { Admin } from './pages/Admin/Admin'
import { Client } from './pages/Client/Client'
import {Login} from './pages/Login/Login'
import { Register } from './pages/Register/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
    <Routes>
      <Route path='/' element={<Client />} />
      <Route path='/admin/*' element={<Admin />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />

    </Routes>
    </div>
  )
}

export default App
