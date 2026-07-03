import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi';

const Header = ({ onMenuClick }) => {
    const { user, logout, isAuthenticated } = useAuth();
    const { darkMode, toggleDarkMode } = useTheme();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-left">
                    <button className="menu-btn" onClick={onMenuClick}>
                        <FiMenu size={24} />
                    </button>
                    <Link to="/" className="logo">
                        <span className="logo-text">AI Blog</span>
                        <span className="logo-highlight">Platform</span>
                    </Link>
                </div>

                <nav className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/explore" className="nav-link">Explore</Link>
                    {isAuthenticated && (
                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    )}
                </nav>

                <div className="header-right">
                    <button className="theme-toggle" onClick={toggleDarkMode}>
                        {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                    </button>

                    {isAuthenticated ? (
                        <div className="user-menu">
                            <button 
                                className="user-menu-btn"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                {user?.profileImage && user.profileImage !== 'default-avatar.png' ? (
                                    <img src={user.profileImage} alt={user.username} className="avatar" />
                                ) : (
                                    <div className="avatar-placeholder">
                                        {user?.username?.[0]?.toUpperCase()}
                                    </div>
                                )}
                                <FiChevronDown size={16} />
                            </button>
                            {showDropdown && (
                                <div className="dropdown-menu" onMouseLeave={() => setShowDropdown(false)}>
                                    <Link to="/profile" className="dropdown-item">
                                        <FiUser /> Profile
                                    </Link>
                                    <Link to="/dashboard" className="dropdown-item">
                                        Dashboard
                                    </Link>
                                    {user?.role === 'admin' && (
                                        <Link to="/admin" className="dropdown-item">
                                            Admin Panel
                                        </Link>
                                    )}
                                    <hr className="dropdown-divider" />
                                    <button onClick={handleLogout} className="dropdown-item">
                                        <FiLogOut /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <Link to="/login" className="btn btn-outline">Login</Link>
                            <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;