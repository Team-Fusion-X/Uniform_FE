import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signUpPage.css';

function SignUpPage2() {
  // 페이지 이동을 위한 useNavigate 사용
  const navigate = useNavigate();

  // 입력된 정보를 상태로 관리s
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
  });

  // 사용자의 인증 여부를 관리하는 상태 변수
  const [isUserIdAvailable, setIsUserIdAvailable] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  // 사용자 입력 값이 변경될 때 호출되는 함수
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === 'confirmPassword') {
      setIsPasswordMatch(formData.password === e.target.value);
    }
  }

  // 입력값 유효성 검사 함수
  function validateInput() {
    const userIdPattern = /^(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    let isValid = true;

     // 아이디 유효성 검사
    if (!userIdPattern.test(formData.userId)) {
      alert('아이디는 영문, 숫자, 특수문자 중 2가지 이상의 조합으로 8글자 이상이어야 합니다.');
      isValid = false;
    }

     // 비밀번호 유효성 검사
    if (!passwordPattern.test(formData.password)) {
      alert('비밀번호는 영문, 숫자, 특수문자 중 2가지 이상의 조합으로 8글자 이상이어야 합니다.');
      isValid = false;
    }

    return isValid;
  }

  // 중복 확인 함수
  function handleCheckDuplicate() {
    // 임의의 중복 확인 로직
    const existingUserIds = ['test1234', 'user4567', 'admin789'];
    // 중복 여부 확인
    const isDuplicate = existingUserIds.some(id => id === formData.userId);

    // 중복 시 처리
    if (isDuplicate) {
      setIsUserIdAvailable(false);
      alert('입력하신 아이디는 이미 존재합니다.');
    // 아이디 형식 불일치 시 처리
    } else if (!/^(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(formData.userId)) {
      setIsUserIdAvailable(false);
      alert('아이디는 영문, 숫자, 특수문자 중 2가지 이상의 조합으로 8글자 이상이어야 합니다.');
    // 중복이 없고 아이디 형식도 일치하는 경우
    } else {
      setIsUserIdAvailable(true);
      alert('사용 가능한 아이디입니다!');
    }
  }

  // 회원가입 제출 함수
  function handleSubmit(e) {
    e.preventDefault();

    // 모든 조건이 충족될 때 회원가입 성공 처리
    if (isUserIdAvailable && isPasswordMatch && validateInput()) {
      // 회원가입 성공 알림창
      const isSuccess = window.confirm('회원가입 성공! 입시정보왕이 되어 보세요!');

      // 확인 시 초기화 및 홈페이지 이동
      if (isSuccess) {
        setFormData({
          userId: '',
          password: '',
          confirmPassword: '',
        });

        navigate('/');
      }
    }
  }

  return (
    <div className="signUpPage">
      <div className="mainBar">
        <div className="mainLogo" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <div className="idPasswordGroup">
            <h2>UNIform</h2>
            <div className="confirmIdGroup">
              <input
                type="text"
                name="userId"
                placeholder="아이디"
                value={formData.userId}
                onChange={handleChange}
                autoComplete="off"
              />
              <button type="button" onClick={handleCheckDuplicate}>
                중복확인
              </button>
            </div>
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {!isPasswordMatch && (
              <div style={{ color: 'black', fontSize: 11 }}>
                비밀번호가 일치하지 않습니다. 다시 확인해주세요.
              </div>
            )}
            <button type="submit" className="signUpButton">
              회원가입하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage2;