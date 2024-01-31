
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
function HomePage({ onStartClick }) {
  const containerStyle = {
    display: 'flex', // Flex 컨테이너 설정
    alignItems: 'center', // 아이템을 수직 방향에서 가운데 정렬
    justifyContent: 'center', // 아이템을 수평 방향에서 가운데 정렬
    height: '100vh', // 전체 뷰포트 높이를 사용
    padding: '20px', // 컨테이너 내부 여백
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

  return (
    <div style={containerStyle}>
      <div style={imageContainerStyle}>
        <img src="/startpage.png" alt="Start Page" style={imageStyle} />
      </div>
      <div style={textContainerStyle}>
        <h1 style={textStyle}>오디오가 오디오</h1>
        <button onClick={onStartClick} style={buttonStyle}>시작하기</button>
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
    // 파일이 선택되지 않았으면 아무것도 하지 않음
    if (!file) return;
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      // FastAPI 엔드포인트에 파일 업로드 요청을 보냅니다.
      const response = await axios.post('http://localhost:8000/uploadfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${userToken}`, // 사용자 토큰을 포함
        }
      });
      // 서버 응답에 따라 적절한 페이지로 이동
      if (response.status === 200) {
        // 서버로부터의 응답을 확인하고 다음 단계로 진행
        onTransformClick();
      }
    } catch (error) {
      console.error("There was an error uploading the file:", error);
      // 에러 처리 로직을 추가할 수 있습니다.
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
        <Button label= "변환하기" onClick={onTransformClick} disabled={!file} className="upload-page-button" />
      </div>
    </div>
  );
}


// 세 번째 페이지 컴포넌트
function TransformingPage({ onTransformComplete }) {
  // 여기서 변환 로직을 구현할 수 있습니다.
  // 예를 들어, 변환 로직이 완료되면 onTransformComplete()를 호출합니다.
  
  // 변환 완료를 시뮬레이션하기 위한 예시
  setTimeout(onTransformComplete, 2000); // 2초 후에 onTransformComplete 호출

  return (
    <div className="transforming-page">
      <h1>변환중...</h1>
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
  const [currentPage, setCurrentPage] = useState('home'); // 페이지 상태

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

  return (
    <div className="App">
      {currentPage === 'home' && (
        <HomePage onStartClick={handleStartClick} />
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
