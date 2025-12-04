'use client';
import { useContactDialog } from '@/hooks/use-contact-dialog';
import React, { useState, useEffect } from 'react';

export function CallMeBackModal() {
  const { isOpen, onClose } = useContactDialog();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    if (!x) return;
    e.target.value = !x[2] ? (x[1] ? `+${x[1]}`: '') : '+7 (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("https://formspree.io/f/mjknobdj", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          handleClose();
        }, 2000); // Close after 2 seconds
      } else {
        alert('Произошла ошибка при отправке.');
      }
    } catch (error) {
      alert('Не удалось отправить. Проверьте соединение.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleClose = () => {
    onClose();
    // Reset state after closing animation
    setTimeout(() => {
        setIsSuccess(false);
    }, 300);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <style jsx>{`
        .modal-call {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
          opacity: 0;
          animation: fadeIn 0.3s forwards;
        }
        
        .modal-content {
          background: #000;
          border-radius: 24px;
          padding: 30px 25px;
          max-width: 420px;
          width: 100%;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          color: #FFF;
          transform: scale(0.9);
          animation: zoomIn 0.3s forwards;
        }

        .submit-btn {
          background: linear-gradient(135deg, #FFEB3B, #FFC107);
          color: #000;
          font-size: 20px;
          font-weight: 900;
          padding: 20px;
          border-radius: 50px;
          border: none;
          width: 100%;
          margin-top: 10px;
          box-shadow: 0 10px 30px rgba(255, 235, 59, 0.4);
          cursor: pointer;
          transition: transform 0.2s;
        }
        
        .submit-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }

        .submit-btn:hover:not(:disabled) {
            transform: scale(1.03);
        }

        input[type="tel"] {
          font-family: monospace;
        }
        
        @keyframes fadeIn {
            to { opacity: 1; }
        }
        @keyframes zoomIn {
            to { transform: scale(1); }
        }
      `}</style>
      <div id="callModal" className="modal-call" onClick={handleClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {isSuccess ? (
            <div>
              <h2>Спасибо!</h2>
              <p style={{ fontSize: '18px', margin: '15px 0', color: '#FFF' }}>
                Ваша заявка принята. Мы скоро свяжемся с вами!
              </p>
            </div>
          ) : (
            <>
              <h2>🚀 Мы перезвоним <span style={{ color: '#FFEB3B' }}>через 30 секунд</span></h2>
              <p style={{ fontSize: '18px', margin: '15px 0', color: '#FFF' }}>
                Оставьте телефон — специалист уже на линии! (Геодезия СПб)
              </p>

              <form id="callForm" onSubmit={handleSubmit}>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+7 (___) ___-__-__"
                  required
                  onChange={handlePhoneInput}
                  style={{
                    fontSize: '22px',
                    padding: '18px',
                    height: '60px',
                    width: '100%',
                    textAlign: 'center',
                    background: '#FFF',
                    border: '2px solid #FFEB3B',
                    borderRadius: '16px',
                    color: '#000'
                  }}
                />
                <input type="hidden" name="source" value="Call Me Back Modal" />

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Отправка...' : '🔥 ПОЗВОНИТЕ МНЕ СРОЧНО!'}
                </button>
              </form>

              <div style={{ textAlign: 'center', marginTop: '20px', color: '#CCC', fontSize: '14px' }}>
                ⭐ 500+ клиентов в СПб · 100% конфиденциально
              </div>
              <button onClick={handleClose} style={{ background: 'none', color: '#FFEB3B', border: 'none', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }}>
                Закрыть
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
