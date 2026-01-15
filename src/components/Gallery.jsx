import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Masonry from './Masonry/Masonry';
import ShinyText from './animations/ShinyText';
import './Gallery.css';

// Photo data with varying heights for masonry effect
const photos = [
    { id: 1, img: './photos/10d1de57-104b-4ad6-a47b-2745741a4807.jpg', height: 400 },
    { id: 2, img: './photos/2494e745-5954-4c67-a8f1-e58ca616ad31.jpg', height: 300 },
    { id: 3, img: './photos/2aa5ae44-d021-4d85-bfa4-688d66f877f6.jpg', height: 350 },
    { id: 4, img: './photos/3f7110a4-59e2-4dca-986b-1eb3be947160.jpg', height: 380 },
    { id: 5, img: './photos/405cc8af-dab3-415e-a5ad-c981f8fdaad1.jpg', height: 320 },
    { id: 6, img: './photos/43566745-df2e-4f08-9e5b-87d1f9e9ec5c.jpg', height: 360 },
    { id: 7, img: './photos/46c9000e-d8a2-4496-9029-21b278ebae50.jpg', height: 340 },
    { id: 8, img: './photos/8e5707e3-0866-4fe6-ae4a-3384d28cb7f6.jpg', height: 380 },
    { id: 9, img: './photos/WhatsApp Image 2026-01-15 at 11.16.02 AM.jpeg', height: 350 },
    { id: 10, img: './photos/b41bf42d-52c1-422c-9e4c-15809ff78b0f.jpg', height: 400 },
    { id: 11, img: './photos/bba42033-4c3d-4900-84ee-65f185a2e304.jpg', height: 320 },
    { id: 12, img: './photos/bf4f73fb-9826-4600-b914-f45a1cd07305.jpg', height: 360 },
    { id: 13, img: './photos/c8d95aaa-7ec7-46fa-bdb1-9bb8cba2c7c0.jpg', height: 340 },
    { id: 14, img: './photos/d0599665-2798-48c3-836e-a013f1061b8f.jpg', height: 380 },
    { id: 15, img: './photos/d895f618-9da0-4709-b1de-f8f49dd979bb.jpg', height: 400 },
];

export default function Gallery() {
    const navigate = useNavigate();

    return (
        <section className="gallery-section section">
            <div className="gallery-container">
                <motion.div
                    className="gallery-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-title">
                        Memories <ShinyText><span className="gradient-text">Together</span></ShinyText>
                    </h2>
                    <p className="section-subtitle">
                        Moments we shared with our beloved Sajib
                    </p>
                </motion.div>

                <motion.div
                    className="masonry-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Masonry
                        items={photos}
                        animateFrom="bottom"
                        stagger={0.04}
                        scaleOnHover={true}
                        hoverScale={0.98}
                        blurToFocus={true}
                        colorShiftOnHover={false}
                    />
                </motion.div>

                {/* Video Highlight Section */}
                <motion.div
                    className="video-highlight-section"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <div className="video-highlight-header">
                        <h3 className="video-highlight-title">
                            <span className="highlight-star">⭐</span>
                            Highlight Moment
                            <span className="highlight-star">⭐</span>
                        </h3>
                        <p className="video-highlight-subtitle">A special memory with Sajib</p>
                    </div>
                    <div className="video-container">
                        <video
                            className="highlight-video"
                            controls
                            playsInline
                            poster=""
                        >
                            <source src="./photos/highlight-video.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </motion.div>

                <motion.div
                    className="gallery-navigation"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
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
            </div>
        </section>
    );
}
