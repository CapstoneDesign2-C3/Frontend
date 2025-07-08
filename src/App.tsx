import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeLayout from './page/home/HomeLayout.tsx'
import CameraLayout from './page/camera/CameraLayout.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomeLayout />} />
        <Route path="/camera" element={<CameraLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
