const MessageBubble = ({ message }) => {
    const sentiment = message.sentiment?.toUpperCase?.() || 'UNKNOWN';

    const isPositive = sentiment.includes('POSITIVE');
    const isNegative = sentiment.includes('NEGATIVE');
    const isNeutral = sentiment.includes('NEUTRAL') || sentiment.includes('UNKNOWN');


    const getSentimentEmoji = () => {
        if (isPositive) return '\u{1F60A}';
        if (isNegative) return '\u{1F61E}';
        return '\u{1F610}';
    };
    console.log('Message sentiment:', message.sentiment);

    return (
        <div className="message-bubble">
            <div className="message-content">
                <div className="message-emoji">{getSentimentEmoji()}</div>
                <div className="message-body">
                    <div className="message-header">
                        <span className="message-username">{message.userName}</span>
                        <span className="sentiment-badge">
                            {message.sentiment.toLowerCase()}
                        </span>
                    </div>
                    <p className="message-text">{message.content}</p>
                    <span className="message-time">
                        {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;