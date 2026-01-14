import { useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity, useMotionValue } from 'framer-motion';
import './ScrollVelocity.css';

export default function ScrollVelocity({ text, baseVelocity = 1, className = '' }) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 25], {
        clamp: false
    });

    const x = useTransform(baseX, (v) => `${v}%`);

    useEffect(() => {
        let animationFrame;

        const animate = () => {
            const velocity = velocityFactor.get();
            const currentX = baseX.get();

            // Allow direction change based on scroll direction
            let moveBy = baseVelocity * (1 + Math.abs(velocity / 100)); // boost velocity
            if (velocity < 0) {
                // if scrolling up, maybe reverse? No, usually just speed up in current direction
                // or follow scroll? 
                // Standard scroll velocity follows scroll direction.
                // If base is 5 (right), and we scroll down (vel > 0), it goes 10 (faster right).
                // If we scroll up (vel < 0), it goes 0 or -5 (left)?
                // Let's make it additive.
            }

            // Simple additive model
            moveBy += velocity * 0.05;

            // Apply direction parity
            if (baseVelocity < 0) {
                // Moving left
                if (velocity > 0) moveBy -= velocity * 0.05; // scrolling down makes it go faster left
                else moveBy += velocity * 0.05; // scrolling up makes it slow down or reverse
            } else {
                // Moving right
                if (velocity > 0) moveBy += velocity * 0.05; // scrolling down makes it go faster right
                else moveBy -= velocity * 0.05; // scrolling up makes it slow down or reverse
            }

            // Simplified: just add velocity to base, but handle direction
            // Actually the original useScroll gives velocity with sign.
            // If we want the ticker to "respond" to scroll.
            // newX = currentX + (baseVelocity + velocity * factor) * delta

            const newX = currentX + (baseVelocity + velocity * 0.02) * 0.2; // Tuned factors

            if (newX < -50) {
                baseX.set(0);
            } else if (newX > 0) {
                baseX.set(-50);
            } else {
                baseX.set(newX);
            }

            animationFrame = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationFrame);
    }, [baseVelocity, velocityFactor, baseX]);

    return (
        <div className={`scroll-velocity-container ${className}`}>
            <motion.div className="scroll-velocity-track" style={{ x }}>
                {Array.from({ length: 8 }).map((_, i) => (
                    <span key={i} className="scroll-velocity-text">{text} </span>
                ))}
            </motion.div>
        </div>
    );
}
