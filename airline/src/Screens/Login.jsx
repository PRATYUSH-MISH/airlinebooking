import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"


function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Import and use useNavigate hook

  const submit = async (e) => {
    e.preventDefault();//form not reload 
    try {
      const res = await fetch('http://localhost:8000/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

      if (res.status === 400 || !data) {
        window.alert("INVALID CREDENTIALS");
      } else {
        window.alert("LOGIN SUCCESSFUL!");
      
      localStorage.setItem("authToken",data.token) 
      console.log(localStorage.getItem("authToken"));
     // handleLogin(data.name);
        navigate('/');
      }
    } catch (error) {
      console.error("Error:", error.message);
      window.alert("An error occurred. Please try again later.");
    }
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" action="POST">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              autoComplete="name"
              onChange={(e) => { setEmail(e.target.value) }} />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              autoComplete="current-password"
              onChange={(e) => { setPassword(e.target.value) }} />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={submit}>
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Not Registered Yet click on <Link to="/signup">Signup Page</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login;


