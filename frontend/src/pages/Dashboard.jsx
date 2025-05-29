import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import "./Dashboard.css";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/api/posts");
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please try again later.");
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Filter posts based on type, if needed
  const filteredPosts =
    filter === "all" ? posts : posts.filter((post) => post.type === filter);

  const handleDeletePost = async (postId) => {
    if (window.confirm("Delete this post?")) {
      try {
        await api.delete(`/api/posts/${postId}`);
        setPosts(posts.filter((post) => post.id !== postId));
      } catch (err) {
        console.error("Error deleting post:", err);
        setError("Failed to delete post.");
      }
    }
  };

  const formatDate = (date) => {
    const dt = new Date(date);
    return dt.toLocaleDateString();
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <Link to="/create-post" className="create-post-btn">
          Create Post
        </Link>
      </div>

      <div className="dashboard-filters">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All Posts
        </button>
        <button
          className={`filter-btn ${filter === "study" ? "active" : ""}`}
          onClick={() => setFilter("study")}
        >
          Study Materials
        </button>
        <button
          className={`filter-btn ${filter === "tips" ? "active" : ""}`}
          onClick={() => setFilter("tips")}
        >
          Tips & Tricks
        </button>
        <button
          className={`filter-btn ${filter === "job" ? "active" : ""}`}
          onClick={() => setFilter("job")}
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
            filteredPosts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <div className="post-type-badge" data-type={post.type}>
                    {post.type === "study" && "Study Material"}
                    {post.type === "tips" && "Tips & Tricks"}
                    {post.type === "job" && "Job Opportunity"}
                  </div>
                  <h3 className="post-title">
                    {post.title}

                    <span className="download-link">
                      <a
                        href={"https://docs.google.com/document/d/1LF2S1zbhpQS4Yd_RJ_LO9eR-Oui0Yc-cOYLuyG5NQIc/edit?tab=t.0"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        [ Click here to Open]
                      </a>
                    </span>
                  </h3>
                  {/* <button
                    className="delete-post-btn"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Delete
                  </button> */}
                </div>
                <div className="post-content">
                  <p>{post.content}</p>
                </div>
                <div className="post-footer">
                  <div className="post-author">
                    <span className="author-name">{post.author.name}</span>
                    <span className="author-role">
                      {post.author.role === "alumni"
                        ? `Alumni at NITJ, 2025 Batch`
                        : `Admin, ${post.author.department}`}
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
