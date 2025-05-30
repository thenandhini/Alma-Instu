import React from "react";
import { Link } from "react-router-dom";
import './RoleStyle.css'; // Using the same CSS
 // Make sure you save your second image as this in assets

const courses = [
  { title: "Intro to Engineering", pdf: "/pdfs/intro_engineering.pdf" },
  { title: "Project Management Basics", pdf: "/pdfs/project_management_basics.pdf" },
  { title: "Project Management Basics", pdf: "/pdfs/project_management_basics.pdf" },
];

const hiringCompanies = ["AMAZON"];

export default function AdvancedSystemAnalyst() {
  return (
    <div className="main-container">
          <div className="role-section">
             {/* Back to Roles - now at top */}
            <Link to="/" className="back-link">← Back to Home</Link>
    
            <div className="role-subtitle">Role :</div>
            <div className="role-title">Advanced System Analyst</div>
            <div className="role-box">
              <ul className="file-list">
                {courses.map(({ title, pdf }, idx) => (
                 <li key={idx} className="file-item">
  <span className="file-title">{title}</span>
  <a href={pdf} target="_blank" rel="noopener noreferrer">
    Click to view
  </a>
</li>
                ))}
              </ul>
            </div>
          </div>
    
          <div className="sidebar">
            <h2>Hiring Companies</h2>
            {hiringCompanies.map((company, idx) => (
              <div className="company-card" key={idx}>
                {company}
              </div>
            ))}
          </div>
        </div>
      );
    }
    