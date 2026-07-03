import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { FiTrash2, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

const CommentSection = ({ blogId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        fetchComments();
    }, [blogId]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/comments/blog/${blogId}`);
            setComments(response.data);
        } catch (error) {
            console.error('Failed to fetch comments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            toast.error('Please enter a comment');
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/comments`, {
                blogId,
                text: newComment,
            });
            setComments([response.data, ...comments]);
            setNewComment('');
            toast.success('Comment added successfully');
        } catch (error) {
            console.error('Failed to add comment:', error);
            toast.error('Failed to add comment');
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/comments/${commentId}`);
                setComments(comments.filter(c => c._id !== commentId));
                toast.success('Comment deleted successfully');
            } catch (error) {
                console.error('Failed to delete comment:', error);
                toast.error('Failed to delete comment');
            }
        }
    };

    if (loading) {
        return <div className="loading-comments">Loading comments...</div>;
    }

    return (
        <div className="comment-section">
            <h3>Comments ({comments.length})</h3>
            
            {isAuthenticated ? (
                <div className="add-comment">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        rows={3}
                    />
                    <button onClick={handleAddComment} className="btn btn-primary">
                        <FiSend /> Post Comment
                    </button>
                </div>
            ) : (
                <p className="login-to-comment">Please <a href="/login">login</a> to comment</p>
            )}
            
            <div className="comments-list">
                {comments.length === 0 ? (
                    <p className="no-comments">No comments yet. Be the first to comment!</p>
                ) : (
                    comments.map(comment => (
                        <div key={comment._id} className="comment-item">
                            <div className="comment-header">
                                <div className="comment-user">
{comment.user?.profileImage &&
comment.user.profileImage !== 'default-avatar.png' ? (
    <img
        src={comment.user.profileImage}
        alt={comment.user.username}
        className="comment-avatar-img"
    />
) : (
    <div className="comment-avatar">
        {comment.user?.username?.[0]?.toUpperCase()}
    </div>
)}
                                    <div>
                                        <strong>{comment.user?.username}</strong>
                                        <span className="comment-date">
                                            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                        </span>
                                    </div>
                                </div>
                                {(user?._id === comment.user?._id || user?.role === 'admin') && (
                                    <button 
                                        onClick={() => handleDeleteComment(comment._id)}
                                        className="delete-comment"
                                    >
                                        <FiTrash2 />
                                    </button>
                                )}
                            </div>
                            <p className="comment-text">{comment.text}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CommentSection;