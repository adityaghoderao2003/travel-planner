import { useState ,  useEffect } from 'react'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Trips from "./pages/Trips";


const routes = createBrowserRouter([
  {
    path: "/",
    element: 
    <>
    <Navbar/>
    <Home />
    </>
  },
  {
    path: "/trips",
    element: 
    <>
    <Navbar/>
    <Trips />
    </>
  },
  {
    path: "/login",
    element:
    <>
    <Navbar/>
    <Login />
    </> 
  },
  {
    path: "/register",
    element:
    <>
    <Navbar/>
     <Register/>
    </>
  },
]);

function App() {
  return (
   <>
    <RouterProvider router={routes}/> 
   </>
  )
}

export default App;