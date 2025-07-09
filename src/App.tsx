import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './page/home/HomePage.tsx'
import CameraPage from './page/camera/CameraPage.tsx';
import VideoDetailPage from './page/video/VideoDetailPage.tsx';
import NotFoundPage from './page/error/NotFoundPage.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/camera" element={<CameraPage />} />
        <Route path="/videos/:id" element={<VideoDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
