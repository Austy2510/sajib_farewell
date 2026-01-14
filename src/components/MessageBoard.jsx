import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { ref, push, onValue, serverTimestamp } from 'firebase/database';
import VariableProximity from './animations/VariableProximity';
import ShinyText from './animations/ShinyText';
import './MessageBoard.css';

export default function MessageBoard() {
    const navigate = useNavigate();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    // Listen for messages from Firebase
    useEffect(() => {
        const messagesRef = ref(db, 'messages');

        const unsubscribe = onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const messageList = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                })).sort((a, b) => b.timestamp - a.timestamp); // Newest first
                setMessages(messageList);
            } else {
                setMessages([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !message.trim()) {
            setSubmitStatus({ type: 'error', text: 'Please fill in all fields' });
            return;
        }

        if (message.length > 300) {
            setSubmitStatus({ type: 'error', text: 'Message is too long (max 300 characters)' });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const messagesRef = ref(db, 'messages');
            await push(messagesRef, {
                name: name.trim(),
                message: message.trim(),
                timestamp: serverTimestamp()
            });

            setName('');
            setMessage('');
            setSubmitStatus({ type: 'success', text: 'Your message has been sent! ✨' });

            setTimeout(() => setSubmitStatus(null), 5000);
        } catch (error) {
            console.error('Error sending message:', error);
            setSubmitStatus({ type: 'error', text: 'Failed to send message. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return 'Just now';
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;

        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;

        const diffDays = Math.floor(diffHours / 24);
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

        return date.toLocaleDateString();
    };

    return (
        <section className="message-board-section section" ref={sectionRef}>
            <div className="container">
                <motion.div
                    className="message-board-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-title">
                        <VariableProximity>
                            Leave Your <ShinyText><span className="gradient-text">Message</span></ShinyText>
                        </VariableProximity>
                    </h2>
                    <p className="section-subtitle">
                        Share your thoughts, wishes, or memories with Sajib
                    </p>
                </motion.div>

                {/* Message Form */}
                <motion.div
                    className="message-form-container"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <form onSubmit={handleSubmit} className="message-form card-glass">
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                className="input"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                maxLength={50}
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Your Message</label>
                            <textarea
                                id="message"
                                className="textarea"
                                placeholder="Share your thoughts, wishes, or favorite memories..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                maxLength={300}
                                disabled={isSubmitting}
                            />
                            <div className="char-counter">
                                {message.length}/300
                            </div>
                        </div>

                        {submitStatus && (
                            <motion.div
                                className={`submit-status ${submitStatus.type}`}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {submitStatus.text}
                            </motion.div>
                        )}

                        <motion.button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.05, y: -4 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="loading"></span>
                                    Sending...
                                </>
                            ) : (
                                'Send Message 💌'
                            )}
                        </motion.button>
                    </form>
                </motion.div>

                {/* Messages Display */}
                <motion.div
                    className="messages-container"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <h3 className="messages-title">Messages from the Community</h3>

                    {messages.length === 0 ? (
                        <div className="no-messages">
                            <p>Be the first to leave a message! 🌟</p>
                        </div>
                    ) : (
                        <div className="messages-grid">
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={msg.id}
                                    className="message-card card-glass"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{
                                        scale: 1.03,
                                        rotateY: 3,
                                        z: 30
                                    }}
                                >
                                    <div className="message-header">
                                        <div className="message-author">{msg.name}</div>
                                        <div className="message-time">{formatTimestamp(msg.timestamp)}</div>
                                    </div>
                                    <div className="message-text">{msg.message}</div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
                {/* Navigation Button */}
                <motion.div
                    className="navigation-container"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    style={{ textAlign: 'center', marginTop: '3rem' }}
                >
                    <motion.button
                        className="btn btn-primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/')}
                    >
                        🏠 Back to Start
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
