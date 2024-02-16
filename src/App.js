
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import axios from 'axios';
import axiosInstance from './axiosConfig'; // axiosConfig 임포트

const Card = (props) => {
  return (
    <div style={styles.Card}>
      {props.children}
    </div>
  );
};

// Button 컴포넌트 스타일
const styles = {
  Button: {
    cursor: 'pointer',
    width: '170px',
    height: '100px',
    padding: '10px 15px',
    border: '0',
    boxSizing: 'border-box',
    borderRadius: '24px',
    backgroundColor: '#000050',
    color: '#ffffff',
    fontSize: '30px',
    fontFamily: 'Montserrat',
    fontWeight: 500,
    lineHeight: '39px',
    outline: 'none',
    margin: '10px', // 버튼 사이의 간격을 추가
  },
};

// Button 컴포넌트 기본 속성
const defaultProps = {
  label: 'Default Label', // 'image' 대신 'label' 속성의 기본값을 정의합니다.
};

// Button 컴포넌트 정의
const Button = ({ label, onClick }) => {
  return (
    <button style={styles.Button} onClick={onClick}>
      {label ?? defaultProps.label}
    </button>
  );
};
// 첫 번째 페이지 컴포넌트
function HomePage({ onLoginSuccess }) {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '20px',
    //backgroundImage: 'url("/startimage.png")', // 배경 이미지 설정
    backgroundSize: 'cover', // 이미지가 컨테이너를 꽉 채우도록 설정
    backgroundPosition: 'center', // 이미지를 중앙에 위치시킵니다.
    backgroundColor: '#f5f5f5', // 반투명한 흰색 레이어 추가
    backgroundBlendMode: 'overlay', // 이미지와 색상 레이어를 혼합
  };

  const [userId, setUserId] = useState(''); // 사용자 ID 상태
  const [password, setPassword] = useState(''); // 사용자 PW 상태
  const [currentPage, setCurrentPage] = useState('home');

  const handleLoginClick = async () => {
    try {
      // axiosInstance 사용하여 로그인 요청
      const response = await axiosInstance.post('/users/login', {
        login_id: userId,
        login_pw: password,
      });
  
      if (response.data.access_token) {
        console.log("Login successful", response.data);
        // 로그인 성공시 access_token 저장
        localStorage.setItem('userToken', response.data.access_token);
        localStorage.setItem('refreshToken', response.data.refresh_token); // 리프레시 토큰 저장
        onLoginSuccess(); // 로그인 성공 처리 함수 호출
        
        // 로그인 성공 시 페이지 전환
        setCurrentPage('upload'); // 예시로 'upload' 페이지로 전환
      } else {
        console.log("Login failed", response.data.message);
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login error", error);
      alert("Login error: " + (error.response?.data?.detail || "An error occurred"));
    }
  };
  
  const imageContainerStyle = {
    flex: 1, // 이미지 컨테이너에 유연한 공간 배분
    display: 'flex', // 이미지 컨테이너 내에서도 flex 사용
    justifyContent: 'center', // 이미지를 수평 방향에서 가운데 정렬
    alignItems: 'center', // 이미지를 수직 방향에서 가운데 정렬
  };

  const imageStyle = {
    maxWidth: '100%', // 이미지의 최대 너비를 컨테이너의 100%로 설정
    maxHeight: '80vh', // 이미지의 최대 높이를 뷰포트 높이의 80%로 설정
    borderRadius: '24px', // 이미지 모서리 둥글게
  };

  const textContainerStyle = {
    flex: 1, // 텍스트 컨테이너에 유연한 공간 배분
    display: 'flex',
    flexDirection: 'column', // 요소들을 수직으로 쌓기
    alignItems: 'center', // 수직 방향 중앙 정렬
    justifyContent: 'center', // 수평 방향 중앙 정렬
  };

  const textStyle = {
    color: '#000050', // 예제로 설정한 색상, 필요에 따라 변경 가능
    fontSize: '5rem', // 큰 폰트 사이즈
    fontWeight: 'bold', // 글자 굵게
    fontFamily: 'Arial, Helvetica, sans-serif'
  };

  
  const loginContainerStyle = {
    display: 'flex',
    flexDirection: 'column', // 요소들을 수직으로 쌓기
    alignItems: 'center', // 수직 방향 중앙 정렬
    justifyContent: 'center', // 수평 방향 중앙 정렬
    margin: '30px', // 여백 설정
  };

  const inputStyle = {
    margin: '10px',
    padding: '10px',
    fontSize: '2rem',
    borderRadius: '24px',
    border: '1px solid #ddd',
    width: '50%', // 입력 필드 너비
  };

  const handleSignupClick = async () => {
    try {
      // 회원가입 요청
      const response = await axios.post('/users/signup', {
        login_id: userId,
        login_pw: password,
      });
  
      if (response.status === 200) {
        console.log("Signup successful", response.data);
        alert("Signup successful: " + response.data.message);
        // 회원가입 성공 처리, 예: 로그인 페이지로 이동
      } else {
        console.log("Signup failed", response.data.message);
        alert("Signup failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Signup error", error);
      alert("Signup error: " + (error.response?.data?.detail || "An error occurred"));
    }
  };
  
  return (
    <div style={containerStyle}>
      <div style={textContainerStyle}>
        <h1 style={textStyle}>오디오가 오디오</h1>
        <div style={imageContainerStyle}>
          <img src="" alt="" style={imageStyle} />       
          <div style={loginContainerStyle}>
            <input
              type="text"
              placeholder="ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
          </div>
          {/* 로그인 버튼에 handleLoginClick 함수 연결 */}
          <Button label="로그인" onClick={handleLoginClick} />
          <Button label="회원가입" onClick={handleSignupClick} />  {/* 회원가입 버튼 추가 */}
        </div>
      </div>
    </div>
  );
}


//두 번째 페이지 컴포넌트
function UploadPage({ onGoBackClick, onTransformClick, setTransformedResults }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(''); // 선택된 파일의 이름을 저장할 상태

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log("Uploading file:", selectedFile.name);
      setFile(selectedFile); // 파일 상태 업데이트
      setFileName(selectedFile.name); // 파일 이름 상태 업데이트
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;
  
    const userToken = localStorage.getItem('userToken');
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await axiosInstance.post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${userToken}`,
        }
      });
  
      if (response.status === 200 && response.data.results) {
        console.log("File uploaded successfully");
        const results = response.data.results.map(result => ({
          ResultFilePath: result.ResultFilePath, // URL 속성
          Converted_Result: result.Converted_Result // 변환 결과 속성
        }));
        setTransformedResults(results); // 상태 업데이트
        onTransformClick();
      } else {
        console.log("Failed to upload file or missing results in response");
      }
    } catch (error) {
      console.error("There was an error uploading the file:", error);
    }
  };
  
  return (
    <Card>
      <div className="upload-page">
        <h1 className="upload-page-title">업로드 페이지</h1>
        {file ? (
          <div
          className="file-name-display"
          style={{
            fontSize: '16px',
            fontFamily: 'Arial, sans-serif',
            color: '#333',
            margin: '10px 0'
          }}
        >
          {fileName}
        </div> // 선택된 파일의 이름 표시
        ) : (
          <button
            type="button"
            onClick={() => document.getElementById('file').click()}
            className="upload-page-button file-button"
          >
            파일 선택
          </button>
        )}

        <input
          type="file"
          id="file"
          className="file-input"
          accept=".wav"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        <div className="upload-page-buttons">
          <Button label="돌아가기" onClick={onGoBackClick} className="upload-page-button back-button" />
          <Button label="변환하기" onClick={handleFileUpload} disabled={!file} className="upload-page-button transform-button" />
        </div>
      </div>
    </Card>
  );
}

// 세 번째 컴포넌트
function TransformingPage({ transformedResults, onTransformComplete }) {
  useEffect(() => {
    if (Array.isArray(transformedResults) && transformedResults.length > 0) {
      transformedResults.forEach(result => {
        console.log(`파일 URL: ${result.ResultFilePath}, 변환 결과: ${result.Converted_Result}`);
      });
    } else {
      console.log("사용 가능한 파일 URL이 없습니다.");
    }
    const timer = setTimeout(onTransformComplete, 50000); // 5초 후에 변환 완료 처리
  
    return () => clearTimeout(timer);
  }, [transformedResults, onTransformComplete]);

  return (
    <div className="transforming-page">
      <h1>변환 중...</h1>
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    </div>
  );
}

// 네 번째 페이지 컴포넌트
function TransformationCompletePage({ transformedResults, onRestart, onBackToUpload }) {
  const audioRefs = useRef([]);
  const [checkedItems, setCheckedItems] = useState(new Set()); // 체크된 아이템들의 목록

  useEffect(() => {
    audioRefs.current = audioRefs.current.slice(0, transformedResults.length);
  }, [transformedResults]);
  const handleCheckboxChange = (resultFilePath, isChecked) => {
    setCheckedItems(prev => {
      const updated = new Set(prev);
      if (isChecked) {
        updated.add(resultFilePath);
      } else {
        updated.delete(resultFilePath);
      }
      return updated;
    });
  };

  const handleSubmitCheckedItems = async () => {
    // 체크된 아이템들을 백엔드에 전송하는 로직
    const checkedUrls = Array.from(checkedItems);
    try {
      // 예를 들어, 체크된 URL 목록을 백엔드에 전송하는 코드
      // 이 부분은 백엔드 API의 구현에 따라 달라질 수 있습니다.
      await axios.post('/api/send-results', { urls: checkedUrls });
      alert('결과가 성공적으로 전송되었습니다.');
    } catch (error) {
      console.error('결과 전송 중 오류가 발생했습니다:', error);
      alert('결과 전송 실패');
    }
  };

  const togglePlay = (index) => {
    const audio = audioRefs.current[index];
    if (audio) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  };

  return (
    <div className="transformation-complete-page">
      <h1>변환 완료!</h1>
      <div className="audio-players">
        {transformedResults.map((result, index) => (
          <div key={index} className="audio-player">
            <audio ref={el => audioRefs.current[index] = el} src={result.ResultFilePath} controls>
              Your browser does not support the audio element.
            </audio>
            <button onClick={() => togglePlay(index)}>Play/Pause</button>
            <input
              type="checkbox"
              onChange={e => handleCheckboxChange(result.ResultFilePath, e.target.checked)}
            />
          </div>
        ))}
      </div>
      <Button label="메인" onClick={onRestart} />
      <Button label="결과 전송" onClick={handleSubmitCheckedItems} /> {/* 결과 전송 버튼 */}
    </div>
  );
}



// App 컴포넌트
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [transformedResults, setTransformedResults] = useState([]);

  // 로그인 성공 시 호출될 함수
  const handleLoginSuccess = () => {
    setCurrentPage('upload'); // 로그인 성공 시 업로드 페이지로 이동
  };

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem('userToken'); // 로컬 스토리지의 토큰 삭제
    setCurrentPage('home'); // 로그아웃 시 홈 페이지로 이동
  };

  const handleGoBackClick = () => {
    setCurrentPage('home'); // '돌아가기' 버튼 클릭 시 첫 페이지로 상태 변경
  };

  const handleTransformClick = () => {
    setCurrentPage('transforming'); // '변환하기' 버튼 클릭 시 변환중 페이지로 상태 변경
  };

  const handleTransformComplete = () => {
    setCurrentPage('transformationComplete'); // 변환이 완료되면 변환 완료 페이지로 상태 변경
  };

  const handleRestart = () => {
    setCurrentPage('home'); // 처음으로 버튼 클릭 시 첫 페이지로 상태 변경
  };
  const handleBackToUpload = () => {
    setCurrentPage('upload'); // 두 번째 페이지로 상태 변경
  };

  return (
    <div className="App">
      {currentPage === 'home' && <HomePage onLoginSuccess={handleLoginSuccess} />}
      {currentPage === 'upload' && (
        // Pass setTransformedResults to UploadPage to handle state update
        <UploadPage
          onGoBackClick={handleLogout}
          onTransformClick={handleTransformClick}
          setTransformedResults={setTransformedResults}
        />
      )}
      {currentPage === 'transforming' && (
        // Pass transformedResults to TransformingPage for display
        <TransformingPage
          transformedResults={transformedResults}
          onTransformComplete={handleTransformComplete}
        />
      )}
      {currentPage === 'transformationComplete' && (
  <TransformationCompletePage
  transformedResults={transformedResults}
  onRestart={handleRestart}
  onBackToUpload={handleBackToUpload} // 이 함수를 props로 전달
/>
)}
    </div>
  );
}

export default App;