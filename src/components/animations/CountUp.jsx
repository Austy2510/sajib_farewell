import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useInView } from 'framer-motion';

export default function CountUp({ value, duration = 2, className = '' }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [displayValue, setDisplayValue] = useState(0);

    const spring = useSpring(0, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        if (isInView) {
            spring.set(value);
        }

        const unsubscribe = spring.on('change', (latest) => {
            setDisplayValue(Math.round(latest));
        });

        return () => unsubscribe();
    }, [isInView, spring, value]);

    return (
        <span ref={ref} className={className}>
            {displayValue}
        </span>
    );
}
