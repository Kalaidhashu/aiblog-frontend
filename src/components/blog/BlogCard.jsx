import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { FiHeart, FiMessageCircle, FiBookmark } from 'react-icons/fi';

const BlogCard = ({ blog, variant = 'normal' }) => {
    const readingTime = blog.readingTime || Math.ceil(blog.content?.length / 1000) || 3;

    return (
        <article className={`blog-card ${variant}`}>
            {blog.coverImage && blog.coverImage !== 'default-cover.jpg' && (
                <Link to={`/blog/${blog._id}`} className="blog-card-image">
                    <img src={blog.coverImage} alt={blog.title} />
                </Link>
            )}
            
            <div className="blog-card-content">
                <div className="blog-card-meta">
                    <span className="blog-category">{blog.category}</span>
                    <span className="blog-reading-time">{readingTime} min read</span>
                </div>
                
                <Link to={`/blog/${blog._id}`} className="blog-card-title">
                    <h3>{blog.title}</h3>
                </Link>
                
                <p className="blog-card-summary">
                    {blog.summary || blog.content?.substring(0, 150)}...
                </p>
                
                <div className="blog-card-footer">
                    <div className="blog-author">
                        {blog.author?.profileImage && blog.author.profileImage !== 'default-avatar.png' ? (
                            <img src={blog.author.profileImage} alt={blog.author.username} />
                        ) : (
                            <div className="author-avatar">
                                {blog.author?.username?.[0]?.toUpperCase()}
                            </div>
                        )}
                        <span>{blog.author?.username}</span>
                    </div>
                    
                    <div className="blog-stats">
                        <span><FiHeart /> {blog.likes?.length || 0}</span>
                        <span><FiMessageCircle /> {blog.comments?.length || 0}</span>
                        <span><FiBookmark /></span>
                    </div>
                </div>
                
                <div className="blog-card-date">
                    {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
                </div>
            </div>
        </article>
    );
};

export default BlogCard;