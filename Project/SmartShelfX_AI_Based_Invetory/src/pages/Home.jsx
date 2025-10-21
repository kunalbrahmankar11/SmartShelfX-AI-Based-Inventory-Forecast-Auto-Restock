import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to SmartShelfX Inventory</h1>
      <p>Manage your inventory smartly and efficiently.</p>

      <div className="button-group">
        <button onClick={() => navigate("/about")}>About</button>
        <button onClick={() => navigate("/contact")}>Contact</button>
        <button onClick={() => navigate("/inventory")}>Inventory</button>
      </div>
    </div>
  );
}
