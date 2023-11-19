import React from 'react';
import LoginPage from './loginPage.js';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
