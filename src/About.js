import { useEffect, useRef, useState } from "react"
import { Link, NavLink, Outlet, Route, Routes, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Profile from "./Profile"

export default function About() {
    const token = useRef(null) 
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "About Page"
    }, [])

    useEffect(() => {
        const loginToken = localStorage.getItem('logintoken') 
        if(loginToken) {
            token.current = loginToken
        }else {
            navigate('/')
        }
    }, [])


    return (
        <div>
            {
                <div>
                    <Navbar />
                    <ul className="flex flex-row mb-4 py-4 items-center justify-around">
                        {/* <Link to="/about" className="p-1 cursor-pointer border-b-2 border-transparent mr-3 hover:border-b-2 hover:border-orange-500">About</Link>
                        <Link to="profile" className="p-1 cursor-pointer border-b-2 border-transparent mr-3 hover:border-b-2 hover:border-orange-500">Profile</Link> */}
                        <NavLink
                            to="settings"
                            className={({ isActive, isPending }) =>
                            isActive
                                ? "border-orange-500 border-b-2"
                                : isPending
                                ? "border-green-200 border-b-2"
                                : "border-transparent border-b-2 hover:border-orange-200" 
                        } >Settings</NavLink>
                        <NavLink
                            to="profile"
                            className={({ isActive, isPending }) =>
                            isActive
                                ? "border-orange-500 border-b-2"
                                : isPending
                                ? "border-green-200 border-b-2"
                                : "border-transparent border-b-2 hover:border-orange-200" 
                        } >Profile</NavLink>
                        
                    </ul>
                    
                    <div className="border-t-2 flex flex-col items-center pt-4">
                        <Outlet />
                    </div>
                    
                </div>
                
            }
        </div>
    )
}