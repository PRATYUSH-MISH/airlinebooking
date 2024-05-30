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
        // Navigate to the home page after successful login
        navigate('/', { state: { id: data.name } }); // Assuming backend sends user name in response and show your name to home page

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



// <div className="login">

//     <h1>Login</h1>

//     <form action="POST">
//         <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" />
//         <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
//         <input type="submit" onClick={submit} />

//     </form>

//     <br />
//     <p>OR</p>
//     <br />

// <Link to="/signup">Signup Page</Link>

// </div>