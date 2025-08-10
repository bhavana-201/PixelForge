import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ShortenerPage from './pages/ShortenerPage.jsx';
import QRGenerator from './pages/QRGenerator.jsx';
import BarGenerator from './pages/BarGenerator.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shorten" element={<ShortenerPage />} />
        <Route path="/generate-qr" element={<QRGenerator />} />
        <Route path="/generate-barcode" element={<BarGenerator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
