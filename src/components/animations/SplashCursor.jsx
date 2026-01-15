import { useEffect, useState } from 'react';
import './SplashCursor.css';

export default function SplashCursor() {
    const [splashes, setSplashes] = useState([]);

    useEffect(() => {
        let splashId = 0;

        const handleMouseMove = (e) => {
            // Create splash effect at cursor position
            const newSplash = {
                id: splashId++,
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 20 + 10 // Random size between 10-30px
            };

            setSplashes(prev => [...prev, newSplash]);

            // Remove splash after animation completes
            setTimeout(() => {
                setSplashes(prev => prev.filter(s => s.id !== newSplash.id));
            }, 800);
        };

        // Throttle mousemove to avoid too many splashes
        let lastTime = 0;
        const throttledMouseMove = (e) => {
            const now = Date.now();
            if (now - lastTime > 50) { // Create splash every 50ms max
                lastTime = now;
                handleMouseMove(e);
            }
        };

        window.addEventListener('mousemove', throttledMouseMove);

        return () => {
            window.removeEventListener('mousemove', throttledMouseMove);
        };
    }, []);

    return (
        <div className="splash-cursor-container">
            {splashes.map(splash => (
                <div
                    key={splash.id}
                    className="splash"
                    style={{
                        left: `${splash.x}px`,
                        top: `${splash.y}px`,
                        width: `${splash.size}px`,
                        height: `${splash.size}px`,
                    }}
                />
            ))}
        </div>
    );
}
