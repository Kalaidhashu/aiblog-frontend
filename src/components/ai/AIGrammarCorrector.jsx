import React, { useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../common/LoadingSpinner';
import toast from 'react-hot-toast';

const AIGrammarCorrector = ({ onCorrect, textToCorrect }) => {
    const [inputText, setInputText] = useState(textToCorrect || '');
    const [correctedText, setCorrectedText] = useState('');
    const [correcting, setCorrecting] = useState(false);
    const [improvements, setImprovements] = useState([]);

    const handleCorrect = async () => {
        if (!inputText.trim()) {
            toast.error('Please enter some text to correct');
            return;
        }
        setCorrectedText('');
        setImprovements([]);
        setCorrecting(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/ai/grammar-correct`, {
                text: inputText,
            });
            // setCorrectedText(response.data.corrected || '');
            setCorrectedText(response.data.corrected);

setTimeout(() => {
    document
      .querySelector('.correction-results')
      ?.scrollIntoView({ behavior: 'smooth' });
}, 100);
            setImprovements(response.data.improvements || []);
            setCorrecting(false);
            toast.success('Grammar corrected successfully!');
            
            // if (onCorrect) {
            //     onCorrect(response.data.corrected);
            // }
        } catch (error) {
            console.error('Failed to correct grammar:', error);
            toast.error('Failed to correct grammar. Please try again.');
        } finally {
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(correctedText);
        toast.success('Copied to clipboard!');
    };

    // const handleReplace = () => {
    //     setInputText(correctedText);
    //     setCorrectedText('');
    //     toast.success('Text replaced!');
    // };
    const handleReplace = () => {

    if (onCorrect) {
        onCorrect(correctedText);
    }

    setInputText(correctedText);
    setCorrectedText('');

    toast.success('Text replaced!');
};

    return (
        <div className="ai-grammar-corrector">
            <h2>AI Grammar Corrector</h2>
            
            <div className="grammar-form">
                <div className="form-group">
                    <label className="form-label">Your Text</label>
                    <textarea
                        className="form-textarea"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Paste your text here for grammar correction..."
                        rows={8}
                    />
                </div>

                <button
                    className="btn btn-primary"
                    onClick={handleCorrect}
                    disabled={correcting}
                >
                    {correcting ? <LoadingSpinner /> : 'Correct Grammar'}
                </button>

                {correctedText && (
                    <div className="correction-results">
                        <h3>Corrected Version</h3>
                        <div className="corrected-text">
                            <p>{correctedText}</p>
                        </div>
                        
                        {improvements.length > 0 && (
                            <div className="improvements">
                                <h4>Improvements Made:</h4>
                                <ul>
                                    {improvements.map((imp, index) => (
                                        <li key={index}>{imp}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        <div className="action-buttons">
                            <button className="btn btn-secondary" onClick={handleCopy}>
                                Copy to Clipboard
                            </button>
                            <button className="btn btn-outline" onClick={handleReplace}>
                                Replace Original Text
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIGrammarCorrector;