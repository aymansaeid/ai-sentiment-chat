import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://chat-backend-y35c.onrender.com';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const sendMessage = async (userName, content) => {
    const response = await api.post('/Messages/send', {
        userName,
        content
    });
    return response.data;
};

export const getMessages = async () => {
    const response = await api.get('/Messages');
    return response.data;
};

export default api;