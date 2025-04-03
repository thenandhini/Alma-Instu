import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './Roles.css';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get('/api/roles');
        setRoles(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching roles:', err);
        setError('Failed to load roles. Please try again later.');
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  // Fallback data in case API fails
  const fallbackRoles = [
    { id: 1, name: 'Graduate Engineer Trainee' },
    { id: 2, name: 'Supply Chain Manager' },
    { id: 3, name: 'Operation Manager' },
    { id: 4, name: 'DevOps Engineer' },
    { id: 5, name: 'Business and Marketing' },
    { id: 6, name: 'Sales Growth Manager' },
    { id: 7, name: 'Advanced System Analyst' },
    { id: 8, name: 'Software Developer' },
    { id: 9, name: 'Data Analyst' }
  ];

  const displayRoles = roles.length > 0 ? roles : fallbackRoles;

  if (loading) {
    return <div className="loading">Loading roles...</div>;
  }

  return (
    <div className="roles-page">
      <h1 className="section-title">Roles</h1>
      <div className="divider"></div>

      <div className="roles-grid">
        {displayRoles.map(role => (
          <Link to={`/roles/${role.name.replace(/\s+/g, '-').toLowerCase()}`} key={role.id} className="role-card">
            <h3>{role.name}</h3>
          </Link>
        ))}
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Roles;