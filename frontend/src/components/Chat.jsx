import { useState, useEffect, useRef } from 'react';
import { sendMessage, getMessages } from '../services/api';
import MessageBubble from './MessageBubble';
import './Chat.css';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showNameModal, setShowNameModal] = useState(true);
    const [currentUser, setCurrentUser] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (currentUser) {
            loadMessages();
        }
    }, [currentUser]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const loadMessages = async () => {
        try {
            setError('');
            const data = await getMessages();
            const sortedMessages = data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            setMessages(sortedMessages);
        } catch (error) {
            console.error('Error loading messages:', error);
            setError('Failed to load messages. Please check your backend connection.');
        }
    };

    const handleNameSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value.trim();
        if (name) {
            setCurrentUser(name);
            setShowNameModal(false);
        }
    };

    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        setLoading(true);
        setError('');

        try {
            await sendMessage(currentUser, content);
            setContent('');
            await loadMessages();
        } catch (error) {
            console.error('Error sending message:', error);
            setError('Failed to send message. Please check your backend connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Name Input Modal */}
            {showNameModal && (
                <div className="name-modal">
                    <div className="modal-content">
                        <h2>Welcome to Emotion Analysis Chat</h2>
                        <p>Please enter your name to start chatting. Your name will be used for all your messages.</p>
                        <form onSubmit={handleNameSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name..."
                                className="name-input"
                                required
                                maxLength={50}
                            />
                            <button type="submit" className="submit-name">
                                Start Chatting
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="main-container">
                {/* Logo Section */}
                <div className="logo-section">
                    <img
                        src="/ko-logo-yatay.png"
                        alt="Konuşarak Öğren"
                        className="chat-logo"
                    />
                    <div className="project-explanation">
                        <h2>Emotion Analysis Chat</h2>
                        <p>This innovative platform uses AI to analyze the emotional sentiment of your messages in real-time.</p>
                        <p>Share your thoughts and see how our system interprets the emotional tone of your conversations.</p>
                        <p>Every message is automatically analyzed and labeled with its emotional sentiment.</p>
                    </div>
                </div>

                {/* Chat Container */}
                <div className="chat-container">
                    {/* Error Message */}
                    {error && (
                        <div className="error-banner">
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Messages Container */}
                    <div className="messages-container">
                        {messages.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">💭</div>
                                <p className="empty-text">No messages yet. Start the conversation!</p>
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <MessageBubble key={msg.id} message={msg} />
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Form */}
                    {currentUser && (
                        <div className="input-container">
                            <form onSubmit={handleMessageSubmit} className="input-form">
                                <div className="current-user">
                                    Chatting as: <strong>{currentUser}</strong>
                                </div>
                                <div className="message-input-group">
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        className="message-input"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="send-button"
                                    >
                                        {loading ? 'Sending...' : 'Send'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Chat;