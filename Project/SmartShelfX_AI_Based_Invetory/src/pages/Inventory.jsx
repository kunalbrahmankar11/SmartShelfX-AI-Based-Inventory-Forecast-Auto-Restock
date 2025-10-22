import React, { useEffect, useState } from "react";
import "./Inventory.css";

export default function Inventory() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", status: "Active" });
  const [editId, setEditId] = useState(null);

  // Fetch all projects from backend
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update project
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (editId) {
        // Update existing project
        response = await fetch(`http://localhost:8080/api/projects/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        // Add new project
        response = await fetch("http://localhost:8080/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      if (response.ok) {
        fetchProjects(); // refresh
        setForm({ name: "", description: "", status: "Active" });
        setEditId(null);
      } else {
        alert("Something went wrong while saving the project");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Edit project
  const handleEdit = (project) => {
    setForm({
      name: project.name,
      description: project.description,
      status: project.status,
    });
    setEditId(project._id);
  };

  // Delete project
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await fetch(`http://localhost:8080/api/projects/${id}`, { method: "DELETE" });
      fetchProjects();
    }
  };

  return (
    <div className="inventory-container">
      <h2>Project Inventory</h2>

      {/* Add or Update Form */}
      <form className="inventory-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Project name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Project description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
        </select>

        <button type="submit">{editId ? "Update Project" : "Add Project"}</button>
      </form>

      {/* Display Project List */}
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map((project) => (
              <tr key={project._id}>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{project.status}</td>
                <td>
                  <button onClick={() => handleEdit(project)}>Edit</button>
                  <button onClick={() => handleDelete(project._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No projects found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
