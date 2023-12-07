import React, { useState, useEffect, useRef } from 'react';
import './chatBotPage.css';
import Modal1 from './modal1.js';
import Modal2 from './modal2.js';

function ChatBot() {
  const [userInput, setUserInput] = useState(''); // 사용자의 입력을 저장하는 상태
  const [chat, setChat] = useState([]); // 채팅 내용을 저장하는 상태
  const [chatbotState, setChatbotState] = useState(''); // 챗봇의 현재 상태를 저장하는 상태
  const chatWindowRef = useRef(null); // 채팅창을 참조하기 위한 useRef
  const [showCompetitionModal, setShowCompetitionModal] = useState(false); // 공모전 모달 표시 여부
  const [showActivityModal, setShowActivityModal] = useState(false); // 교과활동 모달 표시 여부

  // 사용자 입력에 따라 챗봇의 응답을 결정하는 함수
  function getChatbotResponse(userInput, currentState) {
    switch (currentState) {
      case '':
        switch (userInput.toLowerCase()) {
          case '소프트웨어학과':
            return '학과를 입력해주셔서 감사합니다! 이제 자기소개서에 대해 도움을 드리겠습니다. 작성, 수정 중 하나를 입력해주세요!';
          case '작성':
            setChatbotState('waitingForIntroductionRequest');
            return '자기소개서 작성을 하다가 어려움이 생기셨나요? 어려운 점이 있어서 도움 받고 싶다면 네, 처음부터 작성하고 싶다면 아니오라 입력해주세요! 상황에 맞게 도와드릴게요!';
          case '수정':
            setChatbotState('waitingForIntroductionModifyRequest');
            return '자신의 자기소개서를 입력해주세요! 수정을 도와드릴게요!';
          default:
            return '일치하는 대답 없음';
        }
      case 'waitingForIntroductionRequest':
        if (userInput.toLowerCase() === '네') {
          setChatbotState('waitingForIntroductionYes');
          return '어떤 어려움이 있으신가요? 자세히 말씀해주시면 상황에 맞게 작성해드릴게요!';
        } else if (userInput.toLowerCase() === '아니오') {
          setChatbotState('waitingForIntroductionNo');
          return '제 질문에 응답해주시면 알찬 자기소개서를 만들어 드릴게요! 준비되셨으면 네라고 입력해주세요!';
        }
        break;
      case 'waitingForIntroductionYes':
        setChatbotState('');
        return '자기소개서 작성 내용이 나옴.';
      case 'waitingForIntroductionNo':
        if (userInput.toLowerCase() === '네') {
          setChatbotState('waitingForIntroductionYes2');
          return '본인의 성격은 어떠신가요?';
        } else if (userInput.toLowerCase() === '아니오') {
          setChatbotState('waitingForIntroductionNo2');
          return '제 질문에 응답해주시면 알찬 자기소개서를 만들어 드릴게요! 준비되셨으면 네라고 입력해주세요!';
        }
        break;
      case 'waitingForIntroductionYes2':
        setChatbotState('');
        return '질문 내용이 계속 나옴';
      case 'waitingForIntroductionModifyRequest':
        if (userInput.toLowerCase() === '완료') {
          setChatbotState('');
          return [
            '다음은 작성된 데이터를 바탕으로 한 교과활동 및 공모전 추천 내용입니다! 버튼을 눌러주세요!',
            <button className="activityBtn" onClick={() => setShowActivityModal(true)}>
              교과활동 추천
            </button>,
            <button className="competitionBtn" onClick={() => setShowCompetitionModal(true)}>
              공모전 추천
            </button>
          ];
        } else {
          // 현재 상태에서의 로직 계속 진행
          return '(자기소개서 수정 내용이 나옴) 더 도움이 필요하시면 요청해주세요! 수정이 다 되었다고 생각하시면 완료라 말해주세요!';
        }
      default:
        return '일치하는 대답 없음';
    }
  }

  // useEffect를 활용하여 채팅창이 갱신될 때 스크롤을 맨 아래로 이동시키는 효과
  useEffect(() => {
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [chat]);

  // 페이지가 처음 로딩될 때 챗봇의 초기 메시지 설정
  useEffect(() => {
    const welcomeMessage =
      '반갑습니다! 희망하는 학과를 입력해주세요!';
    setChat([{ type: 'bot', text: welcomeMessage }]);
  }, []);

  // 사용자 입력값을 업데이트하는 함수
  function handleInputChange(e) {
    setUserInput(e.target.value);
  }

  // 사용자의 입력 메시지를 전송하는 함수
  function handleSendMessage() {
    if (userInput.trim() === '') return;

    const newChat = [...chat, { type: 'user', text: userInput }];
    setChat(newChat);

    setTimeout(() => {
      const botResponse = getChatbotResponse(userInput, chatbotState);
      const newBotChat = [...newChat, { type: 'bot', text: botResponse }];
      setChat(newBotChat);
    }, 1000);

    setUserInput('');
  }

  // 엔터 키를 눌렀을 때 메시지 전송
  function handleInputKeyPress(e) {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  }

  // 페이지 새로고침 버튼 클릭 시 초기화
  function handleRefresh() {
    setChat([]);
    setUserInput('');
    setChatbotState('');

    const welcomeMessage = '반갑습니다! 희망하는 학과를 입력해주세요!';
    setChat([{ type: 'bot', text: welcomeMessage }]);
  }

  // 모달 닫기 함수
  function closeModal() {
    setShowActivityModal(false);
    setShowCompetitionModal(false);
  }

  return (
    <div className="chatBotPage">
      <div className="mainBar">
        <div className="mainLogo" />
      </div>
      <div className="chatWindow" ref={chatWindowRef}>
        {chat.map((message, index) => (
          <div
            key={index}
            className={`message ${message.type === 'user' ? 'user' : 'bot'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="inputContainer">
        <input
          type="text"
          placeholder="질문을 입력해주세요!"
          value={userInput}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
        />
        <button onClick={handleSendMessage}>전송</button>
        <button onClick={handleRefresh} className="refreshButton">
          새로고침
        </button>
      </div>

      {/* 모달 표시 */}
      {showActivityModal && (
        <div className="modal">
          <div className="modalContent">
            <Modal2 closeModal={closeModal} />
          </div>
        </div>
      )}

      {showCompetitionModal && (
        <div className="modal">
          <div className="modalContent">
            <Modal1 closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
