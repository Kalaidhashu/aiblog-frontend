import React, { useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';
import toast from 'react-hot-toast';

const AIBlogGenerator = ({ onGenerate }) => {
    const [topic, setTopic] = useState('');
    const [keywords, setKeywords] = useState('');
    const [style, setStyle] = useState('professional');
    const [generating, setGenerating] = useState(false);
    const [generatedBlog, setGeneratedBlog] = useState(null);

    const handleGenerate = async () => {
        if (!topic.trim()) {
            toast.error('Please enter a topic');
            return;
        }

        setGenerating(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/ai/generate-blog`, {
                topic,
                keywords,
                style,
            });
            setGeneratedBlog(response.data);
            toast.success('Blog generated successfully!');
            
            if (onGenerate) {
                onGenerate(response.data);
            }
        } catch (error) {
            console.error('Failed to generate blog:', error);
            toast.error('Failed to generate blog. Please try again.');
        } finally {
            setGenerating(false);
        }
    };

    const handleUseBlog = () => {
        if (onGenerate && generatedBlog) {
            onGenerate(generatedBlog);
        }
    };

    return (
        <div className="ai-blog-generator">
            <h2>AI Blog Generator</h2>
            
            {!generatedBlog ? (
                <div className="generator-form">
                    <div className="form-group">
                        <label className="form-label">Blog Topic *</label>
                        <input
                            type="text"
                            className="form-input"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g., The Future of Artificial Intelligence"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Keywords (Optional)</label>
                        <input
                            type="text"
                            className="form-input"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            placeholder="AI, Machine Learning, Technology"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Writing Style</label>
                        <select
                            className="form-select"
                            value={style}
                            onChange={(e) => setStyle(e.target.value)}
                        >
                            <option value="professional">Professional</option>
                            <option value="casual">Casual</option>
                            <option value="educational">Educational</option>
                            <option value="storytelling">Storytelling</option>
                        </select>
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={handleGenerate}
                        disabled={generating}
                    >
                        {generating ? <LoadingSpinner /> : 'Generate Blog'}
                    </button>
                </div>
            ) : (
                <div className="generated-blog">
                    <h3>{generatedBlog.title}</h3>
                    
                    <div className="blog-preview">
                        <h4>Introduction</h4>
                        <p>{generatedBlog.introduction}</p>
                        
                        <h4>Main Content</h4>
                        <div dangerouslySetInnerHTML={{ __html: generatedBlog.content }} />
                        
                        <h4>Conclusion</h4>
                        <p>{generatedBlog.conclusion}</p>
                        
                        {generatedBlog.tags && (
                            <div className="generated-tags">
                                <strong>Suggested Tags:</strong>
                                {generatedBlog.tags.map(tag => (
                                    <span key={tag} className="tag">#{tag}</span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="generator-actions">
                        <button className="btn btn-primary" onClick={handleUseBlog}>
                            Use This Blog
                        </button>
                        <button
                            className="btn btn-outline"
                            onClick={() => setGeneratedBlog(null)}
                        >
                            Generate New
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIBlogGenerator;