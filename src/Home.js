import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import List from "./components/List";
import Loading from "./components/Loading";
import { useSelector } from "react-redux";
import { loggedInUserSelector } from "./features/loggedInUserSlice";

export default function Home() {
    const [doctors, setDoctors] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('logintoken');
        if(token) {
            setIsUserLoggedIn(true)
        }
    }, [])

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
        fetch("http://localhost:3000/doctors", requestOptions)
        .then(response => response.json())
        .then(result => {
            setTimeout(() => {
                setDoctors(result)
                setIsLoading(false)
            }, 1000)
            
        })
        .catch(error => console.log('error', error));
    }, [])

    return (
        <div>
            <Navbar />
            { isUserLoggedIn && 
                <div>
                    { isLoading && <Loading /> }
                    <div className="mx-auto lg:w-9/12 mt-8">
                        {
                            (!isLoading && doctors) && <div>
                                <List list={doctors} />
                            </div> 
                        }
                    </div>
                </div>
            } 
        </div>
    )
}