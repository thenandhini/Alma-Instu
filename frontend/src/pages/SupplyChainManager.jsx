// pages/SupplyChainManager.jsx
import React from "react";
import { Link } from "react-router-dom";
import './RoleStyle.css';

const courses = [
  { title: " Logistics and Supply Chain Management", pdf: "https://old.mu.ac.in/wp-content/uploads/2021/02/Logistics-and-Supply-Chain-Management-Martin-Christopher.pdf" },
  { title: "Lean six sigma", pdf: "https://www.sixsigmacouncil.org/wp-content/uploads/2018/08/Six-Sigma-A-Complete-Step-by-Step-Guide.pdf" },
  { title: "Supply Chain Fundamentals", pdf: "https://my.uopeople.edu/pluginfile.php/57436/mod_book/chapter/121631/BUS5116.Lu.Fundamentals.Supply.Chain.Mgmt.pdf" },
];

const hiringCompanies = ["FLIPKART"];

export default function SupplyChainManager() {
  return (
    <div className="main-container">
          <div className="role-section">
             {/* Back to Roles - now at top */}
            <Link to="/" className="back-link">← Back to Home</Link>
    
            <div className="role-subtitle">Role :</div>
            <div className="role-title">Supply Chain Manager</div>
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
    