import api from './api';

const blogService = {
    async getBlogs(page = 1, limit = 10, category = '', search = '') {
        const response = await api.get('/blogs', {
            params: { page, limit, category, search },
        });
        return response.data;
    },

    async getBlogById(id) {
        const response = await api.get(`/blogs/${id}`);
        return response.data;
    },

    async createBlog(blogData) {
        const response = await api.post('/blogs', blogData);
        return response.data;
    },

    async updateBlog(id, blogData) {
        const response = await api.put(`/blogs/${id}`, blogData);
        return response.data;
    },

    async deleteBlog(id) {
        const response = await api.delete(`/blogs/${id}`);
        return response.data;
    },

    async likeBlog(id) {
        const response = await api.post(`/blogs/${id}/like`);
        return response.data;
    },

    async toggleFavorite(id) {
        const response = await api.post(`/blogs/${id}/favorite`);
        return response.data;
    },

    async getTrending() {
        const response = await api.get('/blogs/trending');
        return response.data;
    },
};

export default blogService;