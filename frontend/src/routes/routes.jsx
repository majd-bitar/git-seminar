import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Quiz from '../pages/Quiz';
import VisualizerPage from '../pages/Visualizer';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Default to Home on / */}
      <Route path="/" element={<Home />} />

      {/* Or if you want /home, that’s up to you */}
      <Route path="/home" element={<Home />} />

      <Route path="/visualizer" element={<VisualizerPage />} />
      <Route path="/quiz" element={<Quiz />} />
      
    </Routes>
  );
}
