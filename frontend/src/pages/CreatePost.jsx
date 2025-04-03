import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import './CreatePost.css';

const CreatePost = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'study'
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
      await api.post('/api/posts', formData);
      setLoading(false);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="create-post-page">
      <h1 className="section-title">Create a New Post</h1>
      <div className="divider"></div>
      
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
            className="form-control"
            placeholder="Enter a descriptive title"
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
            className="form-control"
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
            className="form-control"
            rows="10"
            placeholder="Write your post content here..."
          ></textarea>
        </div>
        
        {formData.type === 'study' && (
          <div className="form-group">
            <label htmlFor="file">Attach File (Optional)</label>
            <input
              type="file"
              id="file"
              name="file"
              className="form-control"
            />
            <small className="form-text">Upload PDF, DOC, or PPT files (max 10MB)</small>
          </div>
        )}
        
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => navigate('/dashboard')}>
            Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Creating...' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;