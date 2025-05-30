// pages/SupplyChainManager.jsx
import React from "react";
import { Link } from "react-router-dom";
import './RoleStyle.css';

const courses = [
  { title: "Site Reliability Engineering: How Google Runs Production Systems", pdf: "https://shorturl.at/HbfTz" },
  { title: "The DevOps Handbook: How to Create World-Class Agility, Reliability, & Security", pdf: "https://shorturl.at/zj0cn" },
  { title: "KS_Narasimhan-A_Beginner's_Handbook_to_DevOps", pdf: "https://shorturl.at/C31Q2" },
];

const hiringCompanies = ["RAPIDFORT", "UNTHINKABLE"];

export default function DevOpsEngineer() {
  return (
   <div className="main-container">
         <div className="role-section">
            {/* Back to Roles - now at top */}
           <Link to="/" className="back-link">← Back to Home</Link>
   
           <div className="role-subtitle">Role :</div>
           <div className="role-title">DevOps Engineer</div>
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
   
