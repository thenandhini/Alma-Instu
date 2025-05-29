import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

const CreatePost = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    type: "study", // default or user-selected
    content: "",
    attachmentUrl: "" // New field for the attachment URL
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post("/api/posts", {
        ...formData,
        author: {
          name: currentUser.firstName + " " + currentUser.lastName,
          role: currentUser.role,
          department: currentUser.department
        },
        createdAt: new Date().toISOString()
      });
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error creating post", err);
      setError("Error creating post");
      setLoading(false);
    }
  };

  return (
    <div className="create-post-page">
      <h1>Create a New Post</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Post Type</label>
          <select 
            id="type" 
            name="type" 
            value={formData.type} 
            onChange={handleChange} 
            required
          >
            <option value="study">Study Material</option>
            <option value="tips">Tips & Tricks</option>
            <option value="job">Job Opportunity</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea 
            id="content" 
            name="content" 
            value={formData.content} 
            onChange={handleChange} 
            required 
            rows="10"
          ></textarea>
        </div>

        {formData.type === "study" && (
          <div className="form-group">
            <label htmlFor="attachmentUrl">Attachment URL (Optional)</label>
            <input 
              type="url" 
              id="attachmentUrl" 
              name="attachmentUrl" 
              value={formData.attachmentUrl}
              onChange={handleChange}
              placeholder="Enter URL of attachment file"
            />
          </div>
        )}

        <div className="form-actions">
          <button type="button" onClick={() => navigate("/dashboard")}>
            Cancel
          </button>
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;