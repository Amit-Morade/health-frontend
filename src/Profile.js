import { useEffect, useState } from "react"

export default function Profile() {
    const [user, setUser] = useState('')

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization",  `Bearer ${localStorage.getItem('logintoken')}`);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("http://localhost:3000/users/me", requestOptions)
        .then(response => response.json())
        .then(result => setUser(result))
        .catch(error => console.log('error', error));
    }, [])

    return (
        <div>
            <div className="border-2 p-4">
                <p>{user.name}</p>
                <p>{user.email}</p>
            </div>
            
        </div>
    )
}