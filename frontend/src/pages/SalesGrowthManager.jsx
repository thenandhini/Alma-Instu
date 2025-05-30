// pages/OperationsManager.jsx
import React from "react";
import { Link } from "react-router-dom";
import './RoleStyle.css';
const courses = [
  { title: "Sales Growth", pdf: "https://shorturl.at/Ltdti" },
  { title: "Sales Management", pdf: "https://shorturl.at/Jgabi" },
  { title: "The Art of Mastering Sales Management", pdf: "https://shorturl.at/nx864" },
];

const hiringCompanies = ["POLYCAB", "ZOMATO"];

export default function SalesGrowthManager() {
  return (
   <div className="main-container">
         <div className="role-section">
            {/* Back to Roles - now at top */}
           <Link to="/" className="back-link">← Back to Home</Link>
   
           <div className="role-subtitle">Role :</div>
           <div className="role-title">Sales Growth Manager</div>
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
   