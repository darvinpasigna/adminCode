import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';

const Sidebar = ({ countPC, countPhone, countConsGame }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="d-flex">
      {/* Arrow Button to toggle sidebar */}
      <div className="sidebar-toggle" onClick={toggleSidebar} style={{ cursor: 'pointer', padding: '10px'}}>
        {isSidebarOpen ? '←' : '→'}
      </div>
      
      {/* Sidebar */}
      <nav className={`sidebar navbar navbar-expand-lg ${isSidebarOpen ? 'open' : ''}`} data-bs-theme="dark" style={{ width: isSidebarOpen ? '250px' : '0', transition: 'width 0.3s' }}>
        <div className="container-fluid flex-column">
          <div className={`collapse navbar-collapse ${isSidebarOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex-column">
              <br />
              <h5 style={{ color: "white" }}>Inventory</h5>
              <li className="nav-item mb-2">
                <Link className="add nav-link" to="/addproduct">ADD PRODUCT</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/PC">PC ({countPC})</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/phone">Smart Phone ({countPhone})</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Tablet</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/consgame">Console Game ({countConsGame})</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Accessories</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
