import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <h3>AI Blog Platform</h3>
                    <p>Create, Explore & Share AI-powered content.</p>
                </div>

                <div className="footer-links">
                    <Link to="/">Home</Link>
                    <Link to="/explore">Explore</Link>
                    <Link to="/dashboard">Dashboard</Link>  
                </div>

                <div className="footer-social">
                    <a href="https://github.com" target="_blank" rel="noreferrer">
                        <FaGithub />
                    </a>

                    <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                        <FaLinkedin />
                    </a>
                </div>
            </div>

            <div className="footer-bottom">
                © {new Date().getFullYear()} AI Blog Platform
            </div>
        </footer>
    );
};

export default Footer;