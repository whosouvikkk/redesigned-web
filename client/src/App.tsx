import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedData from './pages/ProtectedData';
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import Overview from './pages/Dashboard/Overview';
import Lookup from './pages/Dashboard/Lookup';
import Billing from './pages/Dashboard/Billing';
import Checkout from './pages/Dashboard/Checkout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import TOS from './pages/TOS';
import Privacy from './pages/Privacy';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/protected-data" element={<ProtectedData />} />
        
        {/* New Policy Routes */}
        <Route path="/tos" element={<TOS />} />
        <Route path="/privacy" element={<Privacy />} />
        
        {/* User Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="lookup" element={<Lookup />} />
          <Route path="billing" element={<Billing />} />
          <Route path="checkout/:planId" element={<Checkout />} />
        </Route>

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
