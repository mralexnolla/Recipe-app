import React from 'react';
import { useState } from 'react';
import axios from "axios";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("")

    const [_, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate()

    const handleSubmit =  async (e) => {
        e.preventDefault()
        
        try {
            const response = await axios.post("http://localhost:3000/auth/login", {username, password});

            if(!response.data.userID){
                setMsg(response.data.message);
            }else if (!response.data.pword) {
                setMsg(response.data.message);
            } else {
              // cookies to get response with toke
              setCookies("access_token", response.data.token);

              //local storrage to keep our userID
              window.localStorage.setItem("userID", response.data.userID);
              console.log(response.data.userID);

              //use navigate hook to redirect to home
              navigate("/");
            }   
        } catch (error) {
            console.log(error)
        }
        setUsername("")
        setPassword("")
    }
  return (
    <div className='auth-container'>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" name="username" value={username}  onChange={(e) =>  setUsername(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" name="password" value={password} onChange={(e) =>  setPassword(e.target.value)}/>
        </div>
        <button type="submit">Login</button>
        <h3>{msg}</h3>
      </form>
    </div>
  )
}

export default Login
