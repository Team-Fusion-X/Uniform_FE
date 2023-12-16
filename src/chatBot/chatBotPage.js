import React, { useState, useEffect, useRef } from 'react';
import './chatBotPage.css';
import Modal1 from './modal1.js';
import Modal2 from './modal2.js';
import Modal3 from './modal3.js';

function ChatBot() {
  const [userInput, setUserInput] = useState(''); // 사용자의 입력을 저장하는 상태
  const [chat, setChat] = useState([]); // 채팅 내용을 저장하는 상태
  const [userResponses, setUserResponses] = useState([]); // 사용자의 답변을 저장하는 상태
  const chatWindowRef = useRef(null); // 채팅창을 참조하기 위한 useRef
  const [showCompetitionModal, setShowCompetitionModal] = useState(false); // 공모전 모달 표시 여부
  const [showActivityModal, setShowActivityModal] = useState(false); // 교과활동 모달 표시 여부
  const [questionCount, setQuestionCount] = useState(1); // 질문 카운트를 저장하는 상태
  const [questionIndex, setQuestionIndex] = useState(0);
  const [allResponses, setAllResponses] = useState([]); // 사용자의 모든 응답을 저장하는 상태
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [chat]);

  useEffect(() => {
    const welcomeMessage =
      '자기소개서에 대해 도움을 드리겠습니다. 생성, 수정 중 하나를 입력해주세요!';
    setChat([{ type: 'bot', text: welcomeMessage }]);
  }, []);

  function handleInputChange(e) {
    setUserInput(e.target.value);
  }

  function handleSendMessage() {
    if (!userInput.trim()) {
      return;
    }

    // Step 1: 사용자 입력 메시지 추가
    setChat((prevChat) => [...prevChat, { type: 'user', text: userInput }]);
    setUserInput('');

    const apiUrl = 'http://orion.mokpo.ac.kr:8582/api/self-introduction';

    // Step 2: http://orion.mokpo.ac.kr:8582/api/self-introduction에 POST 요청 보내기
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ UserSelectedType: '생성' }),
    })
      .then((response1) => response1.json())
      .then((data1) => {
        // Step 3: 채팅창에 메시지 및 질문 리스트 추가
        setTimeout(() => {
          console.log(JSON.stringify(data1, null, 2));
          // 메시지와 질문 리스트의 개행 문자를 처리
          const formattedMessage = data1.message.replace(/\n/g, '<br>');
          const formattedQuestionList = data1.questionList.map((question) => question.replace(/\n/g, '<br>'));

          setChat((prevChat) => [
            ...prevChat,
            { type: 'bot', text: <div dangerouslySetInnerHTML={{ __html: formattedMessage }} /> },
            { type: 'bot', text: formattedQuestionList.map((question, index) => <div key={index} dangerouslySetInnerHTML={{ __html: question }} />) },
          ]);

          // 사용자가 값을 입력할 수 있게 함
          setQuestionCount(2); // 두 번째 질문으로 넘어가기 위한 상태 변경
        }, 1000); // 1초 지연
      })
      .catch((error) => console.error('Error:', error));
  }

  function handleSendMessageSecond() {
    const userInputValue = userInput.trim();

    setAllResponses((prevResponses) => [...prevResponses, userInputValue]);

    fetch('http://orion.mokpo.ac.kr:8582/api/self-introduction/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ UserSelectedType: '1', userInput: userInputValue }),
    })
      .then((response2) => response2.json())
      .then((data2) => {
        console.log(data2);

        setChat((prevChat) => [
          ...prevChat,
          { type: 'user', text: userInputValue },
        ]);

        const currentQuestionIndex = questionIndex;

        const updateChat = () => {
          if (currentQuestionIndex === 0) {
            setChat((prevChat) => [
              ...prevChat,
              { type: 'bot', text: data2.message[currentQuestionIndex] },
              { type: 'bot', text: data2.message[currentQuestionIndex + 1] },
            ]);
            setQuestionIndex(currentQuestionIndex + 2);
          } else if (currentQuestionIndex < data2.message.length) {
            setChat((prevChat) => [
              ...prevChat,
              { type: 'bot', text: data2.message[currentQuestionIndex] },
            ]);
            setQuestionIndex(currentQuestionIndex + 1);
          }

          if (currentQuestionIndex < userResponses.length) {
            setChat((prevChat) => [
              ...prevChat,
              { type: 'user', text: userResponses[currentQuestionIndex] },
            ]);
          }

          setUserResponses((prevResponses) => [
            ...prevResponses,
            userInputValue,
          ]);

          setUserInput('');

          // 마지막 질문에 도달한 경우 서버로 전송
          if (currentQuestionIndex === data2.message.length) {
            const allJson = {
              problemNumber: '1',
              question: allResponses,
            };

            setLoading(true);

            fetch('http://orion.mokpo.ac.kr:8582/api/unifot', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(allJson),
            })
              .then((response3) => response3.json())
              .then((data3) => {
                console.log(JSON.stringify(data3, null, 2));

                // JSX에서 개행 문자를 <br>로 바꾸어 출력
                const formattedAnswer = data3.answer.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ));

                setChat((prevChat) => [...prevChat, { type: 'bot', text: formattedAnswer }]);
              })
              .catch((error) => console.error('Error:', error))
              .finally(() => {
                setLoading(false); // 'unifot' API 호출이 완료되면 loading 상태를 false로 설정
              });
          }
        };

        // 1초 후에 응답을 표시
        setTimeout(updateChat, 1000);
      })
      .catch((error) => console.error('Error:', error));
  }

  // 엔터 키를 눌렀을 때 메시지 전송
  function handleInputKeyPress(e) {
    if (e.key === 'Enter') {
      if (questionCount === 1) {
        handleSendMessage();
      } else if (questionCount === 2) {
        handleSendMessageSecond();
      }
    }
  }

  // 페이지 새로고침 버튼 클릭 시 초기화
  function handleRefresh() {
    setChat([]);
    setUserInput('');

    const welcomeMessage = '자기소개서에 대해 도움을 드리겠습니다. 생성, 수정 중 하나를 입력해주세요!';
    setChat([{ type: 'bot', text: welcomeMessage }]);
  }

  // 모달 닫기 함수
  function closeModal() {
    setShowActivityModal(false);
    setShowCompetitionModal(false);
    setLoading(false);
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
        <button onClick={questionCount === 1 ? handleSendMessage : handleSendMessageSecond}>전송</button>
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

      {loading && (
        <div className="modal">
          <div className="modalContent">
            <Modal3 closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;