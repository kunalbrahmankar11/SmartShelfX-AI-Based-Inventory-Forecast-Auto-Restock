import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <span className="brand">SmartShelfX</span>
        <div className="nav-links">
          <a onClick={() => navigate("/home")}>Home</a>
          <a onClick={() => navigate("/about")}>About</a>
          <a onClick={() => navigate("/contact")}>Contact</a>
          <a onClick={() => navigate("/inventory")}>Inventory</a>
        </div>
      </div>

      {/* Home content */}
      <div className="home-container">
        <h1>Welcome to SmartShelfX Inventory</h1>
        <p>Manage your inventory smartly and efficiently.</p>
      </div>
    </div>
  );
}
