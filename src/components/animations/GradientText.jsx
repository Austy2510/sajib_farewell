import './GradientText.css';

export default function GradientText({ children, className = '', colors = ['#6366F1', '#EC4899', '#F59E0B'] }) {
    const gradientStyle = {
        backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`
    };

    return (
        <span className={`animated-gradient-text ${className}`} style={gradientStyle}>
            {children}
        </span>
    );
}
