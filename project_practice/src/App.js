import { useEffect, useState } from 'react';
import './App.css';
import AdvantageComponent from './components/AdvantageComponent';
import ContentSection from './components/ContentSection';
import Description from './components/Description';
import EndComponent from './components/EndComponent';
import Envelope from './components/Envelope';
import FeatureComponent from './components/FeatureComponent';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Showreel from './components/Showreel';
import $ from 'jquery';  // jQuery import 추가 설치도 필요함 npm i jquery
import Header from './components/Header';

function App() {

  // 상태 관리 부분
  const [isLoaded, setIsLoaded] = useState(false);

  // 외부 스크립트 로드
  useEffect(() => {
    // jQuery를 전역 객체(window)에 할당
    window.jQuery = window.$ = $;

    // work.js 로드
    const initializeWorkJs = () => {

      // 새로운 script 태그 생성
      const script = document.createElement('script');
      // script 소스 설정
      script.src = `${process.env.PUBLIC_URL}/work.js`;
      // 비동기 로드 설정
      script.async = true;

      // 스크립트 로드 완료 시 실행될 함수
      script.onload = () => {
        // 약간의 지연 후 초기화 (DOM이 완전히 준비되도록)
        setTimeout(() => {
          // window.app.init 함수가 있다면 실행
          if (window.app && typeof window.app.init === 'function') {
            window.app.init();
          }
          // 로드 완료 상태로 변경
          setIsLoaded(true);
        }, 100);
      };
      // body에 script 태그 추가
      document.body.appendChild(script);
    };

    initializeWorkJs();

    // 컴포넌트 언마운트 시 정리 함수 실행
    return () => {
      const script = document.querySelector(`script[src*="work.js"]`);
      if (script) {
        script.remove();
      }
    };
  }, []);

  // CSS 스타일 추가
  const contentStyle = {
    height: '100vh',
    overflowY: 'auto',
  };

  return (
    <div className="wt-page" id="page">
      {/* <Navbar /> */}
      <Header/>
      <div className="wt-view" data-controller="homeController" id="view-main">
        <div
          className="wt-content"
          role="main"
          style={contentStyle}
        >
          <Hero />
          <ContentSection />
          <FeatureComponent />
          {/* 오류가 너무 많이 나서 Showreel은 사용하지 않을 예정 
                코드의 단순화를 위해 관련 css랑 js 찾아서 지울 수 있으면 지울 생각
          */}
          {/* <Showreel/> */}
          <AdvantageComponent />
          <Description />
          <Envelope />
          <EndComponent />
        </div>
      </div>
    </div>
  );
}

export default App;