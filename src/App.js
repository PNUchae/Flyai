import React, { useState } from 'react';
import './App.css';

// Button 컴포넌트 스타일
const styles = {
  Button: {
    cursor: 'pointer',
    position: 'absolute', // 버튼을 정확한 위치에 배치하려면 position 속성이 필요합니다.
    top: '569px',
    left: '49px',
    width: '134px',
    height: '140px',
    padding: '0px 8px',
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
  },
};

// Button 컴포넌트 기본 속성
const defaultProps = {
  label: 'Back',
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
function HomePage({ onStartClick }) {
  const styles = {
    ImageContainer: {
      top: '194px',
      left: '128px',
      width: '512px',
      height: '512px',
      borderRadius: '24px',
      backgroundImage: 'url(./image.png)',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },
  };
  
  const defaultProps = {
    image: 'https://assets.api.uizard.io/api/cdn/stream/849a15be-4b66-4c69-af5c-9fd20903a8b3.png',
  }
  
  const Image = (props) => {
    return (
      <div style={{
        ...styles.ImageContainer,
        backgroundImage: `url(${props.image ?? defaultProps.image})`,
      }} />
    );
  };
  return (
    <div className="home-page">
      <h1>오디오가 오디오</h1>
      <button onClick={onStartClick}>시작하기</button>
    </div>
  );
}

// 두 번째 페이지 컴포넌트
// 두 번째 페이지 컴포넌트
function UploadPage({ onGoBackClick }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Uploading file:", file.name);
      // 여기에 파일 업로드 로직을 추가할 수 있습니다.
      // 예를 들어, 이 파일을 서버에 업로드 하거나,
      // FileReader API를 사용하여 클라이언트 측에서 파일을 읽을 수 있습니다.
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
      <Button label="돌아가기" onClick={onGoBackClick} />
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

  return (
    <div className="App">
      {currentPage === 'home' ? (
        <HomePage onStartClick={handleStartClick} />
      ) : (
        <UploadPage onGoBackClick={handleGoBackClick} />
      )}
    </div>
  );
}

export default App;
