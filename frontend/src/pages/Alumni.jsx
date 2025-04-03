import { useState, useEffect } from 'react';
import api from '../services/api';
import './Alumni.css';

const Alumni = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBatchesAndDepartments = async () => {
      try {
        const batchesRes = await api.get('/api/batches');
        setBatches(batchesRes.data);
        
        if (batchesRes.data.length > 0) {
          setSelectedBatch(batchesRes.data[0].year);
        }
        
        const departmentsRes = await api.get('/api/departments');
        setDepartments(departmentsRes.data);
        
        if (departmentsRes.data.length > 0) {
          setSelectedDepartment(departmentsRes.data[0].name);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
        
        // Set fallback data
        const fallbackBatches = [
          { id: 1, year: '2023' },
          { id: 2, year: '2022' },
          { id: 3, year: '2021' },
          { id: 4, year: '2020' }
        ];
        
        const fallbackDepartments = [
          { id: 1, name: 'Industrial and Production Engineering' },
          { id: 2, name: 'Computer Science Engineering' },
          { id: 3, name: 'Mechanical Engineering' }
        ];
        
        setBatches(fallbackBatches);
        setSelectedBatch(fallbackBatches[0].year);
        setDepartments(fallbackDepartments);
        setSelectedDepartment(fallbackDepartments[0].name);
      }
    };

    fetchBatchesAndDepartments();
  }, []);

  useEffect(() => {
    if (selectedBatch && selectedDepartment) {
      fetchAlumni(selectedBatch, selectedDepartment);
    }
  }, [selectedBatch, selectedDepartment]);

  const fetchAlumni = async (batch, department) => {
    setLoading(true);
    try {
      const response = await api.get(`/api/alumni?batch=${batch}&department=${department}`);
      setAlumni(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching alumni:', err);
      setError('Failed to load alumni data. Please try again later.');
      setLoading(false);
      
      // Set fallback alumni data
      const fallbackAlumni = [
        { 
          id: 1, 
          name: 'John Doe', 
          company: 'Amazon', 
          role: 'Software Developer', 
          linkedin: 'https://linkedin.com/in/johndoe' 
        },
        { 
          id: 2, 
          name: 'Jane Smith', 
          company: 'Microsoft', 
          role: 'Product Manager', 
          linkedin: 'https://linkedin.com/in/janesmith' 
        },
        { 
          id: 3, 
          name: 'Alex Johnson', 
          company: 'Google', 
          role: 'Data Scientist', 
          linkedin: 'https://linkedin.com/in/alexjohnson' 
        },
        { 
          id: 4, 
          name: 'Sarah Williams', 
          company: 'Apple', 
          role: 'UX Designer', 
          linkedin: 'https://linkedin.com/in/sarahwilliams' 
        },
        { 
          id: 5, 
          name: 'Michael Brown', 
          company: 'Netflix', 
          role: 'DevOps Engineer', 
          linkedin: 'https://linkedin.com/in/michaelbrown' 
        }
      ];
      
      setAlumni(fallbackAlumni);
    }
  };

  const handleBatchChange = (e) => {
    setSelectedBatch(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  return (
    <div className="alumni-page">
      <h1 className="section-title">Alumni Directory</h1>
      <div className="divider"></div>

      <div className="filters">
        <div className="filter-group">
          <label htmlFor="batch-select">Select Batch:</label>
          <select 
            id="batch-select" 
            value={selectedBatch || ''} 
            onChange={handleBatchChange}
            disabled={loading}
          >
            {batches.map(batch => (
              <option key={batch.id} value={batch.year}>{batch.year}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="department-select">Select Department:</label>
          <select 
            id="department-select" 
            value={selectedDepartment || ''} 
            onChange={handleDepartmentChange}
            disabled={loading}
          >
            {departments.map(dept => (
              <option key={dept.id} value={dept.name}>{dept.name}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading alumni data...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="alumni-table-container">
          <table className="alumni-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Role</th>
                <th>LinkedIn</th>
              </tr>
            </thead>
            <tbody>
              {alumni.length > 0 ? (
                alumni.map(alumnus => (
                  <tr key={alumnus.id}>
                    <td>{alumnus.name}</td>
                    <td>{alumnus.company}</td>
                    <td>{alumnus.role}</td>
                    <td>
                      <a href={alumnus.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-link">
                        Profile
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">No alumni data available for this selection.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Alumni;