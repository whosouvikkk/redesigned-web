import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import ProtectedData from './pages/ProtectedData';
import Overview from './pages/Dashboard/Overview';
import Lookup from './pages/Dashboard/Lookup';
import History from './pages/Dashboard/History';
import Billing from './pages/Dashboard/Billing';
import AdminDashboard from './pages/Admin/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/protected-data" element={<ProtectedData />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Overview />} />
        <Route path="/dashboard/lookup" element={<Lookup />} />
        <Route path="/dashboard/history" element={<History />} />
        <Route path="/dashboard/billing" element={<Billing />} />

        {/* Admin Route */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
