import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TypewriterText from './animations/TypewriterText';
import './Farewell.css';

export default function Farewell() {
    const navigate = useNavigate();
    const ref = useRef(null);
    const [phase, setPhase] = useState(1);

    useEffect(() => {
        // Phase 2 (Letter) starts at 5s
        const timer1 = setTimeout(() => setPhase(2), 5000);
        // Phase 3 (End) starts at 25s (20s reading time)
        const timer2 = setTimeout(() => setPhase(3), 25000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    const exitAnimation = { opacity: 0, scale: 0.95, filter: 'blur(5px)', transition: { duration: 0.8 } };
    const enterAnimation = { opacity: 1, scale: 1, filter: 'blur(0px)' };
    const initialAnimation = { opacity: 0, scale: 0.95, filter: 'blur(5px)' };

    return (
        <section className="farewell-section section" ref={ref}>
            {/* Floating Hearts Background - Persists across phases */}
            <div className="hearts-container">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="floating-heart"
                        initial={{ y: '100vh', x: `${Math.random() * 100}vw` }}
                        animate={{
                            y: '-20vh',
                            x: `${Math.random() * 100}vw`,
                        }}
                        transition={{
                            duration: 10 + Math.random() * 5,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: 'linear',
                        }}
                    >
                        ❤️
                    </motion.div>
                ))}
            </div>

            <div className="container">
                <motion.div
                    className="farewell-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div className="farewell-card card-glass" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <AnimatePresence mode="wait">
                            {phase === 1 && (
                                <motion.div
                                    key="phase-1"
                                    className="farewell-intro"
                                    initial={initialAnimation}
                                    animate={enterAnimation}
                                    exit={exitAnimation}
                                    transition={{ duration: 0.8 }}
                                    style={{ textAlign: 'center', width: '100%' }}
                                >
                                    <motion.div
                                        className="farewell-icon"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
                                    >
                                        🕊️
                                    </motion.div>

                                    <motion.h2
                                        className="farewell-title"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.3 }}
                                    >
                                        Blessings for Your <span className="gradient-text">Journey</span>
                                    </motion.h2>
                                </motion.div>
                            )}

                            {phase === 2 && (
                                <motion.div
                                    key="phase-2"
                                    className="farewell-message"
                                    initial={initialAnimation}
                                    animate={enterAnimation}
                                    exit={exitAnimation}
                                    transition={{ duration: 0.8 }}
                                    style={{ width: '100%', textAlign: 'center' }}
                                >
                                    <p>
                                        <TypewriterText text="Dear Sajib," delay={500} speed={40} />
                                    </p>
                                    <p>
                                        <TypewriterText
                                            text="From the very first day of our new panel on August 25, 2024, you've been more than just a member—you've been a cornerstone of Jugantor. Your dedication, faith, and fellowship have touched each one of us in countless ways."
                                            delay={2000} // Start after "Dear Sajib"
                                            speed={25}
                                        />
                                    </p>
                                    <p>
                                        <TypewriterText
                                            text="As you and your family embark on this new chapter, following God's call to serve in a new church, we want you to know that you carry with you our prayers, love, and endless gratitude."
                                            delay={10000} // Start after first paragraph
                                            speed={25}
                                        />
                                    </p>
                                </motion.div>
                            )}

                            {phase === 3 && (
                                <motion.div
                                    key="phase-3"
                                    className="farewell-outro"
                                    initial={initialAnimation}
                                    animate={enterAnimation}
                                    transition={{ duration: 0.8 }}
                                    style={{ width: '100%', textAlign: 'center' }}
                                >
                                    <motion.div
                                        className="farewell-message"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1 }}
                                    >
                                        <p className="scripture">
                                            <span className="quote-mark">"</span>
                                            <em>The LORD bless you and keep you; the LORD make his face shine on you and be
                                                gracious to you; the LORD turn his face toward you and give you peace.</em>
                                            <span className="quote-mark">"</span>
                                            <br />
                                            <strong>— Numbers 6:24-26</strong>
                                        </p>
                                        <p>
                                            Though you may be leaving Jugantor physically, you will forever remain in our hearts.
                                            May God guide your steps, strengthen your faith, and fill your days with His abundant
                                            blessings.
                                        </p>
                                        <p className="signature">
                                            With love and prayers,<br />
                                            <strong className="gradient-text">Your Jugantor Family</strong>
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        className="farewell-cta"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 1 }}
                                        style={{ marginTop: '2rem' }}
                                    >
                                        <motion.button
                                            className="btn btn-primary"
                                            whileHover={{ scale: 1.05, y: -4 }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                            onClick={() => navigate('/message-board')}
                                        >
                                            Leave Your Message 💌
                                        </motion.button>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
