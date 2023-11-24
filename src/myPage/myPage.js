import './myPage.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MyPage () {

  let [정보, 정보변경] = useState({
    
  });


  return (
    <div className="my-page">
    
      <p className="main-title">마이페이지</p>

      <div className="grid">
        <div className="id">
          <p className="title">아이디</p>
          <input className="input" placeholder="id"></input>
        </div>

        <div className="password">
          <p className="title">비밀번호</p>
          <input className="input" placeholder='password'></input>
        </div>

        <div className="name">
          <p className="title">이름</p>
          <input className="input" placeholder='name'></input>
        </div>

        <div className="number">
          <p className="title">전화번호</p>
          <input className="input" placeholder='number'></input>
        </div>

        <div>
          <button className="button">
            <p className="btn-text">내입시 정보</p>
          </button>
          
          <button className="button">
            <p className="btn-text">수정 완료</p>
          </button>
        </div>
        
      </div>
      

    
      <Link to="leave">
        <p className="leave">회원탈퇴</p>
      </Link>

  </div>
  )
}

export default MyPage;