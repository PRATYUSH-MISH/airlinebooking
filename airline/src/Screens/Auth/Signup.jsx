import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Signup() {
  const [user, setUser] = useState({ name: "", email: "", password: "" })
  const navigate = useNavigate(); // Using useNavigate hook

  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }



  const submit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(`http://localhost:8000/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      // Navigate to the home page after successful signup
      navigate('/', { state: { id: user.name } });
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" action="POST">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary">
              <Link to="/">Login Page</Link>
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text" name="name" // Add
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              autoComplete="name"
              value={user.name}
              onChange={handleInputs} />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email" name="email"
              className="form-control mt-1"
              placeholder="Email Address"
              autoComplete="email"

              value={user.email}
              onChange={handleInputs} />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password" name="password"
              className="form-control mt-1"
              placeholder="Password"
              autoComplete="new-password"

              value={user.password}

              onChange={handleInputs} />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={submit}>
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup; 