// pages/SupplyChainManager.jsx
import React from "react";
import { Link } from "react-router-dom";
import './RoleStyle.css';

const courses = [
  { title: "Data Science for Business by Foster Provost & Tom Fawcett", pdf: "https://shorturl.at/rBKtL" },
  { title: "Python for Data Analysis by Wes McKinney", pdf: "https://shorturl.at/ymw9v" },
  { title: "Data Analytics Made Accessible", pdf: "https://rb.gy/6rf8lr" },
];

const hiringCompanies = ["SPECTRAMEDIX","PREFREED SQUARRE"];

export default function DataAnalyst() {
  return (
   <div className="main-container">
         <div className="role-section">
            {/* Back to Roles - now at top */}
           <Link to="/" className="back-link">← Back to Home</Link>
   
           <div className="role-subtitle">Role :</div>
           <div className="role-title">Data Analyst</div>
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
   