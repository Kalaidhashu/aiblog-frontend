import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BlogCard from '../components/blog/BlogCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import axios from 'axios';
import { FiHeart } from 'react-icons/fi';

const FavoritesPage = () => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFavorites();
    }, [user]);

    const fetchFavorites = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/favorites`);
            setFavorites(response.data);
        } catch (error) {
            console.error('Failed to fetch favorites:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="favorites-page fade-in">
            <div className="page-header">
                <h1>
                    My Favorite Blogs <FiHeart size={25}/> 
                </h1>
                <p>Blogs you've saved for later reading</p>
            </div>

            {favorites.length === 0 ? (
                <div className="empty-state">
                    <h3>No favorites yet</h3><br></br>
                    <p>Start saving blogs you love to read them later</p><br></br>
                    <Link to="/explore" className="btn btn-primary">Explore Blogs</Link>
                </div>
            ) : (
                <div className="grid">
                    {favorites.map(blog => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;