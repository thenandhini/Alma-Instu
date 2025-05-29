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
          { id: 1, year: "2025" },
          { id: 2, year: "2021" },
          { id: 3, year: "2020" },
          { id: 4, year: "2019" },
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
    
     
  }, [selectedBatch, selectedDepartment]);

  const fetchAlumni = async (batch, department) => {
    setLoading(true);
    try {
      const response = await api.get(
        `/api/alumni?batch=${batch}&department=${department}`
      );
   
      
      if (response.data && response.data.length === 0) {
   
        throw new Error("No data available from API");
      }
      
      setAlumni(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching alumni:", err);
      setLoading(false);

      const fallbackAlumniData = {
        2025: {
          "Industrial and Production Engineering": [
            {
              id: 1,
              name: "Krishan Gopal",
              company: "RHI Magnesita",
              role: "Graduate Engineer Trainee",
              linkedin: "https://linkedin.com/in/oliviathomas",
            },
            {
              id: 2,
              name: "Garv",
              company: "Mondelez",
              role: "Supply Chain",
              linkedin: "https://linkedin.com/in/oliviathomas",
            },
            {
              id: 3,
              name: "Mahinder",
              company: "Jubilant Foodworks",
              role: "Supply Chain",
              linkedin: "https://linkedin.com/in/oliviathomas",
            },
            {
              id: 4,
              name: "Manish",
              company: "Neco Jaiswal",
              role: "GET",
              linkedin: "https://linkedin.com/in/oliviathomas",
            },
            {
              id: 5,
              name: "Lovegeet",
              company: "Listen Lights",
              role: "Graduate Engineer Trainee",
              linkedin: "https://linkedin.com/in/oliviathomas",
            },
            {
              id: 6,
              name: "suraj",
              company: "Subros",
              role: "Graduate Engineer Trainee",
              linkedin: "https://linkedin.com/in/oliviathomas",
            },
            {
              id: 7,
              name: "Saurav",
              company: "Aashirvaad Pipes",
              role: "GET",
              linkedin: "https://linkedin.com/in/oliviathomas",
            },
            {
              id: 8,
              name: "Kapil",
              company: "Flipkart",
              role: "Supply Chain",
              linkedin: "https://linkedin.com/in/oliviathomas",
            },
            {
              id: 9,
              name: "Sunil",
              company: "Tex fastener",
              role: "GET",
              linkedin: "https://linkedin.com/in/oliviathomas",
            },
            {
              id: 10,
              name: "Nishant Chaudhary",
              company: "Shorthils",
              role: "SDE",
              linkedin: "https://linkedin.com/in/oliviathomas",
            },
          ],
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
        2019: {
          "Industrial and Production Engineering": [
            {
              id: 1,
              name: "vikas kumar",
              company: "incedo",
              role: "SDE",
              linkedin: "linkedin.com/in/vikaskr1",
            },
            {
              id: 2,
              name: "Ram Niwas",
              company: "Subros",
              role: "Process engineer",
              linkedin: "linkedin.com/in/ramniwasdhakar",
            },
            {
              id: 3,
              name: "Ruchi Ray",
              company: "0xppl",
              role: "SDE",
              linkedin: "linkedin.com/in/ruchi-ray-a3ab0b1ba",
            },
            {
              id: 4,
              name: "Syed Aareez",
              company: "Incedo",
              role: "SDE",
              linkedin: "linkedin.com/in/syed-aareez-63414b197",
            },
            {
              id: 5,
              name: "Titir Biswas",
              company: "Subros",
              role: "Suppy chain Analyst",
              linkedin: "linkedin.com/in/biswastitir",
            },
            {
              id: 6,
              name: "Nalin Shrivastava",
              company: "Jubliant Generics",
              role: "Asistant Manager",
              linkedin: "linkedin.com/in/nalinshrivastava",
            },
            {
              id: 7,
              name: "Nikhil Bharti",
              company: "Subros",
              role: "Research and Development Engineer",
              linkedin: "linkedin.com/in/nikhil-bharti-702766229",
            },
            {
              id: 8,
              name: "Nityam Mahajan",
              company: "Delhivery",
              role: "Operation Manger",
              linkedin: "https://linkedin.com/in/oliviathomas",
            },
            {
              id: 9,
              name: "Lakhan Kumawat",
              company: "Kaggle Notebooks Expert",
              role: "Data Analytics",
              linkedin: "linkedin.com/in/lakhan-kumawat-596b4099",
            },
            {
              id: 10,
              name: "Gourav Lalotra",
              company: "sentra.World",
              role: "SDE",
              linkedin: "linkedin.com/in/gouravlalotra",
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
          "Industrial and Production Engineering": [
            {
              id: 1,
              name: "Nandhini R",
              company: "Tata 1mg ",
              role: "Software Developer ",
              linkedin: "https://www.linkedin.com/in/the-nandhini-r",
            },
            {
              id: 2,
              name: "Vadthya Kaveri",
              company: "Jubilant Foodworks",
              role: "Graduate Engineer Trainee",
              linkedin: "https://www.linkedin.com/in/vadthya-kaveri-82b832239/",
            },

            {
              id: 3,
              name: "Krishan Gopal",
              company: "RHI Magnesita",
              role: "Graduate Engineer Trainee",
              linkedin: "linkedin.com/in/krishan-gopal-4878692b6",
            },
            {
              id: 4,
              name: "Garv",
              company: "Mondelez",
              role: "Supply Chain",
              linkedin: "linkedin.com/in/garv-arora",
            },
            {
              id: 5,
              name: "Mahinder",
              company: "Jubilant Foodworks",
              role: "Supply Chain",
              linkedin: "linkedin.com/in/mahinder-sangwal-b49b0922b",
            },
            {
              id: 6,
              name: "Devesh Mishra",
              company: "Neco Jaiswal",
              role: "GET",
              linkedin: "linkedin.com/in/devesh-mishra-430554293",
            },
            {
              id: 7,
              name: "Lovegeet",
              company: "Listen Lights",
              role: "Graduate Engineer Trainee",
              linkedin: "linkedin.com/in/lovegeet-kaur-a31b38272",
            },
            {
              id: 8,
              name: "suraj",
              company: "Subros",
              role: "Graduate Engineer Trainee",
              linkedin: "linkedin.com/in/suraj-sandal-707198260",
            },
            {
              id: 9,
              name: "Saurabh",
              company: "Aashirvaad Pipes",
              role: "GET",
              linkedin: "linkedin.com/in/saurabh-thenua-631a86228",
            },
            {
              id: 10,
              name: "Khetramohan Oram",
              company: "Proxima Steel",
              role: "GET",
              linkedin: "linkedin.com/in/khetramohan-oram",
            },
            {
              id: 11,
              name: "Sunil",
              company: "Tex fastener",
              role: "GET",
              linkedin: "linkedin.com/in/sunil-badala-63462723a",
            },
            {
              id: 12,
              name: "Nishant Chaudhary",
              company: "Shorthils",
              role: "SDE",
              linkedin: "linkedin.com/in/nishant-choudhary-a37737229",
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
              id: 1,
              name: "Amisha Attri",
              company: "Polycab",
              role: "Sales",
              linkedin: "linkedin.com/in/amisha-attri-8a39b9214",
            },
            {
              id: 2,
              name: "Aditya Gupta",
              company: "Terobots",
              role: "SDE",
              linkedin: "linkedin.com/in/aditya-25-gupta",
            },
            {
              id: 3,
              name: "Arshita Katal",
              company: "Jubilant Foodworks",
              role: "Supply Chain",
              linkedin: "linkedin.com/in/arshita-katal",
            },
            {
              id: 4,
              name: "Aniket bhujang",
              company: "Shopdeck",
              role: "Growth Lead",
              linkedin: "linkedin.com/in/bhujanganiket"
            },
            {
              id: 5,
              name: "Ishan Dubb",
              company: "Vedanta",
              role: "Graduate Engineer Trainee",
              linkedin: "linkedin.com/in/ishan-dubb-288358226",
            },
            {
              id: 6,
              name: "Jatin Gupta",
              company: "Subros",
              role: "Graduate Engineer Trainee",
              linkedin: "linkedin.com/in/jatin-gupta-6598931a7",
            },
            {
              id: 7,
              name: "Hardik Singla",
              company: "Zomato",
              role: "Sales",
              linkedin: "linkedin.com/in/hardik-singla2411",
            },
            {
              id: 8,
              name: "Naina",
              company: "Flipkart",
              role: "Supply Chain",
              linkedin: "linkedin.com/in/naina-sekhri-205a27213",
            },
            {
              id: 9,
              name: "Prerna Bhansali",
              company: "Amazon",
              role: "Supply Chain",
              linkedin: "linkedin.com/in/prerna-bhansali7",
            },
            {
              id: 10,
              name: "Shiwam Kumar",
              company: "Incture",
              role: "SDE",
              linkedin: "linkedin.com/in/shiwam-sinha-198334230",
            },
          ],
        },
      };

     

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
