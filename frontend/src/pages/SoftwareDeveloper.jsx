// pages/OperationsManager.jsx
import React from "react";
import { Link } from "react-router-dom";
import './RoleStyle.css';

const courses = [
  { title: "Clean Code: A Handbook of Agile Software Craftsmanship by Robert C. Martin", pdf: "https://shorturl.at/KU4aK" },
  { title: "The Pragmatic Programmer by Andrew Hunt and David Thomas", pdf: "https://shorturl.at/QSb5I" },
  { title: "Software-Development-Fundamentals", pdf: "https://shorturl.at/BSoTM" },
];

const hiringCompanies = ["SHORTHILLS","ODOO", "INCTURE"];

export default function SoftwareDeveloper() {
  return (
    <div className="main-container">
          <div className="role-section">
             {/* Back to Roles - now at top */}
            <Link to="/" className="back-link">← Back to Home</Link>
    
            <div className="role-subtitle">Role :</div>
            <div className="role-title">Software Developer</div>
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
    