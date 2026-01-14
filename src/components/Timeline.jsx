import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CountUp from './animations/CountUp';
import ScrollReveal from './animations/ScrollReveal';
import ShinyText from './animations/ShinyText';
import './Timeline.css';

export default function Timeline() {
    const navigate = useNavigate();
    const [phase, setPhase] = useState(1);

    useEffect(() => {
        const timer1 = setTimeout(() => setPhase(2), 5000);
        const timer2 = setTimeout(() => setPhase(3), 10000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    // Calculate days between dates
    const startDate = new Date('2024-08-25');
    const endDate = new Date('2026-01-19');
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);

    const milestones = [
        {
            date: 'August 25, 2024',
            title: 'Day One',
            description: 'Sajib joined Jugantor as a founding member of the new panel',
            icon: '🌟'
        },
        {
            date: 'Throughout the Journey',
            title: 'Building Together',
            description: 'Growing in faith, fellowship, and service to the church',
            icon: '🤝'
        },
        {
            date: 'January 19, 2026',
            title: 'New Beginnings',
            description: 'Embarking on a new chapter with God\'s blessings',
            icon: '🕊️'
        }
    ];

    const exitAnimation = { opacity: 0, y: -20, filter: 'blur(10px)', transition: { duration: 0.5 } };
    const enterAnimation = { opacity: 1, y: 0, filter: 'blur(0px)' };
    const initialAnimation = { opacity: 0, y: 20, filter: 'blur(10px)' };

    return (
        <section className="timeline-section section">
            <div className="container" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <AnimatePresence mode="wait">
                    {phase === 1 && (
                        <motion.div
                            key="phase-1"
                            className="timeline-header"
                            initial={initialAnimation}
                            animate={enterAnimation}
                            exit={exitAnimation}
                            transition={{ duration: 0.8 }}
                            style={{ position: 'absolute', width: '100%', left: 0, padding: '0 1rem' }}
                        >
                            <h2 className="section-title">
                                Our Journey <ShinyText><span className="gradient-text">Together</span></ShinyText>
                            </h2>
                            <p className="section-subtitle">
                                A timeline of memories and milestones
                            </p>
                        </motion.div>
                    )}

                    {phase === 2 && (
                        <motion.div
                            key="phase-2"
                            className="timeline-stats"
                            initial={initialAnimation}
                            animate={enterAnimation}
                            exit={exitAnimation}
                            transition={{ duration: 0.8 }}
                            style={{ position: 'absolute', width: '100%', left: 0, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '2rem' }}
                        >
                            <div className="stat-card glass">
                                <div className="stat-value gradient-text">
                                    <CountUp value={diffDays} duration={2} />
                                </div>
                                <div className="stat-label">Days Together</div>
                            </div>
                            <div className="stat-card glass">
                                <div className="stat-value gradient-text">
                                    <CountUp value={diffMonths} duration={2} />
                                </div>
                                <div className="stat-label">Months of Fellowship</div>
                            </div>
                            <div className="stat-card glass">
                                <div className="stat-value gradient-text">∞</div>
                                <div className="stat-label">Memories Created</div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 3 && (
                        <motion.div
                            key="phase-3"
                            className="timeline-content-wrapper"
                            initial={initialAnimation}
                            animate={enterAnimation}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Timeline */}
                            <div className="timeline">
                                {milestones.map((milestone, index) => (
                                    <ScrollReveal
                                        key={index}
                                        direction={index % 2 === 0 ? 'left' : 'right'}
                                        delay={0.2 + index * 0.2}
                                    >
                                        <div className="timeline-item">
                                            <motion.div
                                                className="timeline-content card-glass"
                                                whileHover={{
                                                    scale: 1.05,
                                                    rotateY: 5,
                                                    z: 50
                                                }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <div className="timeline-icon">{milestone.icon}</div>
                                                <div className="timeline-date">{milestone.date}</div>
                                                <h3 className="timeline-title">{milestone.title}</h3>
                                                <p className="timeline-description">{milestone.description}</p>
                                            </motion.div>
                                            <div className="timeline-dot"></div>
                                        </div>
                                    </ScrollReveal>
                                ))}
                                <div className="timeline-line"></div>
                            </div>

                            <motion.div
                                className="navigation-container"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                style={{ textAlign: 'center', marginTop: '4rem', paddingBottom: '2rem' }}
                            >
                                <motion.button
                                    className="btn btn-primary"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/farewell')}
                                >
                                    Next: Blessings & Farewell 🕊️
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
