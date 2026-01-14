import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ScrollReveal({
    children,
    className = '',
    delay = 0,
    direction = 'up' // 'up', 'down', 'left', 'right'
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const directions = {
        up: { y: 50, x: 0 },
        down: { y: -50, x: 0 },
        left: { x: 50, y: 0 },
        right: { x: -50, y: 0 }
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{
                opacity: 0,
                ...directions[direction],
                filter: 'blur(10px)'
            }}
            animate={isInView ? {
                opacity: 1,
                x: 0,
                y: 0,
                filter: 'blur(0px)'
            } : {}}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.25, 0.4, 0.25, 1]
            }}
        >
            {children}
        </motion.div>
    );
}
