import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Hero3D from './components/Hero3D';
import Timeline from './components/Timeline';
import Farewell from './components/Farewell';
import MessageBoard from './components/MessageBoard';
import SplashCursor from './components/animations/SplashCursor';
import './styles/index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <SplashCursor />
        <Routes>
          <Route path="/" element={<Hero3D />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/farewell" element={<Farewell />} />
          <Route path="/message-board" element={<MessageBoard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
