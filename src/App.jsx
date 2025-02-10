import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Landing from './pages/landing/Landing.jsx'
import Navbar from './components/navbar/Navbar.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navbar />
        <Landing />
      </div>
    </>
  )
}

export default App
