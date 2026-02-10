import React from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();

  const containerStyle = {
    textAlign: "center",
    padding: "80px 20px",
    background: "linear-gradient(135deg, #43a047, #2e7d32)", // same as About
    color: "#fff",
    minHeight: "80vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const headingStyle = {
    fontSize: "3rem",
    marginBottom: "30px",
    textShadow: "2px 2px 6px rgba(0,0,0,0.3)",
  };

  const infoStyle = {
    fontSize: "1.25rem",
    margin: "10px 0",
  };

  const buttonStyle = {
    marginTop: "40px",
    padding: "12px 30px",
    fontSize: "1rem",
    fontWeight: "bold",
    borderRadius: "50px",
    border: "none",
    cursor: "pointer",
    background: "#fff",
    color: "#2e7d32",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  };

  const buttonHover = (e) => {
    e.target.style.background = "#2e7d32";
    e.target.style.color = "#fff";
  };

  const buttonLeave = (e) => {
    e.target.style.background = "#fff";
    e.target.style.color = "#2e7d32";
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Contact Us</h1>
      <p style={infoStyle}><strong>Name:</strong> Krunal Brahmankar</p>
      <p style={infoStyle}><strong>Email:</strong> krunalbrahmankar43@gmail.com</p>
      <p style={infoStyle}><strong>Phone:</strong> +91-8459425496</p>
      <p style={infoStyle}><strong>Enthusiast:</strong> Full-Stack Java Developer</p>
      <button
        style={buttonStyle}
        onClick={() => navigate("/home")}
        onMouseEnter={buttonHover}
        onMouseLeave={buttonLeave}
      >
        Back to Home
      </button>
    </div>
  );
}
