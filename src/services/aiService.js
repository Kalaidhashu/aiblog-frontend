import api from './api';

const aiService = {
    async generateBlog(topic, keywords = '', style = 'professional') {
        const response = await api.post('/ai/generate-blog', {
            topic,
            keywords,
            style,
        });
        return response.data;
    },

    async correctGrammar(text) {
        const response = await api.post('/ai/grammar-correct', { text });
        return response.data;
    },

    async chatWithAI(message, context = '') {
        const response = await api.post('/ai/chatbot', { message, context });
        return response.data;
    },

    async generateImagePrompt(description, style = '', mood = '') {
        const response = await api.post('/ai/generate-image-prompt', {
            description,
            style,
            mood,
        });
        return response.data;
    },
};

export default aiService;