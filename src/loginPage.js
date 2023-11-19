import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function LoginPage () {
  // 페이지 이동하는 useNavigate 사용
  const navigate = useNavigate();

  // state 사용해서 입력 정보 관리
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    rememberId: false,
  });

  // 입력 값에 대한 상태를 업데이트하는 함수
  function handleChange(e) {
    if (e.target.name === 'rememberId') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // 로그인 버튼을 눌렀을 때에 대한 함수
  function handleSubmit(e) {
    e.preventDefault();  // 이벤트의 기본 동작을 막는 메서드

    // 임의로 지정 (나중에 DB 사용해야 할 부분)
    const appointUser = {
      userId: 'testuser',
      password: '1234',
    };

    if (formData.userId === appointUser.userId && formData.password === appointUser.password) {
      // 아이디와 비밀번호가 일치할 때
      const isSuccess = window.confirm('로그인 성공! 오늘 하루도 화이팅!');

      if (isSuccess) {
        // 성공하면 아이디와 비밀번호 초기화
        setFormData({
          userId: '',
          password: '',
        });
      }
    } else if (formData.userId === appointUser.userId) {
      // 아이디만 일치할 때 알림창
      alert('비밀번호를 다시 확인해주세요.');
    } else {
      // 아이디도 일치하지 않을 때 알림창
      alert('입력하신 정보를 다시 확인해주세요.');
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <div className="loginFormGroup">
            <input
              type="text"
              name="userId"
              placeholder="아이디"
              value={formData.userId}
              onChange={handleChange}
              autoComplete="off"
            />
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="loginButton">로그인</button>
        
        <div className="belowFormGroup">
          <div className="rememberId">
            <label>
              <input
                type="checkbox"
                name="rememberId"
                checked={formData.rememberId}
                onChange={handleChange}
              />
              아이디 저장
            </label>
          </div>
          <div className="signUpFindGroup">
            <label className="signUp" onClick={() => navigate('/signup')}>
              회원가입
            </label>
            <label className="idFind" onClick={() => navigate('/findId')}>
              아이디 찾기
            </label>
            <label className="passwordFind" onClick={() => navigate('/findPassword')}>
              비밀번호 찾기
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;