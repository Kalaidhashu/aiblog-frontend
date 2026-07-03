import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import TipTapEditor from '../components/blog/TipTapEditor';  // Change this line
import AIGrammarCorrector from '../components/ai/AIGrammarCorrector';
import AIBlogGenerator from '../components/ai/AIBlogGenerator';
import { FiSave, FiArrowLeft, FiCpu, FiCheckSquare } from 'react-icons/fi';
import toast from 'react-hot-toast';

const CreateBlogPage = () => {
    const navigate = useNavigate();
    const { createBlog } = useBlog();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'Technology',
        tags: '',
        summary: '',
    });
    const [loading, setLoading] = useState(false);
    const [showGrammarCorrector, setShowGrammarCorrector] = useState(false);
    const [showAIGenerator, setShowAIGenerator] = useState(false);

    const categories = ['Technology', 'Science', 'Health', 'Business', 'Education', 'Entertainment', 'Travel', 'Food', 'Other'];

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

        setLoading(true);
        const blog = await createBlog(formData);
        setLoading(false);
        
        if (blog) {
            navigate(`/blog/${blog._id}`);
        }
    };

    return (
        <div className="create-blog-page fade-in">
            <div className="page-header">
                <button onClick={() => navigate(-1)} className="back-btn">
                    <FiArrowLeft /> Back
                </button>
                <h1>Create New Blog</h1>
                <div className="ai-tools-buttons">
                    <button 
                        className="btn btn-outline"
                        onClick={() => setShowAIGenerator(true)}
                    >
                        <FiCpu /> AI Generator
                    </button>
                    <button 
                        className="btn btn-outline"
                        onClick={() => setShowGrammarCorrector(true)}
                    >
                        <FiCheckSquare /> Grammar Check
                    </button>
                </div>
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
                    <button type="submit" disabled={loading} className="btn btn-primary">
                        <FiSave /> {loading ? 'Publishing...' : 'Publish Blog'}
                    </button>
                </div>
            </form>

            {/* AI Generator Modal */}
            {showAIGenerator && (
                <div className="modal-overlay" onClick={() => setShowAIGenerator(false)}>
                    <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowAIGenerator(false)}>×</button>
                        <AIBlogGenerator 
                            onGenerate={(blog) => {
                                setFormData({
                                    title: blog.title,
                                    content: blog.content,
                                    category: formData.category,
                                    tags: blog.tags?.join(', ') || '',
                                    summary: blog.introduction,
                                });
                                setShowAIGenerator(false);
                                toast.success('Blog content generated!');
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Grammar Corrector Modal */}
            {showGrammarCorrector && (
                <div className="modal-overlay" onClick={() => setShowGrammarCorrector(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowGrammarCorrector(false)}>×</button>
                        <AIGrammarCorrector
    textToCorrect={formData.content}
    onCorrect={(corrected) => {
        setFormData(prev => ({
            ...prev,
            content: corrected,
        }));

        toast.success('Content updated successfully!');
        setShowGrammarCorrector(false);
    }}
/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateBlogPage;