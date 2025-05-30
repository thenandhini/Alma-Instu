// import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Roles from "./pages/Roles";
import Alumni from "./pages/Alumni";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import GraduateEngineerTrainee from "./pages/GraduateEngineerTrainee";
import OperationManager from "./pages/OperationManager";
import SupplyChainManager from "./pages/SupplyChainManager";
import DevOpsEngineer from "./pages/DevOpsEngineer";
import BusinessAndMarketing from "./pages/BusinessAndMarketing";
import SalesGrowthManager from "./pages/SalesGrowthManager";
import AdvancedSystemAnalyst from "./pages/AdvancedSystemAnalyst";
import SoftwareDeveloper from "./pages/SoftwareDeveloper";
import DataAnalyst from "./pages/DataAnalyst";
import Profile from "./pages/Profile";
// import FAQs from './pages/FAQs';
// import Contribute from './pages/Contribute';
import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from './components/ProtectedRoute';
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/roles" element={<Roles />} />
              <Route
                path="/roles/operation-manager"
                element={<OperationManager />}
              />
              <Route
                path="/roles/graduate-engineer-trainee"
                element={<GraduateEngineerTrainee />}
              />
              <Route
                path="/roles/supply-chain-manager"
                element={<SupplyChainManager />}
              />
              <Route
                path="/roles/devops-engineer"
                element={<DevOpsEngineer />}
              />
              <Route
                path="/roles/business-and-marketing"
                element={<BusinessAndMarketing />}
              />
              <Route
                path="/roles/sales-growth-manager"
                element={<SalesGrowthManager />}
              />
              <Route
                path="/roles/advanced-system-analyst"
                element={<AdvancedSystemAnalyst />}
              />
              <Route
                path="/roles/software-developer"
                element={<SoftwareDeveloper />}
              />
              <Route path="/roles/data-analyst" element={<DataAnalyst />} />

              {/* <Route path="/roles/:roleName" element={<RoleDetail />} /> */}
              <Route path="/alumni" element={<Alumni />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="/faqs" element={<FAQs />} /> */}
              <Route
                path="/dashboard"
                element={
                  // <ProtectedRoute>
                  <Dashboard />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/create-post"
                element={
                  // <ProtectedRoute>
                  <CreatePost />
                  // </ProtectedRoute>
                }
              />
              <Route path="/profile" element={<Profile />} />
              {/* <Route 
                path="/contribute" 
                element={
                  <ProtectedRoute>
                    <Contribute />
                  </ProtectedRoute>
                } 
              /> */}
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
