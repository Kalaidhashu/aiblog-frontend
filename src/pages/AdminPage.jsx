import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiTrash2, FiUserX, FiUserCheck } from 'react-icons/fi';

const AdminPage = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [activeTab, setActiveTab] = useState('users');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.role === 'admin') {
            fetchUsers();
            fetchAllBlogs();
        }
    }, [user]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/users`);
            setUsers(response.data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            toast.error('Failed to load users');
        }
    };

    const fetchAllBlogs = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/blogs`);
            setBlogs(response.data);
        } catch (error) {
            console.error('Failed to fetch blogs:', error);
            toast.error('Failed to load blogs');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/admin/users/${userId}`);
                setUsers(users.filter(u => u._id !== userId));
                toast.success('User deleted successfully');
            } catch (error) {
                console.error('Failed to delete user:', error);
                toast.error('Failed to delete user');
            }
        }
    };

    const handleDeleteBlog = async (blogId) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/admin/blogs/${blogId}`);
                setBlogs(blogs.filter(b => b._id !== blogId));
                toast.success('Blog deleted successfully');
            } catch (error) {
                console.error('Failed to delete blog:', error);
                toast.error('Failed to delete blog');
            }
        }
    };

    const handleToggleAdmin = async (userId, currentRole) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/admin/users/${userId}/role`, {
                role: currentRole === 'admin' ? 'user' : 'admin'
            });
            setUsers(users.map(u => 
                u._id === userId ? { ...u, role: currentRole === 'admin' ? 'user' : 'admin' } : u
            ));
            toast.success('User role updated');
        } catch (error) {
            console.error('Failed to update role:', error);
            toast.error('Failed to update user role');
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="admin-page fade-in">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <p>Manage users and content</p>
            </div>

            <div className="admin-tabs">
                <button 
                    className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                >
                    Users ({users.length})
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'blogs' ? 'active' : ''}`}
                    onClick={() => setActiveTab('blogs')}
                >
                    Blogs ({blogs.length})
                </button>
            </div>

            {activeTab === 'users' && (
                <div className="admin-users">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Joined</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`role-badge ${user.role}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="admin-actions">
                                        <button 
                                            onClick={() => handleToggleAdmin(user._id, user.role)}
                                            className="action-btn-admin"
                                            title={user.role === 'admin' ? 'Remove admin' : 'Make admin'}
                                        >
                                            {user.role === 'admin' ? <FiUserX /> : <FiUserCheck />}
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="action-btn-admin delete"
                                            title="Delete user"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'blogs' && (
                <div className="admin-blogs">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Category</th>
                                <th>Views</th>
                                <th>Likes</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map(blog => (
                                <tr key={blog._id}>
                                    <td>{blog.title}</td>
                                    <td>{blog.author?.username || 'Unknown'}</td>
                                    <td>{blog.category}</td>
                                    <td>{blog.views || 0}</td>
                                    <td>{blog.likes?.length || 0}</td>
                                    <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button 
                                            onClick={() => handleDeleteBlog(blog._id)}
                                            className="action-btn-admin delete"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminPage;