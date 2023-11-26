import './App.css';
import React from 'react';
import SignUpPage from './signUpPage.js';
import SignUpPage2 from './signUpPage2.js';
import LoginPage from './loginPage.js';
import { Routes, Route, Link } from 'react-router-dom';
import FocusAnalysis from './menu/focusAnalysis.js';
import AllAnalysis from './menu/allAnalysis.js';
import MapAnalysis from './menu/mapAnalysis.js';
import ChatBot from './menu/chatBot.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyPage from './myPage/myPage.js';

function App() {
  return (
    <div className="App">
      
      <div className="bar" />
      <div className="logo" />
      <div className="mypage-btn">
        <Link to="mypage">
          로그인/마이페이지
        </Link>
      </div>
 
      <Routes>
        <Route path="/" element={
          <div>
            <div className="menu-container">
              <FocusAnalysis></FocusAnalysis>
              <AllAnalysis></AllAnalysis>
              <MapAnalysis></MapAnalysis>
              <ChatBot></ChatBot>
            </div>
          </div>   
        }/>
      </Routes>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signup2" element={<SignUpPage2 />} />
      </Routes>
    </div>
  );
}

export default App;
