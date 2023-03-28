import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Signup() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [role, setRole] = useState("doctor")
    const navigate = useNavigate()

    useEffect(() => {
        const loginToken = localStorage.getItem('logintoken');
        if(loginToken!==null) {
          navigate('/home')
        }else {
          setIsUserLoggedIn(false)
        }
    })

    function handleUserSignUp(event) {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": name,
            "email": email,
            "password": password,
            "age": age,
            "role": role
        });

        console.log(raw)

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:3000/users", requestOptions)
        .then(response => response.json())
        .then(({userSaved, token}) => {
            localStorage.setItem('logintoken', token);
            if(userSaved.role==='doctor'){
                navigate("/doctor/dashboard")
            }else {
                navigate("/home")
            }
           
        })
        .catch(error => console.log('error', error));
    }

    return (
        <div>
        {
            !isUserLoggedIn && (
              <div className="bg-green-200 h-screen flex flex-col items-center justify-center">
                <div className="border rounded px-6 lg:px-12 bg-slate-50">
                  <h1 className="text-2xl font-normal mt-8 mb-4 pb-4 border-b-2">Singup Form</h1>
                  
                  <form className="flex flex-col" onSubmit={handleUserSignUp}>
                    <label className="mb-2 text-sm">Name</label>
                    <input 
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      type="name" 
                      placeholder="Enter your name" 
                      className="border rounded mb-2 p-1 outline-none w-52 text-sm"
                    />
                    <label className="mb-2 text-sm">Age</label>
                    <input 
                      value={age}
                      onChange={(event) => setAge(event.target.value)}
                      type="age" 
                      placeholder="Enter your Age" 
                      className="border rounded mb-2 p-1 outline-none w-52 text-sm"
                    />
                    <label className="mb-2 text-sm">Email</label>
                    <input 
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      type="email" 
                      placeholder="Enter your email" 
                      className="border rounded mb-2 p-1 outline-none w-52 text-sm"
                    />
                    <label className="mb-2 text-sm">Password</label>
                    <input 
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      type="password" 
                      placeholder="Enter your password" 
                      className="border rounded mb-4 p-1 outline-none w-52 text-sm"
                    />
                    <select onChange={(event) => setRole(event.target.value)}>
                      <option value="doctor">Doctor</option>
                      <option value="patient">Patient</option>
                    </select>
                    <div>
                      <button type="submit" className="border rounded mb-6 px-4 py-2 text-sm font-medium">Sing Up</button>
                    </div>
                    <div className="mb-8">
                      <span className="text-xs">Existing User?</span> &nbsp;&nbsp;<button onClick={() => navigate('/')}>Login</button>
                    </div>
                  </form>
              </div>
            </div>
            )
        }
    </div>
        
          
    );
}