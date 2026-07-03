import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBlog } from '../context/BlogContext';
import CommentSection from '../components/blog/CommentSection';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatDistanceToNow } from 'date-fns';
import { FiHeart, FiBookmark, FiEdit2, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios';

const BlogDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { getBlog, likeBlog, toggleFavorite, deleteBlog } = useBlog();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        loadBlog();
    }, [id]);

    const loadBlog = async () => {
        setLoading(true);
        const data = await getBlog(id);
        setBlog(data);
        if (data && user) {
            setIsLiked(data.likes?.includes(user._id));
            setIsFavorited(user.favorites?.includes(id));
        }
        setLoading(false);
    };

    const handleLike = async () => {
        if (!user) {
            toast.error('Please login to like blogs');
            return;
        }
        const result = await likeBlog(id);
        if (result) {
            setIsLiked(result.liked);
            setBlog(prev => ({
                ...prev,
                likes: result.liked 
                    ? [...(prev.likes || []), user._id]
                    : (prev.likes || []).filter(l => l !== user._id)
            }));
        }
    };

    const handleFavorite = async () => {
        if (!user) {
            toast.error('Please login to save favorites');
            return;
        }
        const result = await toggleFavorite(id);
        if (result) {
            setIsFavorited(result.favorited);
            toast.success(result.favorited ? 'Added to favorites' : 'Removed from favorites');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            const success = await deleteBlog(id);
            if (success) {
                navigate('/dashboard');
            }
        }
    };

    if (loading) return <LoadingSpinner />;
    if (!blog) return <div className="not-found">Blog not found</div>;

    const readingTime = blog.readingTime || Math.ceil(blog.content?.length / 1000) || 3;
    const isAuthor = user?._id === blog.author?._id || user?.role === 'admin';

    return (
        <div className="blog-details-page fade-in">
            <div className="blog-details-container">
                <button onClick={() => navigate(-1)} className="back-btn">
                    <FiArrowLeft /> Back
                </button>

                {blog.coverImage && blog.coverImage !== 'default-cover.jpg' && (
                    <div className="blog-cover">
                        <img src={blog.coverImage} alt={blog.title} />
                    </div>
                )}

                <div className="blog-header">
                    <div className="blog-category">{blog.category}</div>
                    <h1 className="blog-title">{blog.title}</h1>
                    
                    <div className="blog-meta">
                        <div className="blog-author-info">
{blog.author?.profileImage &&
blog.author.profileImage !== 'default-avatar.png' ? (
    <img
        src={blog.author.profileImage}
        alt={blog.author.username}
        className="author-img"
    />
) : (
    <div className="author-avatar">
        {blog.author?.username?.[0]?.toUpperCase()}
    </div>
)}
                            <div>
                                <strong>{blog.author?.username}</strong>
                                <span>{formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</span>
                            </div>
                        </div>
                        
                        <div className="blog-stats">
                            <span>📖 {readingTime} min read</span>
                            <span>👁️ {blog.views || 0} views</span>
                        </div>
                    </div>

                    <div className="blog-actions">
                        <button 
                            className={`action-btn ${isLiked ? 'active' : ''}`}
                            onClick={handleLike}
                        >
                            <FiHeart /> {blog.likes?.length || 0}
                        </button>
                        <button 
                            className={`action-btn ${isFavorited ? 'active' : ''}`}
                            onClick={handleFavorite}
                        >
                            <FiBookmark /> Save
                        </button>
                        {isAuthor && (
                            <>
                                <Link to={`/edit/${blog._id}`} className="action-btn">
                                    <FiEdit2 /> Edit
                                </Link>
                                <button onClick={handleDelete} className="action-btn delete">
                                    <FiTrash2 /> Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div 
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                <div className="blog-tags">
                    <strong>Tags:</strong>
                    {blog.tags?.map(tag => (
                        <span key={tag} className="tag">#{tag}</span>
                    ))}
                </div>

                <CommentSection blogId={id} />
            </div>
        </div>
    );
};

export default BlogDetailsPage;