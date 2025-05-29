// import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Roles from './pages/Roles';
import Operations from './pages/Operations';
import Alumni from './pages/Alumni';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import Profile from './pages/Profile';
// import FAQs from './pages/FAQs';
// import Contribute from './pages/Contribute';
import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

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
              <Route path="/roles/operation-manager" element ={<Operations/>}/>
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
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              /> */}
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