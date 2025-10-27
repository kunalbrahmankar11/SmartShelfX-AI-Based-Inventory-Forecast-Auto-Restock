import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Inventry.css";

export default function Inventory() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", status: "Active" });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

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

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update project
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
        alert(editId ? "Project updated successfully!" : "Project added successfully!");
        fetchProjects();
        setForm({ name: "", description: "", status: "Active" });
        setEditId(null);
      } else {
        alert("Failed to save project");
      }
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  // Edit project
  const handleEdit = (project) => {
    setForm({
      name: project.name,
      description: project.description,
      status: project.status,
    });
    setEditId(project.id || project._id);
  };

  // Delete project
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/projects/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Project deleted successfully!");
          fetchProjects();
        } else {
          alert("Failed to delete project");
          console.error(await response.text());
        }
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  // Reset form to add mode
  const handleCancelEdit = () => {
    setForm({ name: "", description: "", status: "Active" });
    setEditId(null);
  };

  return (
    <div className="inventory-container">
      <h2>Project Inventory</h2>

      <form className="inventory-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Project Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
        </select>

        <div className="button-row">
          <button type="submit" className="add-btn">
            {editId ? "Update Project" : "Add Project"}
          </button>
          {editId && (
            <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>

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
              <tr key={project.id || project._id}>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{project.status}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(project)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(project.id || project._id)}>Delete</button>
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

      <button className="back-btn" onClick={() => navigate("/home")}>
        Back to Home
      </button>
    </div>
  );
}
