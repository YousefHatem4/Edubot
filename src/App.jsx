import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Upload from './Components/Upload/Upload'
import Edubot from './Components/Edubot/Edubot'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'


const routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "upload", element: <Upload /> },
      { path: "edubot", element: <Edubot /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
    ]
  }
])

function App() {
  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
    </>
  )
}

export default App
