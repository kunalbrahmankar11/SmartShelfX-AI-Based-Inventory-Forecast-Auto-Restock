import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Inventory.css";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    sku: "",
    category: "",
    vendor: "",
    reorderLevel: "",
    currentStock: "",
  });
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  // ================= FETCH ALL PRODUCTS =================
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // ================= HANDLE INPUT CHANGE =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= ADD / UPDATE PRODUCT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (editId) {
        // Update existing product
        response = await fetch(
          `http://localhost:8080/api/products/${editId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          }
        );
      } else {
        // Add new product
        response = await fetch("http://localhost:8080/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      if (response.ok) {
        alert(
          editId
            ? "Product updated successfully!"
            : "Product added successfully!"
        );
        fetchProducts();
        setForm({
          sku: "",
          category: "",
          vendor: "",
          reorderLevel: "",
          currentStock: "",
        });
        setEditId(null);
      } else {
        alert("Failed to save product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  // ================= EDIT PRODUCT =================
  const handleEdit = (product) => {
    setForm({
      sku: product.sku,
      category: product.category,
      vendor: product.vendor,
      reorderLevel: product.reorderLevel,
      currentStock: product.currentStock,
    });
    setEditId(product.id || product._id);
  };

  // ================= DELETE PRODUCT =================
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("Product deleted successfully!");
          fetchProducts();
        } else {
          alert("Failed to delete product");
          console.error(await response.text());
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // ================= CANCEL EDIT =================
  const handleCancelEdit = () => {
    setForm({
      sku: "",
      category: "",
      vendor: "",
      reorderLevel: "",
      currentStock: "",
    });
    setEditId(null);
  };

  return (
    <div className="inventory-container">
      <h2>Product Inventory</h2>

      {/* ================= FORM ================= */}
      <form className="inventory-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="sku"
          placeholder="Product SKU"
          value={form.sku}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="vendor"
          placeholder="Vendor"
          value={form.vendor}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="reorderLevel"
          placeholder="Reorder Level"
          value={form.reorderLevel}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="currentStock"
          placeholder="Current Stock"
          value={form.currentStock}
          onChange={handleChange}
          required
        />

        <div className="button-row">
          <button type="submit" className="add-btn">
            {editId ? "Update Product" : "Add Product"}
          </button>

          {editId && (
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* ================= TABLE ================= */}
      <table className="inventory-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Category</th>
            <th>Vendor</th>
            <th>Reorder Level</th>
            <th>Current Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id || product._id}>
                <td>{product.sku}</td>
                <td>{product.category}</td>
                <td>{product.vendor}</td>
                <td>{product.reorderLevel}</td>
                <td>{product.currentStock}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(product.id || product._id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No products found</td>
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
