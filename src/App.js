import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ModelSquare from './pages/ModelSquare';
import Overview from './pages/Overview';
import ModelService from './pages/ModelService';
import ExperienceCenter from './pages/ExperienceCenter';
import InferenceManager from './pages/InferenceManager';

function App() {
  const [currentPage, setCurrentPage] = useState('overview');

  return (
    <ThemeProvider>
      {currentPage === 'overview' && (
        <Overview currentPage={currentPage} onNavigate={setCurrentPage} />
      )}
      {currentPage === 'model-square' && (
        <ModelSquare currentPage={currentPage} onNavigate={setCurrentPage} />
      )}
      {currentPage === 'model-service' && (
        <ModelService currentPage={currentPage} onNavigate={setCurrentPage} />
      )}
      {currentPage === 'experience-center' && (
        <ExperienceCenter currentPage={currentPage} onNavigate={setCurrentPage} />
      )}
      {currentPage === 'model-inference' && (
        <InferenceManager currentPage={currentPage} onNavigate={setCurrentPage} />
      )}
      {/* Fallback for other pages while they are being implemented */}
      {!['overview', 'model-square', 'model-service', 'experience-center', 'model-inference'].includes(currentPage) && (
        <ModelSquare currentPage={currentPage} onNavigate={setCurrentPage} />
      )}
    </ThemeProvider>
  );
}

export default App;
