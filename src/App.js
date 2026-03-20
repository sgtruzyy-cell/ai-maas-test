import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeContext';
import ModelSquare from './components/ModelSquare';
import Overview from './components/Overview';

function App() {
  const [currentPage, setCurrentPage] = useState('model-square');

  return (
    <ThemeProvider>
      {currentPage === 'overview' ? (
        <Overview currentPage={currentPage} onNavigate={setCurrentPage} />
      ) : (
        <ModelSquare currentPage={currentPage} onNavigate={setCurrentPage} />
      )}
    </ThemeProvider>
  );
}

export default App;
