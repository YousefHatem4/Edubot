import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return <>
        <Outlet></Outlet>
        <Toaster position="top-right" reverseOrder={false} />
    </>
}
