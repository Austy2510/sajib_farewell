import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './TypewriterEffect.css';

export default function TypewriterText({ text, delay = 0, speed = 30 }) {
    const [displayText, setDisplayText] = useState('');
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setStarted(true);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [delay]);

    useEffect(() => {
        if (!started) return;

        let i = -1;
        const interval = setInterval(() => {
            i++;
            if (i < text.length) {
                setDisplayText(text.substring(0, i + 1));
            } else {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, started]);

    return (
        <span>
            {displayText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="typing-cursor"
            >
                |
            </motion.span>
        </span>
    );
}
