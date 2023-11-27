import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './signUpPage.css';

function SignUpPage() {
  // 페이지 이동을 위한 useNavigate 사용
  const navigate = useNavigate();

  // 임의의 인증번호 (실제로는 서버에서 처리)
  const verificationCode = '123456';

  // 입력된 정보를 상태로 관리
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    confirmNumber: '',
    csrfToken: '', // CSRF 토큰을 저장할 상태 변수
  });

  // 사용자의 인증 여부를 관리하는 상태 변수
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때, 서버에서 CSRF 토큰을 가져옴
    fetch('https://127.0.0.1:8000/csrf-token')
      .then(response => response.json())
      .then(data => setFormData({ ...formData, csrfToken: data.csrfToken }))
      .catch(error => console.error('CSRF 토큰을 가져오는 중 오류 발생:', error));
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

  // 휴대폰 번호로 인증번호를 요청하는 함수
  function requestVerificationNumber() {
    // 휴대폰 번호가 입력되었는지 확인
    if (!formData.phoneNumber || !/^\d{10,11}$/.test(formData.phoneNumber)) {
      alert('휴대폰 번호를 올바르게 입력해주세요.');
      return;
    }

    // 서버에서 인증번호를 전송하도록 수정 (실제로는 서버에서 처리)
    alert(`휴대폰 번호로 인증번호가 전송되었습니다. (임의의 인증번호: ${verificationCode})`);
  }

  // 사용자 입력 값이 변경될 때 호출되는 함수
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // 인증번호 확인 버튼 클릭 시 호출되는 함수
  function handleVerification() {
    if (formData.confirmNumber === verificationCode) {
      setIsVerified(true);
      alert('인증에 성공하셨습니다!'); // 인증 성공 메시지 표시
    } else {
      setIsVerified(false);
      alert('인증번호를 다시 확인해주세요.');
    }
  }

  // 서버로 전송할 데이터를 가지고 있는 객체
    const requestData = {
    name: formData.name,
    phoneNumber: formData.phoneNumber,
    confirmNumber: formData.confirmNumber,
    csrfToken: formData.csrfToken, // CSRF 토큰을 요청에 포함
  };
  
  // 폼 제출 시 호출되는 함수
  function handleSubmit(e) {
    e.preventDefault();
    // 폼 유효성 검사
    if (!isVerified) {
      alert('인증을 완료해주세요.');
      return;
    }
  
    // 서버 URL
    const apiUrl = 'https://127.0.0.1:8000/login';
  
    // 서버에 POST 요청 보내기
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        // 서버 응답에 따른 처리
        console.log('서버 응답:', data);
        if (data.success) {
          navigate('/signUp2'); // 성공 시 다음 페이지로 이동
        } else {
          alert('회원가입 실패. 다시 시도해주세요.');
        }
      })
      .catch(error => {
        // 네트워크 오류 또는 서버에서 반환한 에러 처리
        console.error('회원가입 동작에 문제가 있습니다:', error.message);
      });
  }
  
  // 다음 버튼 클릭 시 호출되는 함수
  function handleNextButtonClick() {
    // 폼 유효성 검사
    if (!isVerified) {
      alert('인증을 완료해주세요.');
      return;
    }
  
    navigate('/signUp2'); // 다음 페이지로 이동
  }

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <div className="signUpFormGroup">
            <input
              type="text"
              name="name"
              placeholder="이름"
              value={formData.name}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="verificationNumberGroup">
            <input
              type="tel"
              name="phoneNumber"
              placeholder="전화번호 (-를 제외한 숫자만 입력해주세요)"
              value={formData.phoneNumber}
              onChange={handleChange}
              autoComplete="off"
              pattern="[0-9]{10,11}"
              required
            />
            <button
              type="button"
              className="verificationNumberButton"
              onClick={requestVerificationNumber}
            >
              인증번호 요청
            </button>
          </div>
          <div className="confirmNumberGroup">
            <input
              type="text"
              name="confirmNumber"
              placeholder="인증번호 입력"
              value={formData.confirmNumber}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            <button
              type="button"
              className="confirmationButton"
              onClick={handleVerification}
            >
              인증확인
            </button>
          </div>
        </div>
        <button type="submit" onClick={handleNextButtonClick} className="nextButton">
          다음
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;