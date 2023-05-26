import React from 'react'
import { useState } from 'react'
import axios from "axios"

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault() 
        try {
            const response = await axios.post("http://localhost:3000/auth/register", {username, password})
                if(response.data.userID){
                    setMsg(response.data.message);
                }else{
                 setMsg(response.data.message);
                }  
                
        } catch (error) {
           console.log(error) 
        }
        setUsername("")
        setPassword("")
    }
  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>

        <h3>{msg}</h3>
      </form>
    </div>
  );
}

export default Register
