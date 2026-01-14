import { useState, useRef, useEffect } from 'react';
import './VariableProximity.css';

export default function VariableProximity({ children, className = '' }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const ref = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;
            const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

            const maxDistance = 300;
            const proximity = Math.max(0, 1 - (distance / maxDistance));

            setMousePos({ x: distanceX, y: distanceY, proximity });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const fontWeight = 300 + (mousePos.proximity || 0) * 600; // 300 to 900

    return (
        <span
            ref={ref}
            className={`variable-proximity-text ${className}`}
            style={{ fontWeight }}
        >
            {children}
        </span>
    );
}
