import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiHome, FiCompass, FiPlusCircle, FiHeart, FiUser, FiSettings, FiX } from 'react-icons/fi';

const Sidebar = ({ isOpen, onClose }) => {
    const { isAuthenticated, user } = useAuth();

    if (!isOpen) return null;

    return (
        <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="sidebar" onClick={(e) => e.stopPropagation()}>
                <div className="sidebar-header">
                    <h3>Menu</h3>
                    <button className="close-sidebar" onClick={onClose}>
                        <FiX size={24} />
                    </button>
                </div>
                
                <nav className="sidebar-nav">
                    <Link to="/" className="sidebar-link" onClick={onClose}>
                        <FiHome /> Home
                    </Link>
                    <Link to="/explore" className="sidebar-link" onClick={onClose}>
                        <FiCompass /> Explore
                    </Link>
                    
                    {isAuthenticated && (
                        <>
                            <Link to="/create" className="sidebar-link" onClick={onClose}>
                                <FiPlusCircle /> Create Blog
                            </Link>
                            <Link to="/favorites" className="sidebar-link" onClick={onClose}>
                                <FiHeart /> Favorites
                            </Link>
                            <Link to="/profile" className="sidebar-link" onClick={onClose}>
                                <FiUser /> Profile
                            </Link>
                            <Link to="/dashboard" className="sidebar-link" onClick={onClose}>
                                <FiSettings /> Dashboard
                            </Link>
                        </>
                    )}
                </nav>

                {user && (
                    <div className="sidebar-user">
                        <div className="user-info">
                            <div className="user-avatar">
                                {user.username?.[0]?.toUpperCase()}
                            </div>
                            <div>
                                <p className="username">{user.username}</p>
                                <p className="user-email">{user.email}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;