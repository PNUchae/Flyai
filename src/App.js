
import React, { useState } from 'react';
import './App.css';
import axios from 'axios';


// Button 컴포넌트 스타일
const styles = {
  Button: {
    cursor: 'pointer',
    width: '134px',
    height: '140px',
    padding: '10px 15px',
    border: '0',
    boxSizing: 'border-box',
    borderRadius: '24px',
    backgroundColor: '#127de0',
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
      {label ?? defaultProps.label} // label 속성이 없을 경우 defaultProps.label을 사용합니다.
    </button>
  );
};
// 첫 번째 페이지 컴포넌트
function HomePage({ onLoginSuccess }) {
  const containerStyle = {
    display: 'flex', // Flex 컨테이너 설정
    alignItems: 'center', // 아이템을 수직 방향에서 가운데 정렬
    justifyContent: 'center', // 아이템을 수평 방향에서 가운데 정렬
    height: '100vh', // 전체 뷰포트 높이를 사용
    padding: '20px', // 컨테이너 내부 여백
  };

  const [userId, setUserId] = useState(''); // 사용자 ID 상태
  const [password, setPassword] = useState(''); // 사용자 PW 상태
  const [currentPage, setCurrentPage] = useState('home');

  const handleLoginClick = async () => {
    try {
      const response = await axios.post('http://localhost:8000/users/login', {
        login_id: userId,
        login_pw: password,
      });

      if (response.data.access_token) {
        console.log("Login successful", response.data);
        localStorage.setItem('userToken', response.data.access_token);
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
    color: '#127de0', // 예제로 설정한 색상, 필요에 따라 변경 가능
    fontSize: '2rem', // 큰 폰트 사이즈
    fontWeight: 'bold', // 글자 굵게
  };

  const buttonStyle = {
    cursor: 'pointer',
    padding: '10px 15px',
    border: '0',
    borderRadius: '24px',
    backgroundColor: '#127de0',
    color: '#ffffff',
    fontSize: '1.5rem',
    fontFamily: 'Montserrat',
    fontWeight: '500',
    lineHeight: '1.5',
    outline: 'none',
    marginTop: '20px', // 버튼 위쪽 여백 설정
  };
  const loginContainerStyle = {
    display: 'flex',
    flexDirection: 'column', // 요소들을 수직으로 쌓기
    alignItems: 'center', // 수직 방향 중앙 정렬
    justifyContent: 'center', // 수평 방향 중앙 정렬
    margin: '10px', // 여백 설정
  };

  const inputStyle = {
    margin: '10px',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '80%', // 입력 필드 너비
  };


  return (
    <div style={containerStyle}>
      <div style={textContainerStyle}>
        <h1 style={textStyle}>오디오가 오디오</h1>
        <div style={imageContainerStyle}>
          <img src="/startpage.png" alt="Start Page" style={imageStyle} />
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
        </div>
      </div>
    </div>
  );
}

// 두 번째 페이지 컴포넌트
function UploadPage({ onGoBackClick, onTransformClick }) {
  const [file, setFile] = useState(null); // 선택된 파일을 관리하는 상태

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log("Uploading file:", selectedFile.name);
      setFile(selectedFile); // 파일 상태 업데이트
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;
  
    // localStorage에서 토큰 가져오기
    const userToken = localStorage.getItem('userToken');
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      // 파일 업로드 요청 (토큰 포함)
      const response = await axios.post('http://localhost:8000/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${userToken}`, // 헤더에 토큰 포함
        }
      });
  
      if (response.status === 200) {
        console.log("File uploaded successfully");
        // 파일 업로드 성공 처리
      }
    } catch (error) {
      console.error("There was an error uploading the file:", error);
      // 에러 처리
    }
  };

  return (
    <div className="upload-page">
      <h1>업로드 페이지</h1>
      <input
        type="file"
        accept=".mp3"
        onChange={handleFileChange}
        style={{ display: 'block', margin: '20px auto' }}
      />
      <div className="upload-page-buttons"> {/* 버튼 컨테이너 */}
        <Button label= "돌아가기" onClick={onGoBackClick} className="upload-page-button" />
        <Button label= "변환하기" onClick={handleFileUpload} disabled={!file} className="upload-page-button" /> {/* handleFileUpload 함수 호출 */}
      </div>
    </div>
  );
}


// 세 번째 페이지 컴포넌트
function TransformingPage({ onTransformComplete }) {
  // 변환 완료 시뮬레이션
  setTimeout(onTransformComplete, 2000); // 2초 후에 onTransformComplete 호출

  return (
    <div className="transforming-page">
      <h1>변환중...</h1>
      <div className="spinner"></div> {/* Spinner 추가 */}
      {/* 여기에 로딩 인디케이터나 애니메이션을 추가할 수 있습니다. */}
    </div>
  );
}

// 네 번째 페이지 컴포넌트
function TransformationCompletePage({ onRestart }) {
  return (
    <div className="transformation-complete-page">
      <h1>변환 완료!</h1>
      <Button label="처음으로" onClick={onRestart} />
    </div>
  );
}


// App 컴포넌트
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 성공 시 호출될 함수
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // 로그아웃 함수
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('userToken'); // 로컬 스토리지의 토큰 삭제
  };

  // 조건부 렌더링
  if (isLoggedIn) {
    return <UploadPage onGoBackClick={handleLogout} />;
  } else {
    return <HomePage onLoginSuccess={handleLoginSuccess} />;
  }
  const handleStartClick = () => {
    setCurrentPage('upload');
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

  const handleLoginClick = async (userId, password) => {
    try {
      const response = await axios.post('http://localhost:8000/users/login', 
      {
        login_id: userId,
        login_pw: password,
      });
  
      // 토큰이 반환되면 로그인 성공으로 간주
      if (response.status === 200) {
        console.log("Login successful", response.data);
        localStorage.setItem('userToken', response.data.access_token);
        setCurrentPage('upload');
      }
    } catch (error) {
      if (error.response) {
        // 백엔드에서 반환된 로그인 실패 메시지를 사용자에게 표시
        const errorMessage = error.response.data.detail || error.response.data.message;
        console.log("Login failed", errorMessage);
        alert("Login failed: " + errorMessage);
      } else {
        // 다른 종류의 오류 처리
        console.error("Login error", error);
        alert("Login error: " + error.message);
      }
    }
  };

  return (
    <div className="App">
      {currentPage === 'home' && (
        <HomePage onStartClick={handleStartClick} onLoginClick={handleLoginClick} />
      )}
      {currentPage === 'upload' && (
        <UploadPage onGoBackClick={handleGoBackClick} onTransformClick={handleTransformClick} />
      )}
      {currentPage === 'transforming' && (
        <TransformingPage onTransformComplete={handleTransformComplete} />
      )}
      {currentPage === 'transformationComplete' && (
        <TransformationCompletePage onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;