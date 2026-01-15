import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Hero3D from './components/Hero3D';
import Timeline from './components/Timeline';
import Farewell from './components/Farewell';
import MessageBoard from './components/MessageBoard';
import LiquidEther from './components/animations/LiquidEther';
import './styles/index.css';

function App() {
  return (
    <Router>
      <div className="app">
        {/* Fixed background layer */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'auto',
          opacity: 0.4
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

        {/* Content layer */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<Hero3D />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/farewell" element={<Farewell />} />
            <Route path="/message-board" element={<MessageBoard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
