'use client';
import { useContactDialog } from '@/hooks/use-contact-dialog';

export function CallMeBackButton() {
  const { onOpen } = useContactDialog();

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
                width: 100%;
                cursor: pointer;
            }

            .btn-content {
                display: flex;
                align-items: center;
                gap: 12px;
                position: relative;
                z-index: 2;
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
            }

            .text-group {
                display: flex;
                flex-direction: column;
                line-height: 1.1;
                text-align: left;
            }

            .main-text {
                font-weight: 800;
                font-size: 16px;
                text-transform: uppercase;
                color: #222;
            }

            .sub-text {
                font-size: 11px;
                font-weight: 500;
                color: #444;
            }

            @keyframes phoneShake {
                0%, 90%, 100% { transform: rotate(0deg); }
                92% { transform: rotate(-10deg); }
                94% { transform: rotate(10deg); }
                96% { transform: rotate(-10deg); }
                98% { transform: rotate(10deg); }
            }
        `}</style>
        <div className="call-widget-wrapper">
            <button className="call-btn" onClick={onOpen}>
                <div className="btn-content">
                    <div className="phone-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.466 4.015C6.44 3.07 7.643 2.5 8.9 2.5C9.236 2.5 9.563 2.545 9.877 2.63C10.15 2.705 10.372 2.95 10.426 3.233L11.51 8.35C11.57 8.653 11.41 8.96 11.134 9.11L8.71 10.423C9.55 12.016 10.984 13.45 12.577 14.29L13.89 11.866C14.04 11.59 14.347 11.43 14.65 11.49L19.767 12.574C20.05 12.628 20.295 12.85 20.37 13.123C20.455 13.437 20.5 13.764 20.5 14.1C20.5 15.357 19.93 16.56 18.985 17.534C17.91 18.64 16.56 19.5 14.9 19.5C10.99 19.5 7.5 16.01 4.5 13.01C1.96 10.47 1.166 8.01 2.03 5.86C2.53 4.6 3.86 3.61 5.465 4.015L5.466 4.015Z" fill="#333"/>
                        </svg>
                    </div>
                    <div className="text-group">
                        <span className="main-text">Заказать звонок</span>
                        <span className="sub-text">Мы перезвоним за 30 секунд</span>
                    </div>
                </div>
            </button>
        </div>
    </div>
  );
}
