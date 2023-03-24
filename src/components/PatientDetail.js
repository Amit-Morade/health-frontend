import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function PatientDetail() {
    const [patient, setPatient] = useState()
    const { id } = useParams()

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`http://localhost:3000/users/${id}`, {method: 'GET'})
        .then(response => response.json())
        .then(result => {
            console.log(result)
            setPatient(result)
        })
        .catch(error => console.log('error', error));
    }, [])

    return (
        <div>
            <p>{ patient?.name }</p>
        </div>
    )
}