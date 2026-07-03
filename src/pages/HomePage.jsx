import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import BlogCard from '../components/blog/BlogCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
// import AIChatbot from '../components/ai/AIChatbot';
import { FiArrowRight, FiTrendingUp, FiZap } from 'react-icons/fi';

const HomePage = () => {
    const { blogs, loading, fetchBlogs } = useBlog();
    const [trendingBlogs, setTrendingBlogs] = useState([]);
    // const [showChatbot, setShowChatbot] = useState(false);

    useEffect(() => {
        fetchBlogs(1, '', '');
        fetchTrendingBlogs();
    }, []);

    const fetchTrendingBlogs = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/blogs/trending`);
            const data = await response.json();
            setTrendingBlogs(data);
        } catch (error) {
            console.error('Failed to fetch trending blogs:', error);
        }
    };

    if (loading && blogs.length === 0) {
        return <LoadingSpinner />;
    }

    return (
        <div className="home-page fade-in">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
    Create Amazing Content
    <br />
    <span className="gradient-text">with AI Power</span>
</h1>
                    <p className="hero-description">
                        Generate high-quality blog posts, correct grammar, and get creative ideas
                        using our advanced AI tools. Start your blogging journey today!
                    </p>
                    <div className="hero-buttons">
                        <Link to="/create" className="btn btn-primary btn-large">
                            <FiZap /> Start Writing
                        </Link>
                        <Link to="/explore" className="btn btn-outline btn-large">
                            Explore Blogs <FiArrowRight />
                        </Link>
                    </div>
                    <div className="hero-stats">
    <div className="stat">
        <h2>500+</h2>
        <p>Blogs</p>
    </div>

    <div className="stat">
        <h2>100+</h2>
        <p>Writers</p>
    </div>

    <div className="stat">
        <h2>10K+</h2>
        <p>Readers</p>
    </div>
</div>
                </div>
            </section>

            {/* AI Features Section */}
            <section className="features-section">
                <h2 className="section-title">AI-Powered Features</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🤖</div>
                        <h3>AI Blog Generator</h3>
                        <p>Generate complete blog posts with just a topic idea</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📝</div>
                        <h3>Grammar Corrector</h3>
                        <p>Improve your writing with AI-powered grammar check</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">💬</div>
                        <h3>AI Chatbot Assistant</h3>
                        <p>Get help with ideas and content improvement</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🎨</div>
                        <h3>Image Prompt Generator</h3>
                        <p>Create stunning image prompts for your blogs</p>
                    </div>
                </div>
            </section>

            {/* Floating Chatbot Button
            <button 
                className="chatbot-float-btn"
                onClick={() => setShowChatbot(true)}
            >
                <FiCpu size={24} />
            </button> */}

            {/* Chatbot Modal */}
            {/* {showChatbot && (
                <div className="modal-overlay" onClick={() => setShowChatbot(false)}>
                    <div className="chatbot-modal" onClick={(e) => e.stopPropagation()}>
                        <AIChatbot onClose={() => setShowChatbot(false)} />
                    </div>
                </div>
            )} */}

            {/* Trending Blogs */}
            <section className="trending-section">
                <div className="section-header">
                    <h2 className="section-title">
                        <FiTrendingUp size={30}/> Trending Now
                    </h2>
                    <Link to="/explore" className="view-all-btn">View All<FiArrowRight /></Link>
                </div>
                <div className="trending-grid">
                    {trendingBlogs.slice(0, 3).map((blog) => (
                        <BlogCard key={blog._id} blog={blog} variant="trending" />
                    ))}
                </div>
            </section>

            {/* Recent Blogs */}
            <section className="recent-section">
                <div className="section-header">
                    <h2 className="section-title">Recent Blogs</h2>
                    <Link to="/explore" className="view-all-btn">View All<FiArrowRight /></Link>
                </div>
                <div className="grid">
                    {blogs.slice(0, 6).map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>
            </section>
            <br></br>
            <br></br>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>Ready to Start Your Blogging Journey?</h2>
                    <p>Join thousands of content creators using AI to create amazing content</p>
                    <Link to="/register" className="btn btn-primary btn-large">
                        Create Free Account
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;