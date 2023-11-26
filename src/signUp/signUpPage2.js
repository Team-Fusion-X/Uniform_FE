import React, { useState } from 'react';
import './signUpPage.css';

function SignUpPage2() {
  // state 사용해서 입력 정보 관리
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
  });

  // 아이디 중복 여부를 state로 관리
  const [isUserIdAvailable, setIsUserIdAvailable] = useState(false);

  // 비밀번호 일치 여부를 state로 관리
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  // 입력 값에 대한 상태를 업데이트하는 함수
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // 비밀번호와 비밀번호 확인이 일치하는지 여부 확인
    if (e.target.name === 'confirmPassword') {
      setIsPasswordMatch(formData.password === e.target.value);
    }
  }

  // 아이디 중복 확인 함수
  function handleCheckDuplicate() {
    // 임의로 아이디 값을 지정
    const existingUserId = 'test123';

    if (formData.userId === existingUserId) {
      // 아이디가 중복되는 경우
      alert('입력하신 아이디는 이미 존재합니다.');
      setIsUserIdAvailable(false);
    } else {
      // 아이디가 중복되지 않는 경우
      alert('사용 가능한 아이디입니다!');
      setIsUserIdAvailable(true);
    }
  }

  // 회원가입하기 버튼을 눌렀을 때에 대한 함수
  function handleSubmit(e) {
    e.preventDefault(); // 이벤트의 기본 동작을 막는 메서드

    // 아이디와 비밀번호에 대한 정규 표현식
    const userIdPattern = /^[a-zA-Z0-9]{8,}$/;
    const passwordPattern = /^[a-zA-Z0-9]{8,}$/;

    // 사용 가능한 아이디이고, 비밀번호와 비밀번호 확인이 일치하는 경우
    if (isUserIdAvailable && isPasswordMatch) {
      // 성공 메시지 띄움
      const isSuccess = window.confirm('회원가입 성공! 입시정보왕이 되어 보세요!');

      if (isSuccess) {
        // 성공하면 입력정보를 초기화
        setFormData({
          userId: '',
          password: '',
          confirmPassword: '',
        });
      }
    } else {
      // 실패한 경우 알림창 띄움
      alert('인증을 모두 완료해주세요.');
    }
  }

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <div className="idPasswordGroup">
            <div className="confirmIdGroup">
              <input
                type="text"
                name="userId"
                placeholder="아이디"
                value={formData.userId}
                onChange={handleChange}
                autoComplete="off"
              />
              <button type="button" onClick={handleCheckDuplicate}>중복확인</button>
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
              <div style={{ color: 'black', fontSize: 11}}>비밀번호가 일치하지 않습니다. 다시 확인해주세요.</div>
            )}
            <button type="submit" className="signUpButton">회원가입하기</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage2;
