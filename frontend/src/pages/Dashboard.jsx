import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/api/posts');
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
        setLoading(false);
        
        // Set fallback data
        setFallbackPosts();
      }
    };

    fetchPosts();
  }, []);

  const setFallbackPosts = () => {
    const fallbackPosts = [
      {
        id: 1,
        title: 'Tips for Cracking Amazon Interview',
        content: 'Here are some tips that helped me crack the Amazon interview for the role of Operation Manager...',
        type: 'tips',
        author: {
          name: 'John Doe',
          role: 'alumni',
          company: 'Amazon'
        },
        createdAt: '2023-04-15T10:30:00Z'
      },
      {
        id: 2,
        title: 'Supply Chain Management Study Material',
        content: 'I\'ve compiled a comprehensive study material for Supply Chain Management that covers all the important topics...',
        type: 'study',
        author: {
          name: 'Prof. Sarah Johnson',
          role: 'teacher',
          department: 'Industrial and Production Engineering'
        },
        createdAt: '2023-04-10T14:20:00Z'
      },
      {
        id: 3,
        title: 'Job Opening at Microsoft for Industrial Engineers',
        content: 'Microsoft is hiring Industrial Engineers for their new manufacturing facility. The role involves...',
        type: 'job',
        author: {
          name: 'Jane Smith',
          role: 'alumni',
          company: 'Microsoft'
        },
        createdAt: '2023-04-05T09:15:00Z'
      },
      {
        id: 4,
        title: 'Lean Six Sigma Certification Guide',
        content: 'If you\'re looking to get certified in Lean Six Sigma, here\'s a step-by-step guide that I followed...',
        type: 'study',
        author: {
          name: 'Michael Brown',
          role: 'alumni',
          company: 'Deloitte'
        },
        createdAt: '2023-04-01T16:45:00Z'
      },
      {
        id: 5,
        title: 'Mock Interview Sessions for Placement Season',
        content: 'I\'m organizing mock interview sessions for students preparing for the upcoming placement season...',
        type: 'tips',
        author: {
          name: 'Dr. Robert Chen',
          role: 'teacher',
          department: 'Industrial and Production Engineering'
        },
        createdAt: '2023-03-28T11:30:00Z'
      }
    ];
    
    setPosts(fallbackPosts);
  };

  const filteredPosts = filter === 'all' 
    ? posts 
    : posts.filter(post => post.type === filter);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <Link to="/create-post" className="create-post-btn">Create Post</Link>
      </div>

      <div className="dashboard-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Posts
        </button>
        <button 
          className={`filter-btn ${filter === 'study' ? 'active' : ''}`}
          onClick={() => setFilter('study')}
        >
          Study Materials
        </button>
        <button 
          className={`filter-btn ${filter === 'tips' ? 'active' : ''}`}
          onClick={() => setFilter('tips')}
        >
          Tips & Tricks
        </button>
        <button 
          className={`filter-btn ${filter === 'job' ? 'active' : ''}`}
          onClick={() => setFilter('job')}
        >
          Job Opportunities
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading posts...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="posts-container">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <div className="post-type-badge" data-type={post.type}>
                    {post.type === 'study' && 'Study Material'}
                    {post.type === 'tips' && 'Tips & Tricks'}
                    {post.type === 'job' && 'Job Opportunity'}
                  </div>
                  <h3 className="post-title">{post.title}</h3>
                </div>
                <div className="post-content">
                  <p>{post.content}</p>
                </div>
                <div className="post-footer">
                  <div className="post-author">
                    <span className="author-name">{post.author.name}</span>
                    <span className="author-role">
                      {post.author.role === 'alumni' ? `Alumni at ${post.author.company}` : `Teacher, ${post.author.department}`}
                    </span>
                  </div>
                  <div className="post-date">{formatDate(post.createdAt)}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-posts">
              <p>No posts found for the selected filter.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;