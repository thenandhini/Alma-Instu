import React from "react";
import { Link } from "react-router-dom";
import './RoleStyle.css';

const courses = [
  { title: "Lean six sigma", pdf: "https://www.sixsigmacouncil.org/wp-content/uploads/2018/08/Six-Sigma-A-Complete-Step-by-Step-Guide.pdf" },
  { title: "Manufacturing Engineering", pdf: "https://drive.google.com/file/d/15Ll-8bf2RMJloJRujOZWFZuaVNOkRiQM/view?usp=drivesdk" },
  { title: "Industrial and System Engineering ", pdf: "https://drive.google.com/file/d/1EVFpA6NO15kNqSE0TRuLW9CD3YOmaZG9/view?usp=drivesdk" },
  { title: " Logistics and Supply Chain Management", pdf: "https://old.mu.ac.in/wp-content/uploads/2021/02/Logistics-and-Supply-Chain-Management-Martin-Christopher.pdf" },
];

const hiringCompanies = ["JUBILANT FOODWORKS LIMITED", "CUBASTIAN", "RHI MAGNESITA", "SUBROS","NECO JAISWAL","LISTENLIGHTS"];

export default function GraduateEngineerTrainee() {
  return (
    <div className="main-container">
      <div className="role-section">
         {/* Back to Roles - now at top */}
        <Link to="/" className="back-link">← Back to Home</Link>

        <div className="role-subtitle">Role :</div>
        <div className="role-title">Graduate Engineer Trainee</div>
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
