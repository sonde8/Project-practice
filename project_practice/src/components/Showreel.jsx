import React, { useEffect, useRef } from 'react';

const Showreel = () => {
  const videoRefs = useRef([]);

  useEffect(() => {
    // 비디오 요소들이 로드되었을 때 실행할 함수
    const handleVideoLoad = async () => {
      try {
        const playPromises = videoRefs.current.map(video => {
          if (video && video.readyState >= 3) { // HAVE_FUTURE_DATA
            return video.play().catch(e => console.log("Video play error:", e));
          }
          return Promise.resolve();
        });
        await Promise.all(playPromises);
      } catch (error) {
        console.log("Video play error:", error);
      }
    };

    // 각 비디오에 대해 로드 이벤트 리스너 추가
    videoRefs.current.forEach(video => {
      if (video) {
        video.addEventListener('loadeddata', handleVideoLoad);
      }
    });

    // cleanup
    return () => {
      videoRefs.current.forEach(video => {
        if (video) {
          video.removeEventListener('loadeddata', handleVideoLoad);
        }
      });
    };
  }, []);

  return (
    <section className="wt-showreel" id="section-benefits">
      <div className="wt-showreel-content">
        <div className="wt-showreel-roll">
          <div className="wt-showreel-roll-inner">
            {[1, 2, 3, 4].map((num, index) => (
              <div key={num} className="wt-showreel-roll-item" data-cursor="-opaque">
                <div className="wt-showreel-roll-item-title" 
                     data-text={getTitle(num)}>
                  {getTitle(num)}
                </div>
                <div className="wt-showreel-roll-item-img">
                  {/* <video 
                    ref={el => videoRefs.current[index] = el}
                    preload="auto"
                    loop
                    muted
                    playsInline
                  >
                    <source src={`/assets/img/showreel/${num}.webm?2`} type="video/webm" />
                    <source src={`/assets/img/showreel/${num}.mp4?2`} type="video/mp4" />
                  </video> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// 비디오 제목을 반환하는 헬퍼 함수
const getTitle = (num) => {
  const titles = {
    1: "No Monthly Service Fees, Transaction Fee from 0%",
    2: "Anonymous, No Chargebacks",
    3: "Simplify Payment Managment",
    4: "Deposit Money, Move Money"
  };
  return titles[num];
};

export default Showreel;