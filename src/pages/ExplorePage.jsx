import React, { useState, useEffect } from 'react';
import { useBlog } from '../context/BlogContext';
import BlogCard from '../components/blog/BlogCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { FiSearch, FiFilter } from 'react-icons/fi';

const ExplorePage = () => {
    const { blogs, loading, totalPages, currentPage, fetchBlogs } = useBlog();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showFilters, setShowFilters] = useState(false);

    const categories = ['All', 'Technology', 'Science', 'Health', 'Business', 'Education', 'Entertainment', 'Travel', 'Food', 'Other'];

    useEffect(() => {
        fetchBlogs(currentPage, selectedCategory === 'All' ? '' : selectedCategory, searchTerm);
    }, [currentPage, selectedCategory, searchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchBlogs(1, selectedCategory === 'All' ? '' : selectedCategory, searchTerm);
    };

    const handlePageChange = (page) => {
        fetchBlogs(page, selectedCategory === 'All' ? '' : selectedCategory, searchTerm);
        window.scrollTo(0, 0);
    };

    return (
        <div className="explore-page fade-in">
            <div className="explore-header">
                <h1>Explore Blogs</h1>
                <p>Discover amazing content from creators around the world</p>
            </div>

            {/* <div className="explore-controls">
                <form onSubmit={handleSearch} className="search-bar">
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit"><FiSearch /></button>
                </form>

                <button 
                    className="filter-toggle"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <FiFilter /> Filter
                </button>
            </div>

            {showFilters && (
                <div className="filters-panel">
                    <h3>Categories</h3>
                    <div className="category-filters">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => {
                                    setSelectedCategory(cat);
                                    fetchBlogs(1, cat === 'All' ? '' : cat, searchTerm);
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            )} */}
            <div className="explore-controls">

    <form onSubmit={handleSearch} className="modern-search-bar">

        <FiSearch className="search-icon" />

        <input
            type="text"
            placeholder="Search blogs, topics, authors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button type="submit">
            Search
        </button>

    </form>

</div>

<div className="modern-filter-panel">

    <div className="filter-header">
        <h3>Browse Categories</h3>
        <span>{blogs.length} Blogs Found</span>
    </div>

    <div className="modern-category-filters">

        {categories.map(cat => (
            <button
                key={cat}
                className={`modern-category-btn ${
                    selectedCategory === cat ? 'active' : ''
                }`}
                onClick={() => {
                    setSelectedCategory(cat);
                    fetchBlogs(
                        1,
                        cat === 'All' ? '' : cat,
                        searchTerm
                    );
                }}
            >
                {cat}
            </button>
        ))}

    </div>

</div>

            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div className="grid">
                        {blogs.length === 0 ? (
                            <div className="no-results">
                                <p>No blogs found. Try a different search or category.</p>
                            </div>
                        ) : (
                            blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)
                        )}
                    </div>

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="pagination-btn"
                            >
                                Previous
                            </button>
                            <span className="page-info">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="pagination-btn"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ExplorePage;