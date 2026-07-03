import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const BlogContext = createContext();

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

export const BlogProvider = ({ children }) => {
  const { token } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchBlogs = useCallback(async (page = 1, category = '', search = '') => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/blogs`, {
        params: { page, limit: 12, category, search },
      });
      setBlogs(response.data.blogs);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  }, []);

  const getBlog = useCallback(async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/blogs/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch blog:', error);
      toast.error('Failed to load blog');
      return null;
    }
  }, []);

  const createBlog = useCallback(async (blogData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/blogs`,
      blogData,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success('Blog created successfully!');
    return response.data;

  } catch (error) {

    console.error('Failed to create blog:', error);

    toast.error(
      error.response?.data?.message || 'Failed to create blog'
    );

    return null;
  }
}, [token]);

  const updateBlog = useCallback(async (id, blogData) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/blogs/${id}`,blogData,
        {headers: {Authorization: `Bearer ${token}`,},
      });
      toast.success('Blog updated successfully!');
      return response.data;
    } catch (error) {
      console.error('Failed to update blog:', error);
      toast.error(error.response?.data?.message || 'Failed to update blog');
      return null;
    }
  }, []);

  const deleteBlog = useCallback(async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/blogs/${id}`,{headers: {Authorization: `Bearer ${token}`,},
      });
      toast.success('Blog deleted successfully!');
      return true;
    } catch (error) {
      console.error('Failed to delete blog:', error);
      toast.error(error.response?.data?.message || 'Failed to delete blog');
      return false;
    }
  }, []);

  const likeBlog = useCallback(async (id) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/blogs/${id}/like`,{},
        {headers: {Authorization: `Bearer ${token}`,},
      });
      return response.data;
    } catch (error) {
      console.error('Failed to like blog:', error);
      return null;
    }
  }, []);

  const toggleFavorite = useCallback(async (id) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/blogs/${id}/favorite`,{},
        {headers: {Authorization: `Bearer ${token}`,},
      });
      return response.data;
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      return null;
    }
  }, []);

  const value = {
    blogs,
    loading,
    totalPages,
    currentPage,
    fetchBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    likeBlog,
    toggleFavorite,
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};