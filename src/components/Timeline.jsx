import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CountUp from './animations/CountUp';
import ShinyText from './animations/ShinyText';
import LiquidEther from './animations/LiquidEther';
import TrueFocus from './TrueFocus/TrueFocus';
import './Timeline.css';

export default function Timeline() {
    const navigate = useNavigate();
    const [phase, setPhase] = useState(1);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const cardRefs = useRef([]);

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

    // Auto-scroll to current card when it changes
    useEffect(() => {
        if (phase === 3 && cardRefs.current[currentCardIndex]) {
            cardRefs.current[currentCardIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, [currentCardIndex, phase]);

    // Auto-advance cards with delay
    useEffect(() => {
        if (phase !== 3) return;

        const interval = setInterval(() => {
            setCurrentCardIndex(prev => {
                const nextIndex = (prev + 1) % milestones.length;
                return nextIndex;
            });
        }, 5000); // 5 seconds per card

        return () => clearInterval(interval);
    }, [phase, milestones.length]);

    const exitAnimation = { opacity: 0, y: -20, filter: 'blur(10px)', transition: { duration: 0.5 } };
    const enterAnimation = { opacity: 1, y: 0, filter: 'blur(0px)' };
    const initialAnimation = { opacity: 0, y: 20, filter: 'blur(10px)' };

    return (
        <section className="timeline-section section">
            {/* Liquid Ether Background */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
                opacity: 0.3
            }}>
                <LiquidEther
                    colors={['#8B5CF6', '#EC4899', '#F59E0B']}
                    mouseForce={35}
                    cursorSize={150}
                    autoDemo={true}
                    autoSpeed={0.4}
                    autoIntensity={3.0}
                    resolution={0.6}
                />
            </div>
            <div className="container" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                <AnimatePresence mode="wait">
                    {phase === 1 && (
                        <motion.div
                            key="phase-1"
                            className="timeline-header"
                            initial={initialAnimation}
                            animate={enterAnimation}
                            exit={exitAnimation}
                            transition={{ duration: 0.8 }}
                            style={{
                                width: '100%',
                                padding: '0 1rem',
                                textAlign: 'center'
                            }}
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
                            className="timeline-stats-centered"
                            initial={initialAnimation}
                            animate={enterAnimation}
                            exit={exitAnimation}
                            transition={{ duration: 0.8 }}
                            style={{ width: '100%' }}
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
                            {/* Timeline Cards - Centered, No Line */}
                            <div className="timeline-centered">
                                {milestones.map((milestone, index) => {
                                    const isActive = index === currentCardIndex;
                                    return (
                                        <motion.div
                                            key={index}
                                            ref={el => (cardRefs.current[index] = el)}
                                            className="timeline-card-centered card-glass"
                                            animate={{
                                                scale: isActive ? 1.05 : 0.95,
                                                opacity: isActive ? 1 : 0.5,
                                                filter: isActive ? 'blur(0px)' : 'blur(2px)'
                                            }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <div className="timeline-icon">{milestone.icon}</div>
                                            <div className="timeline-date">{milestone.date}</div>
                                            <div className="timeline-title-container">
                                                <TrueFocus
                                                    sentence={milestone.title}
                                                    manualMode={!isActive}
                                                    blurAmount={3}
                                                    borderColor="#EC4899"
                                                    glowColor="rgba(236, 72, 153, 0.6)"
                                                    animationDuration={0.5}
                                                    pauseBetweenAnimations={1}
                                                    fontSize="2rem"
                                                />
                                            </div>
                                            <p className="timeline-description">{milestone.description}</p>
                                        </motion.div>
                                    );
                                })}
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
                                    Next: Blessings &amp; Farewell 🕊️
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
