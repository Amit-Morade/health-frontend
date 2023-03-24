import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import Loading from "./components/Loading";
import Navbar from "./Navbar";

export default function DoctorDashboard() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [patients, setPatients] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('logintoken');
        if(token) {
            setIsUserLoggedIn(true)
        }
    }, [])

    useEffect(() => {
        if(isUserLoggedIn===true) {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
              
            fetch("http://localhost:3000/patients", requestOptions)
            .then(response => response.json())
            .then(pats => {
                setTimeout(() => {
                    setPatients(pats)
                    setIsLoading(false)
                }, 2000)
            })
            .catch(error => console.log('error', error));
        }
    })

    function handleClick(patient) {
        navigate(`/users/${patient._id}`)
    }

    return (
        <div>
            <Navbar />
            {
                isUserLoggedIn && (
                    <div style={{padding: '0px 100px 0px 100px', backgroundColor: 'lightgray'}}>
                        { isLoading && <Loading /> }
                        { patients?.map((patient) => {
                            return (
                                <div style={{listStyle: 'none', border: '1px solid black'}} onClick={() => handleClick(patient)}>
                                    <li>{patient.name}</li>
                                    <li>{patient.email}</li>
                                    <li>{patient.age}</li>
                                </div>)
                        }) }
                    </div>
                )
            }
            
        </div>
    )
}