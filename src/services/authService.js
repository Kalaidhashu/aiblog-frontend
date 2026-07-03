import api from './api';

const authService = {
    async register(username, email, password) {
        const response = await api.post('/auth/register', {
            username,
            email,
            password,
        });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    async login(email, password) {
        const response = await api.post('/auth/login', {
            email,
            password,
        });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    logout() {
        localStorage.removeItem('token');
    },

    async getProfile() {
        const response = await api.get('/auth/profile');
        return response.data;
    },

    async updateProfile(profileData) {
        const response = await api.put('/auth/profile', profileData);
        return response.data;
    },

    getCurrentUser() {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            return decoded;
        }
        return null;
    },
};

export default authService;