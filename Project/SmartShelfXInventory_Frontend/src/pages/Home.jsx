import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [inventoryLevel, setInventoryLevel] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [autoRestockStatus, setAutoRestockStatus] = useState("All Good");

  useEffect(() => {
    // Fetch inventory data
    fetch("http://localhost:8080/api/products")
      .then((res) => res.json())
      .then((data) => {
        let totalStock = 0;
        let lowStock = 0;

        data.forEach((product) => {
          totalStock += product.currentStock;
          if (product.currentStock <= product.reorderLevel) {
            lowStock++;
          }
        });

        setInventoryLevel(totalStock);
        setLowStockCount(lowStock);
        setAutoRestockStatus(
          lowStock > 0 ? "Restock Needed" : "All Stock Levels Normal"
        );
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

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
          <a onClick={() => navigate("/transactions")}>Transactions</a>
        </div>
      </div>

      {/* Home content */}
      <div className="home-container">
        <h1>Welcome to SmartShelfX Inventory</h1>
        <p>Manage your inventory smartly and efficiently.</p>

        {/* Dashboard Cards */}
        <div className="dashboard-cards">
          <div className="card">
            <h2>📦 Inventory Level</h2>
            <p>{inventoryLevel}</p>
          </div>

          <div className="card">
            <h2>⚠️ Low Stock Alerts</h2>
            <p>{lowStockCount}</p>
          </div>

          <div className="card">
            <h2>🔄 Auto-Restock Status</h2>
            <p>{autoRestockStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
