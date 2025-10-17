import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

export default function SignIn() {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.usernameOrEmail,
          password: formData.password,
        }),
      });

      const message = await response.text();
      alert(message);
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label>Username or Email</label>
          <input
            type="text"
            name="usernameOrEmail"
            placeholder="Enter username or email"
            value={formData.usernameOrEmail}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="auth-links">
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="auth-btn">Sign In</button>

          <p className="auth-footer">
            Don’t have an account?{" "}
            <Link to="/signup" className="link">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
