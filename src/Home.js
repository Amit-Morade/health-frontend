import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Home() {
    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
        fetch("http://localhost:3000/doctors", requestOptions)
        .then(response => response.json())
        .then(result => setDoctors(result))
        .catch(error => console.log('error', error));
    }, [])

    return (
        <div>
            <Navbar />
            { doctors?.map((doctor) => {
                return <li>{doctor.name}</li>
            }) }
        </div>
    )
}