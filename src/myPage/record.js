import { React, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './record.css';

{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> */}

function Record () {
  
  // 선택한 교과
  let [selectSubject, setSelectSubject] = useState();
  // 선택한 교과에 따른 과목 리스트
  let [selectSubjectOption, setSelectSubjectOption] = useState([]);

  // 교과 선택시 호출 함수
  let handleSubjectChange = (e) => {
    let subjectValue = e.target.value;
    setSelectSubject(subjectValue);

    if ( subjectValue === '국어' ) {
      setSelectSubjectOption(['국어1', '국어2', '국어3']);
    } else if ( subjectValue === '수학' ) {
      setSelectSubjectOption(['수학1', '수학2', '수학3']);
    } else if ( subjectValue === '영어' ) {
      setSelectSubjectOption(['영어1', '영어2', '영어3']);
    } else if ( subjectValue === '사회' ) {
      setSelectSubjectOption(['사회1', '사회2', '사회3']);
    } else if ( subjectValue === '과학' ) {
      setSelectSubjectOption(['과학1', '과학2', '과학3']);
    } else if ( subjectValue === '체육' ) {
      setSelectSubjectOption(['체육1', '체육2', '체육3']);
    } else if ( subjectValue === '예술' ) {
      setSelectSubjectOption(['예술1', '예술2', '예술3']);
    } else {
      setSelectSubjectOption([]);
    }
  }


  // 성적 입력값 저장
  let [scoreData, setScoreData] = useState({
    selectSubject: '',
    selectSubjectOption: '',
    unit: '',
    originalScore: '',
    averageScore: '',
    standardDeviation: '',
    numberOfStudents: '',
    grade: '',
  });


  // 각 입력값 저장 함수
  let handleSelectSubjectChange = (e) => {
    setScoreData({
      ...scoreData,
      selectSubject: e.target.value
    });
  };

  let handleSelectSubjectOptionChange = (e) => {
    setScoreData({
      ...scoreData,
      selectSubjectOption: e.target.value
    });
  };

  let handleUnitChange = (e) => {
    setScoreData({
      ...scoreData,
      unit: e.target.value
    });
  };

  let handleOriginalScoreChange = (e) => {
    setScoreData({
      ...scoreData,
      originalScore: e.target.value
    });
  };

  let handleAverageScoreChange = (e) => {
    setScoreData({
      ...scoreData,
      averageScore: e.target.value
   })
  };

  let handleStandardDeviationChange = (e) => {
    setScoreData({
      ...scoreData,
      standardDeviation: e.target.value
   })
  };

  let handleNumberOfStudentsChange = (e) => {
    setScoreData({
      ...scoreData,
      numberOfStudents: e.target.value
   })
  };

  let handleGradeChange = (e) => {
    setScoreData({
      ...scoreData,
      grade: e.target.value
   })
  };

  // 과목선택/ 과목선택 데이터 저장 동시작업 함수
  let multipleSubject = (e) => {
    handleSubjectChange(e);
    handleSelectSubjectChange(e)
  }

  // 점수 보여주기 불린값
  let [showScoreData, setShowScoreData] = useState(false);

    
  // 성적 데이터 배열
  let [scoreDataList1_1, setScoreDataList1_1] = useState([]);
  let [scoreDataList1_2, setScoreDataList1_2] = useState([]);
  let [scoreDataList2_1, setScoreDataList2_1] = useState([]);
  let [scoreDataList2_2, setScoreDataList2_2] = useState([]);
  let [scoreDataList3_1, setScoreDataList3_1] = useState([]);
  let [scoreDataList3_2, setScoreDataList3_2] = useState([]);


  // 성적추가에따른 데이터 배열
  let [scoreDataArray1_1, setScoreDataArray1_1] = useState([]);
  let [scoreDataArray1_2, setScoreDataArray1_2] = useState([]);
  let [scoreDataArray2_1, setScoreDataArray2_1] = useState([]);
  let [scoreDataArray2_2, setScoreDataArray2_2] = useState([]);
  let [scoreDataArray3_1, setScoreDataArray3_1] = useState([]);
  let [scoreDataArray3_2, setScoreDataArray3_2] = useState([]);


  // 점수 저장 버튼 함수
  let handleSaveButtonClick1_1 = () => {
    let newScoreData = { ...scoreData };
    setScoreDataList1_1([...scoreDataList1_1, newScoreData]);
    setScoreDataArray1_1([...scoreDataArray1_1, newScoreData]);
    setShowScoreData(true);
  };

  let handleSaveButtonClick1_2 = () => {
    let newScoreData = { ...scoreData };
    setScoreDataList1_2([...scoreDataList1_2, newScoreData]);
    setScoreDataArray1_2([...scoreDataArray1_2, newScoreData]);
    setShowScoreData(true);
  };

  let handleSaveButtonClick2_1 = () => {
    let newScoreData = { ...scoreData };
    setScoreDataList2_1([...scoreDataList2_1, newScoreData]);
    setScoreDataArray2_1([...scoreDataArray2_1, newScoreData]);
    setShowScoreData(true);
  };

  let handleSaveButtonClick2_2 = () => {
    let newScoreData = { ...scoreData };
    setScoreDataList2_2([...scoreDataList2_2, newScoreData]);
    setScoreDataArray2_2([...scoreDataArray2_2, newScoreData]);
    setShowScoreData(true);
  };

  let handleSaveButtonClick3_1 = () => {
    let newScoreData = { ...scoreData };
    setScoreDataList3_1([...scoreDataList3_1, newScoreData]);
    setScoreDataArray3_1([...scoreDataArray3_1, newScoreData]);
    setShowScoreData(true);
  };

  let handleSaveButtonClick3_2 = () => {
    let newScoreData = { ...scoreData };
    setScoreDataList3_2([...scoreDataList3_2, newScoreData]);
    setScoreDataArray3_2([...scoreDataArray3_2, newScoreData]);
    setShowScoreData(true);
  };

  // 탭상태 
  let [activeTab, setActiveTab] = useState('nav-1-1');

  // 탭에따른 저장 버튼 함수
  let handleSaveButtonClick = () => {
    if (activeTab === 'nav-1-1') {
      handleSaveButtonClick1_1();
      setScoreData({
        selectSubject: '',
        selectSubjectOption: '',
        unit: '',
        originalScore: '',
        averageScore: '',
        standardDeviation: '',
        numberOfStudents: '',
        grade: '',
      });
    } else if (activeTab === 'nav-1-2') {
      handleSaveButtonClick1_2();
      setScoreData({
        selectSubject: '',
        selectSubjectOption: '',
        unit: '',
        originalScore: '',
        averageScore: '',
        standardDeviation: '',
        numberOfStudents: '',
        grade: '',
      });
    } else if (activeTab === 'nav-2-1') {
      handleSaveButtonClick2_1();
      setScoreData({
        selectSubject: '',
        selectSubjectOption: '',
        unit: '',
        originalScore: '',
        averageScore: '',
        standardDeviation: '',
        numberOfStudents: '',
        grade: '',
      });   
    } else if (activeTab === 'nav-2-2') {
      handleSaveButtonClick2_2();    
      setScoreData({
        selectSubject: '',
        selectSubjectOption: '',
        unit: '',
        originalScore: '',
        averageScore: '',
        standardDeviation: '',
        numberOfStudents: '',
        grade: '',
      });
    } else if (activeTab === 'nav-3-1') {
      handleSaveButtonClick3_1();
      setScoreData({
        selectSubject: '',
        selectSubjectOption: '',
        unit: '',
        originalScore: '',
        averageScore: '',
        standardDeviation: '',
        numberOfStudents: '',
        grade: '',
      });    
    } else if (activeTab === 'nav-3-2') {
      handleSaveButtonClick3_2();   
      setScoreData({
      selectSubject: '',
      selectSubjectOption: '',
      unit: '',
      originalScore: '',
      averageScore: '',
      standardDeviation: '',
      numberOfStudents: '',
      grade: '',
      }); 
    }
  };




    return (

      <div>

        <div>
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <button onClick={() => setActiveTab('nav-1-1')} class={`nav-link ${activeTab === 'nav-1-1' ? 'active' : ''}`} id="nav-1-1-tab" data-bs-toggle="tab" data-bs-target="#nav-1-1" type="button" role="tab" aria-controls="nav-1-1" aria-selected={activeTab === 'nav-1-1'}>1-1</button>
              <button onClick={() => setActiveTab('nav-1-2')} class={`nav-link ${activeTab === 'nav-1-2' ? 'active' : ''}`} id="nav-1-2-tab" data-bs-toggle="tab" data-bs-target="#nav-1-2" type="button" role="tab" aria-controls="nav-1-2" aria-selected={activeTab === 'nav-1-2'}>1-2</button>
              <button onClick={() => setActiveTab('nav-2-1')} class={`nav-link ${activeTab === 'nav-2-1' ? 'active' : ''}`} id="nav-2-1-tab" data-bs-toggle="tab" data-bs-target="#nav-2-1" type="button" role="tab" aria-controls="nav-2-1" aria-selected={activeTab === 'nav-2-1'}>2-1</button>
              <button onClick={() => setActiveTab('nav-2-2')} class={`nav-link ${activeTab === 'nav-2-2' ? 'active' : ''}`} id="nav-2-2-tab" data-bs-toggle="tab" data-bs-target="#nav-2-2" type="button" role="tab" aria-controls="nav-2-2" aria-selected={activeTab === 'nav-2-2'}>2-2</button>
              <button onClick={() => setActiveTab('nav-3-1')} class={`nav-link ${activeTab === 'nav-3-1' ? 'active' : ''}`} id="nav-3-1-tab" data-bs-toggle="tab" data-bs-target="#nav-3-1" type="button" role="tab" aria-controls="nav-3-1" aria-selected={activeTab === 'nav-3-1'}>3-1</button>
              <button onClick={() => setActiveTab('nav-3-2')} class={`nav-link ${activeTab === 'nav-3-2' ? 'active' : ''}`} id="nav-3-2-tab" data-bs-toggle="tab" data-bs-target="#nav-3-2" type="button" role="tab" aria-controls="nav-3-2" aria-selected={activeTab === 'nav-3-2'}>3-2</button>
            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-1-1" role="tabpanel" aria-labelledby="nav-first-tab" tabindex="0">
              
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">교과</th>
                    <th scope="col">과목</th>
                    <th scope="col">단위수</th>
                    <th scope="col">원점수</th>
                    <th scope="col">과목평균</th>
                    <th scope="col">표준편차</th>
                    <th scope="col">수강자수</th>
                    <th scope="col">석차등급</th>
                  </tr>
                </thead>
                <tbody>
                  {scoreDataArray1_1.map((score, index) => (
                    <tr key={index}>
                      <th scope="row">{score.selectSubject}</th>
                      <td>{score.selectSubjectOption}</td>
                      <td>{score.unit}</td>
                      <td>{score.originalScore}</td>
                      <td>{score.averageScore}</td>
                      <td>{score.standardDeviation}</td>
                      <td>{score.numberOfStudents}</td>
                      <td>{score.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* {showScoreData &&
                scoreDataList1_1.map((score, index) => (
                  <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>

                    
                  </div>
                ))
              } */}
            </div>

            <div class="tab-pane fade" id="nav-1-2" role="tabpanel" aria-labelledby="nav-second-tab" tabindex="1">
              <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">교과</th>
                      <th scope="col">과목</th>
                      <th scope="col">단위수</th>
                      <th scope="col">원점수</th>
                      <th scope="col">과목평균</th>
                      <th scope="col">표준편차</th>
                      <th scope="col">수강자수</th>
                      <th scope="col">석차등급</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scoreDataArray1_2.map((score, index) => (
                      <tr key={index}>
                        <th scope="row">{score.selectSubject}</th>
                        <td>{score.selectSubjectOption}</td>
                        <td>{score.unit}</td>
                        <td>{score.originalScore}</td>
                        <td>{score.averageScore}</td>
                        <td>{score.standardDeviation}</td>
                        <td>{score.numberOfStudents}</td>
                        <td>{score.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              {/* {showScoreData &&
                  scoreDataList1_2.map((score, index) => (
                    <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
                      <p>{score.selectSubject}</p>
                      <p>{score.selectSubjectOption}</p>
                      <p>{score.unit}</p>
                      <p>{score.originalScore}</p>
                      <p>{score.averageScore}</p>
                      <p>{score.standardDeviation}</p>
                      <p>{score.numberOfStudents}</p>
                      <p>{score.grade}</p>
                    </div>
                  ))
                } */}
            </div>
            <div class="tab-pane fade" id="nav-2-1" role="tabpanel" aria-labelledby="nav-third-tab" tabindex="2">
              <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">교과</th>
                      <th scope="col">과목</th>
                      <th scope="col">단위수</th>
                      <th scope="col">원점수</th>
                      <th scope="col">과목평균</th>
                      <th scope="col">표준편차</th>
                      <th scope="col">수강자수</th>
                      <th scope="col">석차등급</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scoreDataArray2_1.map((score, index) => (
                      <tr key={index}>
                        <th scope="row">{score.selectSubject}</th>
                        <td>{score.selectSubjectOption}</td>
                        <td>{score.unit}</td>
                        <td>{score.originalScore}</td>
                        <td>{score.averageScore}</td>
                        <td>{score.standardDeviation}</td>
                        <td>{score.numberOfStudents}</td>
                        <td>{score.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              {/* {showScoreData &&
                scoreDataList2_1.map((score, index) => (
                  <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
                    <p>{score.selectSubject}</p>
                    <p>{score.selectSubjectOption}</p>
                    <p>{score.unit}</p>
                    <p>{score.originalScore}</p>
                    <p>{score.averageScore}</p>
                    <p>{score.standardDeviation}</p>
                    <p>{score.numberOfStudents}</p>
                    <p>{score.grade}</p>
                  </div>
                ))
              } */}
            </div>            
            <div class="tab-pane fade" id="nav-2-2" role="tabpanel" aria-labelledby="nav-third-tab" tabindex="3">
              <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">교과</th>
                      <th scope="col">과목</th>
                      <th scope="col">단위수</th>
                      <th scope="col">원점수</th>
                      <th scope="col">과목평균</th>
                      <th scope="col">표준편차</th>
                      <th scope="col">수강자수</th>
                      <th scope="col">석차등급</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scoreDataArray2_2.map((score, index) => (
                      <tr key={index}>
                        <th scope="row">{score.selectSubject}</th>
                        <td>{score.selectSubjectOption}</td>
                        <td>{score.unit}</td>
                        <td>{score.originalScore}</td>
                        <td>{score.averageScore}</td>
                        <td>{score.standardDeviation}</td>
                        <td>{score.numberOfStudents}</td>
                        <td>{score.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              {/* {showScoreData &&
                scoreDataList2_2.map((score, index) => (
                  <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
                    <p>{score.selectSubject}</p>
                    <p>{score.selectSubjectOption}</p>
                    <p>{score.unit}</p>
                    <p>{score.originalScore}</p>
                    <p>{score.averageScore}</p>
                    <p>{score.standardDeviation}</p>
                    <p>{score.numberOfStudents}</p>
                    <p>{score.grade}</p>
                  </div>
                ))
              } */}
            </div>
            <div class="tab-pane fade" id="nav-3-1" role="tabpanel" aria-labelledby="nav-third-tab" tabindex="4">
              <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">교과</th>
                      <th scope="col">과목</th>
                      <th scope="col">단위수</th>
                      <th scope="col">원점수</th>
                      <th scope="col">과목평균</th>
                      <th scope="col">표준편차</th>
                      <th scope="col">수강자수</th>
                      <th scope="col">석차등급</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scoreDataArray3_1.map((score, index) => (
                      <tr key={index}>
                        <th scope="row">{score.selectSubject}</th>
                        <td>{score.selectSubjectOption}</td>
                        <td>{score.unit}</td>
                        <td>{score.originalScore}</td>
                        <td>{score.averageScore}</td>
                        <td>{score.standardDeviation}</td>
                        <td>{score.numberOfStudents}</td>
                        <td>{score.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              {/* {showScoreData &&
                scoreDataList3_1.map((score, index) => (
                  <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
                    <p>{score.selectSubject}</p>
                    <p>{score.selectSubjectOption}</p>
                    <p>{score.unit}</p>
                    <p>{score.originalScore}</p>
                    <p>{score.averageScore}</p>
                    <p>{score.standardDeviation}</p>
                    <p>{score.numberOfStudents}</p>
                    <p>{score.grade}</p>
                  </div>
                ))
              } */}
            </div>
            <div class="tab-pane fade" id="nav-3-2" role="tabpanel" aria-labelledby="nav-third-tab" tabindex="5">
              <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">교과</th>
                      <th scope="col">과목</th>
                      <th scope="col">단위수</th>
                      <th scope="col">원점수</th>
                      <th scope="col">과목평균</th>
                      <th scope="col">표준편차</th>
                      <th scope="col">수강자수</th>
                      <th scope="col">석차등급</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scoreDataArray3_2.map((score, index) => (
                      <tr key={index}>
                        <th scope="row">{score.selectSubject}</th>
                        <td>{score.selectSubjectOption}</td>
                        <td>{score.unit}</td>
                        <td>{score.originalScore}</td>
                        <td>{score.averageScore}</td>
                        <td>{score.standardDeviation}</td>
                        <td>{score.numberOfStudents}</td>
                        <td>{score.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              {/* {showScoreData &&
                scoreDataList3_2.map((score, index) => (
                  <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
                    <p>{score.selectSubject}</p>
                    <p>{score.selectSubjectOption}</p>
                    <p>{score.unit}</p>
                    <p>{score.originalScore}</p>
                    <p>{score.averageScore}</p>
                    <p>{score.standardDeviation}</p>
                    <p>{score.numberOfStudents}</p>
                    <p>{score.grade}</p>
                  </div>
                ))
              } */}
            </div>
          </div>
        </div>

        <div className='scoreInput'>
          <table className="table">
            <colgroup>
              <col style={{width: "10%"}}/>
              <col style={{width: "10%"}}/>
              <col style={{width: "10%"}}/>
              <col style={{width: "10%"}}/>
              <col style={{width: "10%"}}/>
              <col style={{width: "10%"}}/>
              <col style={{width: "10%"}}/>
              <col style={{width: "10%"}}/>
            </colgroup>
            <thead>
              <tr className='text-center'>
                <th scope="col">교과</th>
                <th scope="col">과목</th>
                <th scope="col">단위수</th>
                <th scope="col">원점수</th>
                <th scope="col">과목평균</th>
                <th scope="col">표준편차</th>
                <th scope="col">수강자수</th>
                <th scope="col">석차등급</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td scope="row">
                  <select value={selectSubject} onChange={multipleSubject} className="form-select" aria-label="Default select example">
                    <option selected>교과선택</option>
                    <option value="국어">국어</option>
                    <option value="수학">수학</option>
                    <option value="영어">영어</option>
                    <option value="사회">사회(역사/도덕포함)</option>
                    <option value="과학">과학</option>
                    <option value="체육">체육</option>
                    <option value="예술">예술(음악/미술)</option>
                  </select>
                </td>
                <td>
                  <select className="form-select" onChange={handleSelectSubjectOptionChange} aria-label="Default select example">
                    <option value='' selected>과목선택</option>
                    {selectSubjectOption.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input type="number" 
                    className="form-control" 
                    value={scoreData.unit} 
                    onChange={handleUnitChange}
                  ></input>
                </td>
                <td>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={scoreData.originalScore} 
                    onChange={handleOriginalScoreChange}
                  ></input>
                </td>
                <td>
                  <input 
                    type="number" 
                    className="form-control" 
                    step="0.1"
                    value={scoreData.averageScore} 
                    onChange={handleAverageScoreChange}
                  ></input>
                </td>
                <td>
                  <input 
                    type="number" 
                    className="form-control" 
                    step="0.1" 
                    value={scoreData.standardDeviation}
                    onChange={handleStandardDeviationChange}
                  ></input>
                </td>
                <td>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={scoreData.numberOfStudents}
                    onChange={handleNumberOfStudentsChange}
                  ></input>
                </td>
                <td>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={scoreData.grade}
                    onChange={handleGradeChange}
                  ></input>
                </td>
                
              </tr>
          
            </tbody>
          </table>

          
          <button onClick={handleSaveButtonClick}>성적 추가</button>
        </div>





        {/* <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.1.3/js/bootstrap.bundle.min.js"></script> */}


      </div>


    )
  
}

export default Record;
