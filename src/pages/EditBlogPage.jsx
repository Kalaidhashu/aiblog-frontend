import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';
import TipTapEditor from '../components/blog/TipTapEditor';  // Change this line
import LoadingSpinner from '../components/common/LoadingSpinner';
import { FiSave, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';

const EditBlogPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getBlog, updateBlog } = useBlog();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        tags: '',
        summary: '',
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const categories = ['Technology', 'Science', 'Health', 'Business', 'Education', 'Entertainment', 'Travel', 'Food', 'Other'];

    useEffect(() => {
        loadBlog();
    }, [id,user]);

    // const loadBlog = async () => {
    //     const blog = await getBlog(id);
    //     if (blog) {
    //         setFormData({
    //             title: blog.title,
    //             content: blog.content,
    //             category: blog.category,
    //             tags: blog.tags?.join(', ') || '',
    //             summary: blog.summary || '',
    //         });
    //     }
    //     setLoading(false);
    // };
    const loadBlog = async () => {

    const blog = await getBlog(id);

    // Blog not found
    if (!blog) {
        toast.error('Blog not found');
        navigate('/dashboard');
        return;
    }

    // Unauthorized user
    if (
        blog.author?._id !== user?._id &&
        user?.role !== 'admin'
    ) {
        toast.error('Unauthorized access');
        navigate('/dashboard');
        return;
    }

    setFormData({
        title: blog.title,
        content: blog.content,
        category: blog.category,
        tags: blog.tags?.join(', ') || '',
        summary: blog.summary || '',
    });

    setLoading(false);
   };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleContentChange = (content) => {
        setFormData({
            ...formData,
            content,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.title.trim()) {
            toast.error('Please enter a title');
            return;
        }
        if (!formData.content.trim()) {
            toast.error('Please enter content');
            return;
        }

        setSubmitting(true);
        const blog = await updateBlog(id, formData);
        setSubmitting(false);
        
        if (blog) {
            navigate(`/blog/${blog._id}`);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="create-blog-page fade-in">
            <div className="page-header">
                <button onClick={() => navigate(-1)} className="back-btn">
                    <FiArrowLeft /> Back
                </button>
                <h1>Edit Blog</h1>
            </div>

            <form onSubmit={handleSubmit} className="blog-form">
                <div className="form-group">
                    <label className="form-label">Title *</label>
                    <input
                        type="text"
                        name="title"
                        className="form-input"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter an engaging title"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Category *</label>
                    <select
                        name="category"
                        className="form-select"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Tags (comma-separated)</label>
                    <input
                        type="text"
                        name="tags"
                        className="form-input"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="react, javascript, webdev"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Short Summary (optional)</label>
                    <textarea
                        name="summary"
                        className="form-textarea"
                        value={formData.summary}
                        onChange={handleChange}
                        placeholder="A brief summary of your blog"
                        rows={3}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Content *</label>
                    {/* REPLACE THIS SECTION - Remove SimpleEditor and add TipTapEditor */}
                    <TipTapEditor
                        value={formData.content}
                        onChange={handleContentChange}
                        placeholder="Write your blog content here..."
                    />
                </div>

                <div className="form-actions">
                    <button type="button" onClick={() => navigate(-1)} className="btn btn-outline">
                        Cancel
                    </button>
                    <button type="submit" disabled={submitting} className="btn btn-primary">
                        <FiSave /> {submitting ? 'Updating...' : 'Update Blog'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBlogPage;