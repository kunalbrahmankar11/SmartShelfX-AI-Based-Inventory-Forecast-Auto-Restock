import React from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
   const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Contact Us</h1>
      <p>Name: Krunal Brahmankar</p>
      <p>Email: krunalbrahmankar43@gmail.com</p>
      <p>Phone: +91-8459425496</p>
      <p>Ethusiast: Full-Stack Java Developer</p>
      <button className="back-btn" onClick={() => navigate("/home")}>
          Back to Home
        </button>
    </div>
  );
}
