import { useEffect, useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Landing from './pages/landing/Landing.jsx'
import About from './pages/about/About.jsx'
import Signin from './pages/signin/Signin.jsx'
import Signup from './pages/signup/Signup.jsx'
import Home from './pages/home/Home.jsx'

import Navbar from './components/navbar/Navbar.jsx'

function App() {
  const [backendData, setBackendData] = useState([{}]);

// Some test API calls. TODO: make so I don't have to write http://localhost:5000
  useEffect(() => {
    fetch("http://localhost:5000/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Landing />
        </>
      )},
    {
      path: "/about",
      element: (
        <>
          <Navbar />
          <About />
        </>
      )},
    {
      path: "/signin",
      element: (
        <>
          <Signin />
        </>
      )},
    {
      path: "/signup",
      element: (
        <>
          <Signup />
        </>
      )},
    {
      path: "/home",
      element: (
        <>
          <Navbar />
          <Home />


        </>
      )
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
