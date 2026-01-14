import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import VariableProximity from './animations/VariableProximity';
import ShinyText from './animations/ShinyText';
import './MessageBoard.css';

export default function MessageBoard() {
    const navigate = useNavigate();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Static messages data structure
    // TODO: Add real images and messages here
    const messages = [
        {
            id: 1,
            name: "Member Name",
            image: "https://placehold.co/100x100/6366F1/FFFFFF?text=Member", // Placeholder
            message: "We will miss you! Best of luck on your new journey.",
            role: "Member" // Optional: Role or title
        },
        {
            id: 2,
            name: "Another Member",
            image: "https://placehold.co/100x100/EC4899/FFFFFF?text=Member",
            message: "Thank you for your guidance and friendship. God bless!",
            role: "Choir Member"
        },
        // Add more members here...
    ];

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
                            Farewell <ShinyText><span className="gradient-text">Messages</span></ShinyText>
                        </VariableProximity>
                    </h2>
                    <p className="section-subtitle">
                        Words of love and encouragement from the Jugantor family
                    </p>
                </motion.div>

                {/* Messages Display */}
                <motion.div
                    className="messages-container"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
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
                                <div className="message-header-static">
                                    <div className="member-avatar">
                                        <img src={msg.image} alt={msg.name} />
                                    </div>
                                    <div className="member-info">
                                        <div className="message-author">{msg.name}</div>
                                        {msg.role && <div className="message-role">{msg.role}</div>}
                                    </div>
                                </div>
                                <div className="message-text">"{msg.message}"</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Navigation Button */}
                <motion.div
                    className="navigation-container"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
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
