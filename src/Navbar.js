import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AccountMenu from "./components/AccountMenu";
import Logo from './school.png';

export default function Navbar() {
    const navigate = useNavigate();
    const token = useRef(null);
    

    useEffect(() => {
        const loginToken = localStorage.getItem('logintoken') 
        if(loginToken) {
            token.current = loginToken
        }else {
            navigate('/')
        }
    }, [])

    // function navigateToHome() {
    //     const currentUrl = window.location.pathname;
    //     if(currentUrl !== '/home'){
    //         navigate('/home')
    //     }
        
    // }

    function logoutUser() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token.current}`);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("http://localhost:3000/users/logout", requestOptions)
        .then(response => response.json())
        .then(user => {
            if(user) {
                localStorage.clear();
                alert('User logged out Successfully')
                navigate('/',  {replace: true})
            }
        })
        .catch(error => console.log('error', error));
        
    }

    return (
        <nav className="flex flex-row justify-between px-4 lg:px-16 items-center py-2 border-b-2">
            <div className="flex flex-col items-center cursor-pointer">
                <img className="w-8" src={Logo} alt="university"/>
                <h3>University Health Center</h3>
            </div>
            <div>
                <ul className="flex">
                    <AccountMenu logoutUser={logoutUser}/>
                </ul>
            </div>
        </nav>
    )
}