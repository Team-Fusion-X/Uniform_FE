import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import MyPage from './myPage/myPage.js';
import SignUpPage from './signUp/signUpPage.js';
import SignUpPage2 from './signUp/signUpPage2.js';
import LoginPage from './login/loginPage.js';
import MySpec from './mySpec/mySpec.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<App />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/myspec" element={<MySpec />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signup2" element={<SignUpPage2 />} />
        </Routes>
        
      </BrowserRouter>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
