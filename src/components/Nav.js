import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Images/Logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function NavBar() {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleNavbar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <Link to="/">
                    <img id='Logo1' src={Logo} 
                    alt="logo" 
                    width={50} 
                    height={50} />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleNavbar}
                    aria-controls="navbarSupportedContent"
                    aria-expanded={!isCollapsed}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Dashboard</Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <div className="input-group input-group-sm mb-3 me-5 pt-3">
                            <button className="btn btn-outline-secondary" type="submit">
                                Search
                            </button>
                            <input type="text" className="form-control" />
                        </div>
                        <button 
                            id='btnbutton'
                            className="btn btn-outline-none" 
                            style={{ backgroundColor: "dark" }} 
                            type='button' 
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
