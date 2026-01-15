import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Hero3D from './components/Hero3D';
import Timeline from './components/Timeline';
import Farewell from './components/Farewell';
import MessageBoard from './components/MessageBoard';
import DarkVeil from './components/animations/DarkVeil';
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
          pointerEvents: 'none',
          opacity: 0.4
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
