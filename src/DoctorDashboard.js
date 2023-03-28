import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import List from "./components/List";
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
                }, 1000)
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
                    <div style={{padding: '0px 100px 0px 100px'}}>
                        { isLoading && <Loading /> }
                        <div className="w-9/12 mx-auto">
                            { (!isLoading && patients) && <List list={patients} />}
                        </div>
                    </div>
                )
            }
            
        </div>
    )
}