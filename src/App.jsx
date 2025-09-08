import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Upload from './Components/TeacherPage/Upload'
import Edubot from './Components/Edubot/Edubot'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import ForgetPass from './Components/ForgetPass/ForgetPass'
import TeacherPage from './Components/TeacherPage/TeacherPage'


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
      { path: "forgetpass", element: <ForgetPass /> },
      { path: "teacher-page", element: <TeacherPage /> },
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
