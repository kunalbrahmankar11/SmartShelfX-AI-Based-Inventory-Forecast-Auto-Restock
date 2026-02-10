import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css"; // We'll put animation CSS here

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <h1 className="about-heading">About SmartShelfX</h1>
      <p className="about-description">
        SmartShelfX leverages cutting-edge AI technology to optimize your inventory
        tracking and management, making operations faster, smarter, and more efficient.
      </p>
      <button className="back-btn" onClick={() => navigate("/home")}>
        Back to Home
      </button>
    </div>
  );
}
