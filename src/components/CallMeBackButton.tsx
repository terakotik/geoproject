'use client';
import { useState, useEffect, useRef } from 'react';

// --- НАСТРОЙКИ ---
const WHATSAPP_PHONE = "79522764940"; // Номер для WhatsApp
const START_SECONDS = 26; // Время таймера

export function CallMeBackButton() {
  const [state, setState] = useState<'idle' | 'counting' | 'panic'>('idle');
  const [timeLeft, setTimeLeft] = useState(START_SECONDS * 100);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Сбрасываем состояние при размонтировании компонента
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const startFastTimer = () => {
    setState('counting');
    
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerIntervalRef.current!);
          activatePanicMode();
          return 0;
        }
        return prevTime - 1;
      });
    }, 10);
  };

  const activatePanicMode = () => {
    setState('panic');
    if (navigator.vibrate) {
      navigator.vibrate([300, 100, 300]);
    }
  };

  const handleClick = () => {
    if (state === 'idle') {
      startFastTimer();
    } else if (state === 'panic') {
      window.location.href = `https://wa.me/${WHATSAPP_PHONE}?text=Здравствуйте,%20я%20не%20дождался%20звонка,%20срочно%20напишите%20мне!`;
    }
  };

  const getTimerText = () => {
    const seconds = Math.floor(timeLeft / 100);
    let ms = timeLeft % 100;
    return `${seconds}.${ms < 10 ? '0' + ms : ms} сек`;
  };

  return (
    <div className="md:hidden">
        <style jsx>{`
            .call-widget-wrapper {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 999;
                width: 90%;
                max-width: 400px;
                font-family: sans-serif;
                cursor: pointer;
                -webkit-tap-highlight-color: transparent;
            }

            .call-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(180deg, #FFEB3B 0%, #FFC107 100%);
                text-decoration: none;
                padding: 12px 20px;
                border-radius: 50px;
                box-shadow: 0 10px 25px rgba(255, 193, 7, 0.4);
                position: relative;
                overflow: hidden;
                border: 1px solid #FFD54F;
                transition: background 0.3s;
                animation: yellowPulse 2s infinite ease-in-out;
            }

            .btn-content {
                display: flex;
                align-items: center;
                gap: 12px;
                position: relative;
                z-index: 2;
                width: 100%;
                justify-content: center;
            }

            .phone-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                width: 40px;
                height: 40px;
                animation: phoneShake 3s infinite ease-in-out;
                flex-shrink: 0;
            }

            .text-group {
                display: flex;
                flex-direction: column;
                line-height: 1.1;
                align-items: flex-start;
            }
            .text-group.centered {
                align-items: center;
            }

            .main-text {
                font-weight: 800;
                font-size: 16px;
                text-transform: uppercase;
                color: #222;
                white-space: nowrap;
            }

            .sub-text {
                font-size: 11px;
                font-weight: 500;
                color: #444;
            }

            @keyframes yellowPulse {
                0% { transform: scale(1); box-shadow: 0 10px 25px rgba(255, 193, 7, 0.4); }
                50% { transform: scale(1.05); box-shadow: 0 15px 35px rgba(255, 193, 7, 0.7); }
                100% { transform: scale(1); box-shadow: 0 10px 25px rgba(255, 193, 7, 0.4); }
            }

            @keyframes phoneShake {
                0%, 90%, 100% { transform: rotate(0deg); }
                92% { transform: rotate(-10deg); }
                94% { transform: rotate(10deg); }
                96% { transform: rotate(-10deg); }
                98% { transform: rotate(10deg); }
            }

            .main-text.timer-big {
                font-size: 24px !important;
                font-family: 'Courier New', monospace;
                font-weight: 900;
                color: #d32f2f;
            }

            .call-btn.panic-mode-style {
                background: linear-gradient(180deg, #ff5252 0%, #d32f2f 100%) !important;
                border-color: #b71c1c !important;
                box-shadow: 0 10px 25px rgba(211, 47, 47, 0.5) !important;
                animation: panicPulse 0.8s infinite !important;
            }
            
            @keyframes panicPulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.04); }
                100% { transform: scale(1); }
            }

            .panic-mode-style .main-text, 
            .panic-mode-style .sub-text {
                color: #fff !important;
                text-align: center;
            }
            
            .panic-mode-style .phone-icon svg path {
                fill: white !important;
            }
        `}</style>
      <div className="call-widget-wrapper" onClick={handleClick}>
        <div className={`call-btn ${state === 'panic' ? 'panic-mode-style' : ''}`}>
          <div className="btn-content">
            {state !== 'counting' && (
              <div className="phone-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.37C21 15.83 20.55 15.38 20.01 15.38Z" fill="#333"/>
                </svg>
              </div>
            )}
            <div className={`text-group ${state === 'counting' ? 'centered' : ''}`}>
              <span className={`main-text ${state === 'counting' ? 'timer-big' : ''}`}>
                {state === 'idle' && 'ЗАКАЗАТЬ ЗВОНОК'}
                {state === 'counting' && getTimerText()}
                {state === 'panic' && 'О НЕТ! ВСЕ ЗАНЯТЫ?'}
              </span>
              <span className="sub-text">
                {state === 'idle' && `Перезвоним за ${START_SECONDS} секунд`}
                {state === 'counting' && 'Ищем менеджера...'}
                {state === 'panic' && 'Срочно нажмите сюда ещё раз!'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
