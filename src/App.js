import React, { useState } from 'react';
import './App.css';

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
function UploadPage({ onGoBackClick, onTransformClick }) {
  const [file, setFile] = useState(null); // 선택된 파일을 관리하는 상태

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log("Uploading file:", selectedFile.name);
      setFile(selectedFile); // 파일 상태 업데이트
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
