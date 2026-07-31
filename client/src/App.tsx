import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ProtectedData } from './pages/ProtectedData';
import { Lookup } from './pages/Dashboard/Lookup';
import { History } from './pages/Dashboard/History';
import { Billing } from './pages/Dashboard/Billing';
import { AdminDashboard } from './pages/Admin/AdminDashboard';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';

const DashboardLayout = () => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      <div className="pt-[65px] flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/protect" element={<ProtectedData />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Lookup />} />
          <Route path="history" element={<History />} />
          <Route path="billing" element={<Billing />} />
        </Route>

        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
