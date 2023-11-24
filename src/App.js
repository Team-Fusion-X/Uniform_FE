import './App.css';
import React from 'react';
import SignUpPage from './signUpPage.js';
import SignUpPage2 from './signUpPage2.js';
import LoginPage from './loginPage.js';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signup2" element={<SignUpPage2 />} />
          <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;