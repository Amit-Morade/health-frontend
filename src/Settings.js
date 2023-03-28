import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import AccountMenu from "./components/AccountMenu";

export default function Settings(){
    const token = useRef(null);
    const navigate = useNavigate();
    let processInit = false;

    useEffect(() => {
        const loginToken = localStorage.getItem('logintoken') 
        if(loginToken) {
            token.current = loginToken
        }else {
            navigate('/')
        }
    }, [])

    function handleClick() {
        
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token.current}`);
    
            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };

            fetch('http://localhost:3000/doctors/availability', requestOptions)
            .then((res) => res.json())
            .then((result) => {
                console.log(result)
                processInit = true;
            })
        
        
    }

    return (
        <div>
            Settings
            <button onClick={handleClick}>Toogle</button>
        </div>
    )
}