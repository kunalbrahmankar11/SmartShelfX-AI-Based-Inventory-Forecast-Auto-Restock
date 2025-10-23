import React from "react";
import { useNavigate } from "react-router-dom";
export default function About() {
  const navigate = useNavigate();
  return (
   
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>About SmartShelfX</h1>
      <p>This project uses AI to optimize inventory tracking and management.</p>
      <button className="back-btn" onClick={() => navigate("/home")}>
          Back to Home
        </button>
    </div>
  );
}
