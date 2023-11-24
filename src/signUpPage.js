import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function SignUpPage() {
    // 페이지 이동하는 useNavigate 사용
    const navigate = useNavigate();

    // 임의로 인증번호 지정 (추후 확인 코드 필요)
    const verificationCode = '123456';

    // state 사용해서 입력 정보 관리
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        confirmNumber: '',
    });

    // 입력 값에 대한 상태를 업데이트하는 함수
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    // 인증 여부를 state로 관리
    const [isVerified, setIsVerified] = useState(false);


    // 인증 확인 함수
    function handleVerification() {
        if (formData.confirmNumber === verificationCode) {
            setIsVerified(true); // 인증 성공 시 상태 업데이트
            alert('인증에 성공하셨습니다!');
        } else {
            setIsVerified(false); // 인증 실패 시 상태 업데이트
            alert('인증번호를 다시 확인해주세요.');
        }
    }

    // 다음 버튼을 눌렀을 때에 대한 함수
    function handleSubmit(e) {
        e.preventDefault();  // 이벤트의 기본 동작을 막는 메서드

        // 인증에 성공한 경우에만 다음 페이지로 이동
        if (isVerified) {
            navigate('/signUp2');
        } else {
            alert('인증을 완료해주세요.');
        }
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
                        />
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="전화번호 (-를 제외한 숫자만 입력해주세요)"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                        <div className="confirmNumberGroup">
                            <input
                                type="text"
                                name="confirmNumber"
                                placeholder="인증번호 입력"
                                value={formData.confirmNumber}
                                onChange={handleChange}
                                autoComplete="off"
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
                </div>
                <button type="submit" className="nextButton">다음</button>
            </form>
        </div>
    );
}

export default SignUpPage;
