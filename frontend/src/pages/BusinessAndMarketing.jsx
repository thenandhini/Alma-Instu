// pages/SupplyChainManager.jsx
import React from "react";
import { Link } from "react-router-dom";
import './RoleStyle.css';

const courses = [
  { title: "Kotler on Marketing by Philip Kotler", pdf: "https://shorturl.at/3lctj" },
  { title: "Marketing Management by Philip Kotler & Kevin Keller", pdf: "https://rb.gy/zfwh0l" },
  { title: "Fundamentals of Business Marketing Research - Reid- D.A", pdf: "https://rb.gy/xp42p4" },
];

const hiringCompanies = ["ZOMATO", "POLYCAB"];

export default function BusinessAndMarketing() {
  return (
   <div className="main-container">
         <div className="role-section">
            {/* Back to Roles - now at top */}
           <Link to="/" className="back-link">← Back to Home</Link>
   
           <div className="role-subtitle">Role :</div>
           <div className="role-title">Business and Marketing</div>
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
   