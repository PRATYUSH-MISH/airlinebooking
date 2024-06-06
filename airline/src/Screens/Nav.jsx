// // Navbar.jsx
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import "./Navbar.css";

import Logo from "../static/img/icon.png"
//const navigate=useNavigate();
const Nav = () => {


    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const closeMenuOnMobile = () => {
        if (window.innerWidth <= 1150) {
            setShowMenu(false);
        }
    };
    const handleLogout=()=>{
        localStorage.removeItem('authToken');
       // navigate('/login')
    }
    return (
        <header className="header">
            <nav className="nav container">
                <NavLink to="/" className="nav__logo">
                    <img className="nav__logo" src={Logo} alt="Logo" />
                    Airline Booking
                </NavLink>

                <div
                    className={`nav__menu ${showMenu ? "show-menu" : ""}`}
                    id="nav-menu"
                >
                    <ul className="nav__list">
                        <li className="nav__item">
                            <NavLink to="/" className="nav__link" onClick={closeMenuOnMobile}>
                                Home
                            </NavLink>
                        </li>
                        
                        <li className="nav__item">
                            <NavLink
                                to="/aboutus"
                                className="nav__link"
                                onClick={closeMenuOnMobile}
                            >
                                About Us
                            </NavLink>
                        </li>
                        {(localStorage.getItem("authToken"))?
                            <li className="nav__item">
                                <NavLink
                                    to="/profile"
                                    className="nav__link"
                                    onClick={closeMenuOnMobile}
                                >
                                    Profile
                                </NavLink>
                            </li>
                    
                  : ""  }
                      
                         {/* if not login */}
                        {(!localStorage.getItem("authToken"))?
                            <div className='nav container'>

                                <li className="nav__item">
                                    <NavLink to="/login" className="nav__link nav__cta">
                                        Login
                                    </NavLink>
                                </li>
                                <li className="nav__item">
                                    <NavLink to="/signup" className="nav__link nav__cta">
                                        Sign Up
                                    </NavLink>
                                </li>


                            </div>  
                    
                   :   

                   <div className='nav container'>
                                <li className="nav__item">
                                    <NavLink to='/login'  className="nav__link nav__cta"
                                    onClick={handleLogout}
                                    >
                                        LogOut
                                    </NavLink>
                                </li>
                   </div>
                   
                   }
                       

                           
                    </ul>
                    <div className="nav__close" id="nav-close" onClick={toggleMenu}>
                        <IoClose />
                    </div>
                </div>

                <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
                    <IoMenu />
                </div>
            </nav>
        </header>
    )



}
export default Nav;





