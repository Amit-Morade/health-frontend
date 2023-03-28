import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loggedInUserSelector, setUser } from "./features/loggedInUserSlice";

export default function Login() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch();

 
    useEffect(() => {
      document.title = "Login Page"
    }, [])

    useEffect(() => {
      const loginToken = localStorage.getItem('logintoken');
      if(loginToken!==null) {
        navigate('/home')
      }else {
        setIsUserLoggedIn(false)
      }
    }, [])

    function handleUserLogin(event) {
        event.preventDefault()
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
        "email": email,
        "password": password
        });
        
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        
        fetch("http://localhost:3000/users/login", requestOptions)
        .then(response => response.json())
        .then(({user, token}) => {
            if(user) {
              dispatch(setUser(user))
              console.log(user)
              localStorage.setItem('logintoken', token)
              alert(`user ${user.name} is logged in successfully`)
              if(user.role==='doctor') {
                navigate('/doctor/dashboard', {replace: true}) 
              }else {
                navigate('/home', {replace: true}) 
              }

              
            }
        })
        .catch(error => console.log('error', error));

        setEmail("")
        setPassword("")
    }

    function navigateToSignUpPage() {
      navigate('signup')
    }

    return (
      <div>
        {
          !isUserLoggedIn && (
            <div className="bg-green-200 h-screen flex flex-col items-center justify-center">
              <div className="border rounded px-6 lg:px-12 bg-slate-50">
                <h1 className="text-2xl font-normal mt-8 mb-4 pb-4 border-b-2">Login Form</h1>
                
                <form className="flex flex-col" onSubmit={handleUserLogin}>
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
                  <div>
                    <button type="submit" className="border rounded mb-6 px-4 py-2 text-sm font-medium">Login</button>
                  </div>
                  <div className="mb-8">
                    <span className="text-xs">New User?</span> &nbsp;&nbsp;<button onClick={() => navigateToSignUpPage()}>Sign Up</button>
                  </div>
                </form>
            </div>
          </div>
          )
        }
      </div>
      
        
    );
}