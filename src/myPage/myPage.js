import './myPage.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyPage () {

  const navigate = useNavigate();

  let [정보, 정보변경] = useState({
    name : '',
    password : '',
    phoneNumber : '',
  });

  // 첫 페이지 로드시 서버 데이터 가져오기
  useEffect( () => {
    axios.get('http://127.0.0.1:8000/auth/signup/').then((결과) => {
      console.log(결과.data);
      정보변경({
        ...정보,

      })
    })
    .catch(() => {
      console.log('에러 발생');
    })
  }, []);


  let changeNumber = (e) => {
    정보변경({
      ...정보,
      phoneNumber: e.target.value
    });
    console.log(정보)
  }

  let changePassword = (e) => {
    정보변경({
      ...정보,
      password : e.target.value
    });
    console.log(정보)
  }



  return (
    <div className="my-page">
    
      <p className="main-title">마이페이지</p>

      <div className="grid">
        <div className="name">
          <p className="title">이름</p>
          {/* GET 이름불러오기 */}
          <label>홍길동</label>
        </div>

        <div className="password">
          <p className="title">비밀번호</p>
          <input 
            type='password' 
            name="password"
            value={정보.password}
            className="input" 
            placeholder='password' 
            onChange={changePassword}>
          </input>
        </div>

        <div className="number">
          <p className="title">전화번호</p>
          <input
            type='text' 
            name="phoneNumber"
            value={정보.phoneNumber}
            className="input" 
            placeholder='number' 
            onChange={changeNumber}>
          </input>
        </div>
          

        <div>
          <button className="button">
            <p className="btn-text" onClick={() => { navigate('/spec') }}>내입시 정보</p>
          </button>
          
          <button className="button">
            <p className="btn-text" onClick={() => {
              // 수정 완료시 post 요청후 페이지 새로고침
              axios.post('url', {password: '1234', phoneNumber: '010'}).then(() => {
                // 페이지 재렌더링
              })
              .catch(() => {
                console.log('에러 발생');
              })


              }}>수정 완료</p>
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