import { useRef, useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { motion, AnimatePresence } from 'framer-motion';
import GradientText from './animations/GradientText';
import ShinyText from './animations/ShinyText';
import './Hero3D.css';


// Particle system component
function ParticleField(props) {
    const ref = useRef();

    // Generate random particle positions in a sphere
    const sphere = useMemo(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }), []);

    // Animate particles
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#6366F1"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

import TypewriterText from './animations/TypewriterText';
import DarkVeil from './animations/DarkVeil';

// Scroll indicator component
function ScrollIndicator({ delay }) {
    const navigate = useNavigate();

    return (
        <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay, duration: 1 }}
            onClick={() => navigate('/timeline')}
            style={{ cursor: 'pointer' }}
        >
            <motion.div
                className="scroll-arrow"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                ↓
            </motion.div>
            <p>Next: Our Journey</p>
        </motion.div>
    );
}

export default function Hero3D() {
    const [phase, setPhase] = useState(1); // 1: Title, 2: Description, 3: Dates
    const navigate = useNavigate();

    useEffect(() => {
        // Switch to Phase 2 (Description) after 7s
        const timer1 = setTimeout(() => {
            setPhase(2);
        }, 7000);

        // Switch to Phase 3 (Dates) after 17s (7s + 10s)
        const timer2 = setTimeout(() => {
            setPhase(3);
        }, 17000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    const exitAnimation = { opacity: 0, y: -20, filter: 'blur(10px)', transition: { duration: 0.8 } };

    return (
        <section className="hero-section">
            {/* Dark Veil Background */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none'
            }}>
                <DarkVeil
                    speed={0.5}
                    hueShift={0}
                    noiseIntensity={0.02}
                    scanlineIntensity={0.1}
                    scanlineFrequency={0.01}
                    warpAmount={0}
                    resolutionScale={0.8}
                />
            </div>

            {/* 3D Canvas Background */}
            <div className="canvas-container">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <ParticleField />
                </Canvas>
            </div>

            {/* Gradient Overlay */}
            <div className="gradient-overlay"></div>

            {/* Hero Content */}
            <div className="hero-content">
                <AnimatePresence mode="wait">
                    {phase === 1 && (
                        <motion.div
                            key="phase-1"
                            className="hero-text"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={exitAnimation}
                            transition={{ duration: 1 }}
                        >
                            <motion.h1
                                className="hero-title"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                A Journey with <GradientText colors={['#6366F1', '#EC4899', '#F59E0B', '#10B981']}>Jugantor</GradientText>
                            </motion.h1>

                            <motion.div
                                className="hero-subtitle"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            >
                                <h2>Farewell to</h2>
                                <h3 className="name">
                                    <ShinyText>
                                        Sajib Mollick
                                    </ShinyText>
                                </h3>
                            </motion.div>
                        </motion.div>
                    )}

                    {phase === 2 && (
                        <motion.div
                            key="phase-2"
                            className="hero-description-container"
                            style={{ minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={exitAnimation}
                            transition={{ duration: 0.8 }}
                        >
                            <p className="hero-description">
                                <TypewriterText
                                    text="From day one to this moment, you've been an integral part of our journey. As you embark on a new chapter, we celebrate the memories we've shared."
                                    delay={500} // Short delay after phase switch
                                    speed={30}
                                />
                            </p>
                        </motion.div>
                    )}

                    {phase === 3 && (
                        <motion.div
                            key="phase-3"
                            className="hero-dates-container"
                            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            transition={{ duration: 1 }}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}
                        >
                            <div className="hero-dates">
                                <motion.div
                                    className="date-badge"
                                    whileHover={{ scale: 1.05, y: -8 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <span className="date-label">Started</span>
                                    <span className="date-value">August 25, 2024</span>
                                </motion.div>
                                <div className="date-separator">→</div>
                                <motion.div
                                    className="date-badge"
                                    whileHover={{ scale: 1.05, y: -8 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <span className="date-label">Departing</span>
                                    <span className="date-value">January 19, 2026</span>
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 1 }}
                                onClick={() => navigate('/timeline')}
                                className="scroll-indicator"
                                style={{ marginTop: '2rem' }}
                            >
                                <motion.div
                                    className="scroll-arrow"
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    ↓
                                </motion.div>
                                <p>Next: Our Journey</p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section >
    );
}
