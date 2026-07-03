import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiSend, FiX, FiMinimize2 } from 'react-icons/fi';
import LoadingSpinner from '../common/LoadingSpinner';
import toast from 'react-hot-toast';

const AIChatbot = ({ onClose, minimized = false, onMinimize }) => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Hello! I\'m your AI writing assistant. How can I help you with your blog today?',
        },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/ai/chatbot`, {
                message: input,
                context: messages.slice(-3).map(m => `${m.role}: ${m.content}`).join('\n'),
            });

            const assistantMessage = {
                role: 'assistant',
                content: response.data.response,
            };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Failed to get AI response:', error);
            toast.error('Failed to get response. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (minimized) {
        return (
            <div className="chatbot-minimized" onClick={onMinimize}>
                <FiSend /> AI Assistant
            </div>
        );
    }

    return (
        <div className="ai-chatbot">
            <div className="chatbot-header">
                <h3>AI Writing Assistant</h3>
                <div className="chatbot-header-actions">
                    {onMinimize && (
                        <button className="header-btn" onClick={onMinimize}>
                            <FiMinimize2 size={18} />
                        </button>
                    )}
                    {onClose && (
                        <button className="close-btn" onClick={onClose}>
                            <FiX size={20} />
                        </button>
                    )}
                </div>
            </div>

            <div className="chatbot-messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.role}`}>
                        <div className="message-content">
                            <strong>{message.role === 'user' ? 'You' : 'AI Assistant'}:</strong>
                            <p>{message.content}</p>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="message assistant">
                        <div className="message-content">
                            <LoadingSpinner />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="chatbot-input">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about writing, content ideas, or blog improvement..."
                    rows={3}
                />
                <button onClick={handleSend} disabled={loading}>
                    <FiSend size={20} />
                </button>
            </div>
        </div>
    );
};

export default AIChatbot;