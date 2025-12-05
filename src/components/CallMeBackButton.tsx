
'use client';
import { useContactDialog } from '@/hooks/use-contact-dialog';

export function CallMeBackButton() {
  const { onOpen } = useContactDialog();

  return (
    <>
      <style jsx>{`
        .fixed-call-button {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 999;
          width: 90%;
          max-width: 420px;
        }

        .big-call-btn {
          background: linear-gradient(135deg, #FFEB3B, #FFC107);
          color: #000;
          font-weight: 900;
          font-size: 16px;
          padding: 16px 20px;
          border-radius: 50px;
          border: none;
          box-shadow: 0 10px 30px rgba(255, 235, 59, 0.4);
          width: 100%;
          animation: pulse 2s infinite;
          text-transform: uppercase;
          cursor: pointer;
        }
        
        .pulse-ring {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background: rgba(255, 235, 59, 0.3);
          border-radius: 50px;
          animation: pulsate 3s infinite;
          pointer-events: none;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes pulsate {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
      <div className="md:hidden">
        <div className="fixed-call-button">
          <div className="pulse-ring"></div>
          <button className="big-call-btn" onClick={onOpen}>
            📞 ЗАКАЗАТЬ ЗВОНОК
          </button>
        </div>
      </div>
    </>
  );
}
