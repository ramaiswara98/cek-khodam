import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Donasi from './pages/Donasi'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/list-donasi' element={<Donasi/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
