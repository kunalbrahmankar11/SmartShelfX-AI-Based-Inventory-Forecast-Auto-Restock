import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Transactions.css";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    productId: "",
    type: "IN",
    quantity: "",
    handler: "",
  });

  const navigate = useNavigate();

  // ================= LOAD DATA =================
  useEffect(() => {
    fetchProducts();
    fetchTransactions();
  }, []);

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // ================= FETCH TRANSACTIONS =================
  const fetchTransactions = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value, // ✅ KEEP EVERYTHING AS STRING
    });
  };

  // ================= SUBMIT TRANSACTION =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.productId) {
      alert("Please select a product");
      return;
    }

    if (form.quantity <= 0) {
      alert("Quantity must be greater than 0");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/transactions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            quantity: Number(form.quantity), // ✅ convert only before sending
          }),
        }
      );

      if (!response.ok) {
        const msg = await response.text();
        alert(msg);
        return;
      }

      alert("Transaction recorded successfully!");
      fetchTransactions();

      setForm({
        productId: "",
        type: "IN",
        quantity: "",
        handler: "",
      });
    } catch (error) {
      console.error("Transaction error:", error);
    }
  };

  // ================= MAP PRODUCT ID TO SKU =================
  const getProductSku = (productId) => {
    const product = products.find(
      (p) => String(p.id || p._id) === String(productId)
    );
    return product ? product.sku : "Unknown";
  };

  return (
    <div className="transaction-container">
      <h2>Stock In / Out Transactions</h2>

      {/* ================= FORM ================= */}
      <form className="transaction-form" onSubmit={handleSubmit}>
        <select
          name="productId"
          value={form.productId}
          onChange={handleChange}
          required
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option
              key={p.id || p._id}
              value={String(p.id || p._id)}
            >
              {p.sku}
            </option>
          ))}
        </select>

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <option value="IN">Stock-In</option>
          <option value="OUT">Stock-Out</option>
        </select>

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          min="1"
          required
        />

        <input
          type="text"
          name="handler"
          placeholder="Handled By"
          value={form.handler}
          onChange={handleChange}
          required
        />

        <button type="submit">Record Transaction</button>
      </form>

      {/* ================= TABLE ================= */}
      <h3>Transaction History</h3>

      <table className="transaction-table">
        <thead>
          <tr>
            <th>Product SKU</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Handler</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((t) => (
              <tr key={t.id || t._id}>
                <td>{getProductSku(t.productId)}</td>
                <td>{t.type}</td>
                <td>{t.quantity}</td>
                <td>{t.handler}</td>
                <td>
                  {t.timestamp
                    ? new Date(t.timestamp).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No transactions recorded</td>
            </tr>
          )}
        </tbody>
      </table>

      <button className="back-btn" onClick={() => navigate("/home")}>
        Back to Home
      </button>
    </div>
  );
}
