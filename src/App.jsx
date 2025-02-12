import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Landing from './pages/landing/Landing.jsx'
import About from './pages/about/About.jsx'

import Navbar from './components/navbar/Navbar.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navbar />
        <About />
      </div>
    </>
  )
}

export default App
