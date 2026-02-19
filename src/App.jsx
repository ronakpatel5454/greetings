import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Valentine from './Valentine'
import Resume from './components/Resume/Resume'
import Resume1 from './components/Resume/Resume1'

function Home() {
// ... existing Home function ...
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/valentine" element={<Valentine />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/resume-1" element={<Resume1 />} />
    </Routes>
  )
}

export default App
