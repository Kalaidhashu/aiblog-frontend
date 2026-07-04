import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBlog } from '../context/BlogContext';
// import BlogCard from '../components/blog/BlogCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { FiPlusCircle, FiEdit2, FiTrash2, FiEye, FiHeart } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const DashboardPage = () => {
    const { user } = useAuth();
    const { deleteBlog } = useBlog();
    const [myBlogs, setMyBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalBlogs: 0,
        totalViews: 0,
        totalLikes: 0,
        totalComments: 0,
    });

    // useEffect(() => {
    //     fetchMyBlogs();
    // }, []);
    useEffect(() => {
    if (user?._id) {
        fetchMyBlogs();
    }
}, [fetchMyBlogs,user]);



    const fetchMyBlogs = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/blogs?author=${user._id}`);
            setMyBlogs(response.data.blogs);
            
            // Calculate stats
            const views = response.data.blogs.reduce((sum, blog) => sum + (blog.views || 0), 0);
            const likes = response.data.blogs.reduce((sum, blog) => sum + (blog.likes?.length || 0), 0);
            
            setStats({
                totalBlogs: response.data.blogs.length,
                totalViews: views,
                totalLikes: likes,
                totalComments: 0, // Would need to fetch comments count
            });
        } catch (error) {
            console.error('Failed to fetch blogs:', error);
            toast.error('Failed to load dashboard');
        } finally {
            setLoading(false);
        }
    }, [user]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            const success = await deleteBlog(id);
            if (success) {
                setMyBlogs(myBlogs.filter(blog => blog._id !== id));
            }
        }
    };

    if (loading) return <LoadingSpinner />;

    return (

        <div className="dashboard-page fade-in">

    {/* HEADER */}
    <div className="dashboard-header">
        <div>
            <h2>Welcome Back!!</h2>
            <p>Manage your AI blogs and track your performance.</p>
        </div>

        <Link to="/create" className="btn btn-primary dashboard-create-btn">
            <FiPlusCircle />
            Create New Blog
        </Link>
    </div>

    {/* STATS */}
    <div className="dashboard-stats">

        <div className="stats-card">
            <div className="stats-icon purple">📝</div>

            <div>
                <h3>{stats.totalBlogs}</h3>
                <p>Total Blogs</p>
            </div>
        </div>

        <div className="stats-card">
            <div className="stats-icon blue">👁</div>

            <div>
                <h3>{stats.totalViews}</h3>
                <p>Total Views</p>
            </div>
        </div>

        <div className="stats-card">
            <div className="stats-icon pink">♡</div>

            <div>
                <h3>{stats.totalLikes}</h3>
                <p>Total Likes</p>
            </div>
        </div>
        <div className="stat-card favorites-card">
    <Link to="/favorites" className="favorites-link">
        <FiHeart size={28} />
        <h3>My Favorites</h3>
        <p>View Saved Blogs</p>
    </Link>
</div>

    </div>

    {/* BLOG SECTION */}
    <div className="dashboard-section">

        <div className="section-top">
            <h2>My Blogs</h2>

            <Link to="/explore">
                View All →
            </Link>
        </div>

        {myBlogs.length === 0 ? (

            <div className="empty-dashboard">

                <img
                    src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
                    alt="empty"
                />

                <h3>No blogs created yet</h3>

                <p>
                    Start creating amazing AI-powered blogs and share your ideas.
                </p>

                <Link to="/create" className="btn btn-primary">
                    Create Your First Blog
                </Link>

            </div>

        ) : (
            <div className="dashboard-blog-list">

    {myBlogs.map(blog => (

        <div className="dashboard-blog-card" key={blog._id}>

            {/* LEFT */}
            <div className="dashboard-blog-left">

                <div className="blog-avatar">
                    📝
                </div>

                <div className="dashboard-blog-info">

                    <h3>{blog.title}</h3>

                    <div className="dashboard-blog-meta">

                        <span className="category-pill">
                            {blog.category}
                        </span>

                        <span>👁 {blog.views || 0} Views</span>

                        <span>♡ {blog.likes?.length || 0} Likes</span>

                        <span>
                            📅 {new Date(blog.createdAt).toLocaleDateString()}
                        </span>

                    </div>

                </div>

            </div>

            {/* RIGHT */}
            <div className="dashboard-blog-actions">

                <Link
                    to={`/blog/${blog._id}`}
                    className="dashboard-action-btn"
                >
                    <FiEye />
                </Link>

                <Link
                    to={`/edit/${blog._id}`}
                    className="dashboard-action-btn"
                >
                    <FiEdit2 />
                </Link>

                <button
                    onClick={() => handleDelete(blog._id)}
                    className="dashboard-action-btn delete"
                >
                    <FiTrash2 />
                </button>

            </div>

        </div>

    ))}

</div>

        )}

    </div>

</div>

    );
};

export default DashboardPage;