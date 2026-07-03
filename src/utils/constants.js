export const CATEGORIES = [
    'Technology',
    'Science',
    'Health',
    'Business',
    'Education',
    'Entertainment',
    'Travel',
    'Food',
    'Other',
];

export const BLOG_STYLES = [
    'professional',
    'casual',
    'educational',
    'storytelling',
];

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        PROFILE: '/auth/profile',
    },
    BLOGS: {
        GET_ALL: '/blogs',
        GET_BY_ID: (id) => `/blogs/${id}`,
        CREATE: '/blogs',
        UPDATE: (id) => `/blogs/${id}`,
        DELETE: (id) => `/blogs/${id}`,
        LIKE: (id) => `/blogs/${id}/like`,
        FAVORITE: (id) => `/blogs/${id}/favorite`,
        TRENDING: '/blogs/trending',
    },
    COMMENTS: {
        ADD: '/comments',
        DELETE: (id) => `/comments/${id}`,
        GET_BY_BLOG: (blogId) => `/comments/blog/${blogId}`,
    },
    AI: {
        GENERATE_BLOG: '/ai/generate-blog',
        CORRECT_GRAMMAR: '/ai/grammar-correct',
        CHATBOT: '/ai/chatbot',
        GENERATE_IMAGE_PROMPT: '/ai/generate-image-prompt',
    },
};

export const DEFAULT_AVATAR = '/default-avatar.png';
export const DEFAULT_COVER = '/default-cover.jpg';