import React, { useState } from 'react';
import { FiCpu } from 'react-icons/fi';
import AIChatbot from '../ai/AIChatbot';

const FloatingChatbot = () => {
    const [showChatbot, setShowChatbot] = useState(false);

    return (
        <>
            <button
                className="chatbot-float-btn"
                onClick={() => setShowChatbot(true)}
            >
                <FiCpu size={24} />
            </button>

            {showChatbot && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowChatbot(false)}
                >
                    <div
                        className="chatbot-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <AIChatbot
                            onClose={() => setShowChatbot(false)}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default FloatingChatbot;