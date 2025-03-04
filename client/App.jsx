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
import Signin from './pages/signin/Signin.jsx'
import Signup from './pages/signup/Signup.jsx'

import Navbar from './components/navbar/Navbar.jsx'

function App() {
  //const [count, setCount] = useState(0)

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
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
