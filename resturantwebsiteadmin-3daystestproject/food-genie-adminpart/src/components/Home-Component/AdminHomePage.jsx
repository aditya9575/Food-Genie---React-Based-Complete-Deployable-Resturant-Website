import React from 'react';
import Dashboard from '../dashboard-component/Dashboard';
import Sidebar from '../sidebar-component/Sidebar';
import CustomNavbar from '../navbar-component/CustomNavbar';
import './adminHome.css';
import { useEffect } from 'react';

const AdminHomePage = () => {

  useEffect(() => {
    const hasReloaded = localStorage.getItem("adminhomePageReloaded");

    if (!hasReloaded) {
      localStorage.setItem("adminhomePageReloaded", "true");
      window.location.reload();
    }
  }, []);

  return (
    <div className="admin-home">
      <CustomNavbar />
      <Sidebar />
      <div className="main-content">
        <Dashboard />
      </div>
    </div>
  );
};

export default AdminHomePage;
