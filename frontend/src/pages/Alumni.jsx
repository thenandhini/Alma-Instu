import { useState, useEffect } from "react";
import api from "../services/api";
import "./Alumni.css";

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
        const batchesRes = await api.get("/api/batches");
        setBatches(batchesRes.data);

        if (batchesRes.data.length > 0) {
          setSelectedBatch(String(batchesRes.data[0].year));
        }

        const departmentsRes = await api.get("/api/departments");
        setDepartments(departmentsRes.data);

        if (departmentsRes.data.length > 0) {
          setSelectedDepartment(departmentsRes.data[0].name);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
        setLoading(false);

        // Set fallback data
        const fallbackBatches = [
          { id: 1, year: "2023" },
          { id: 2, year: "2022" },
          { id: 3, year: "2021" },
          { id: 4, year: "2020" },
        ];

        const fallbackDepartments = [
          { id: 1, name: "Industrial and Production Engineering" },
          { id: 2, name: "Computer Science Engineering" },
          { id: 3, name: "Mechanical Engineering" },
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
      console.log("🚀 ~ useEffect ~ fetchAlumni triggered", )
     
  }, [selectedBatch, selectedDepartment]);

  const fetchAlumni = async (batch, department) => {
    setLoading(true);
    try {
      const response = await api.get(
        `/api/alumni?batch=${batch}&department=${department}`
      );
      console.log("🚀 ~ fetchAlumni ~ response:", response);
      
      if (response.data && response.data.length === 0) {
        console.log("Empty response, using fallback data");
        throw new Error("No data available from API");
      }
      
      setAlumni(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching alumni:", err);
      setLoading(false);

      const fallbackAlumniData = {
        2023: {
          "Computer Science Engineering": [
            {
              id: 1,
              name: "John Doe",
              company: "Amazon",
              role: "Software Developer",
              linkedin: "https://linkedin.com/in/johndoe",
            },
            {
              id: 2,
              name: "Jane Smith",
              company: "Microsoft",
              role: "Product Manager",
              linkedin: "https://linkedin.com/in/janesmith",
            },
          ],
          "Mechanical Engineering": [
            {
              id: 3,
              name: "Emily Davis",
              company: "Ford",
              role: "Automotive Engineer",
              linkedin: "https://linkedin.com/in/emilydavis",
            },
          ],
        },
        2022: {
          "Industrial and Production Engineering": [
            {
              id: 4,
              name: "Michael Brown",
              company: "GE",
              role: "Manufacturing Engineer",
              linkedin: "https://linkedin.com/in/michaelbrown",
            },
          ],
          "Computer Science Engineering": [
            {
              id: 5,
              name: "Alex Johnson",
              company: "Google",
              role: "Data Scientist",
              linkedin: "https://linkedin.com/in/alexjohnson",
            },
          ],
        },
        2021: {
          "Mechanical Engineering": [
            {
              id: 6,
              name: "Sarah Williams",
              company: "Apple",
              role: "UX Designer",
              linkedin: "https://linkedin.com/in/sarahwilliams",
            },
          ],
        },
        2020: {
          "Computer Science Engineering": [
            {
              id: 7,
              name: "Liam Moore",
              company: "Netflix",
              role: "DevOps Engineer",
              linkedin: "https://linkedin.com/in/liammoore",
            },
          ],
          "Industrial and Production Engineering": [
            {
              id: 8,
              name: "Olivia Thomas",
              company: "Bosch",
              role: "Process Engineer",
              linkedin: "https://linkedin.com/in/oliviathomas",
            },
          ],
        },
      };

      console.log("Selected batch:", batch);
      console.log("Selected department:", department);
      console.log("Available batches in mock data:", Object.keys(fallbackAlumniData));
      console.log("Available departments for batch:", fallbackAlumniData[batch] ? Object.keys(fallbackAlumniData[batch]) : 'No departments');

      const mockAlumni = fallbackAlumniData[batch]?.[department] || [];
      
      if (mockAlumni.length === 0) {
        setError(`No alumni data available for batch ${batch} and department ${department}`);
      } else {
        setError(null);
        setAlumni(mockAlumni);
      }
    }
};
 

  const handleBatchChange = (e) => {
    setSelectedBatch(String(e.target.value));
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
            value={selectedBatch || "2020"}
            onChange={handleBatchChange}
            disabled={loading}
          >

            {batches.map((batch) => (
              <option key={batch.id} value={batch.year}>
                {batch.year}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="department-select">Select Department:</label>
          <select
            id="department-select"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            disabled={loading}
          >
            {departments.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
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
                alumni.map((alumnus) => (
                  <tr key={alumnus.id}>
                    <td>{alumnus.name}</td>
                    <td>{alumnus.company}</td>
                    <td>{alumnus.role}</td>
                    <td>
                      <a
                        href={alumnus.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="linkedin-link"
                      >
                        Profile
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">
                    No alumni data available for this selection.
                  </td>
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
