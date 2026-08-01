import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedData from './pages/ProtectedData';
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import Overview from './pages/Dashboard/Overview';
import Lookup from './pages/Dashboard/Lookup';
import AdminDashboard from './pages/Admin/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/protected-data" element={<ProtectedData />} />
        
        {/* Dashboard Routes - History and Billing Removed */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="lookup" element={<Lookup />} />
        </Route>

        {/* Admin Route */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
