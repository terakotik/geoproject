
'use client';
import { useContactDialog } from '@/hooks/use-contact-dialog';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export function CallMeBackModal() {
  const { isOpen, onClose } = useContactDialog();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isWhatsappSubmitting, setIsWhatsappSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [phone, setPhone] = useState('');
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(true);

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    if (!x) return;
    const formattedPhone = !x[2] ? (x[1] ? `+${x[1]}`: '') : '+7 (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
    e.target.value = formattedPhone;
    setPhone(formattedPhone);
  };

  const sendToFormspree = async (formData: FormData) => {
    try {
      const response = await fetch("https://formspree.io/f/mjknobdj", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      return response.ok;
    } catch (error) {
      console.error('Formspree submission error:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append('source', 'Call Me Back Modal (Phone Call)');
    
    const success = await sendToFormspree(formData);
    
    if (success) {
      setIsSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 2000); 
    } else {
      alert('Произошла ошибка при отправке.');
    }
    
    setIsSubmitting(false);
  };

  const handleWhatsappSubmit = async () => {
    if (!phone) {
        alert('Пожалуйста, введите номер телефона.');
        return;
    }
    setIsWhatsappSubmitting(true);
    const formData = new FormData();
    formData.append('phone', phone);
    formData.append('message', 'Запрос на связь через WhatsApp с согласием на обработку данных');
    formData.append('source', 'Call Me Back Modal (WhatsApp Request)');
    
    const success = await sendToFormspree(formData);

    if (success) {
        setIsSuccess(true);
        setTimeout(() => {
          handleClose();
        }, 2000);
    } else {
        alert('Не удалось отправить ваш запрос. Пожалуйста, попробуйте снова.');
    }
    setIsWhatsappSubmitting(false);
  };
  
  const handleClose = () => {
    onClose();
    setTimeout(() => {
        setIsSuccess(false);
        setPhone('');
        setIsPrivacyChecked(true);
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
          padding: 20px;
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
          font-size: 16px;
          font-weight: 900;
          padding: 16px;
          border-radius: 50px;
          border: none;
          width: 100%;
          margin-top: 10px;
          box-shadow: 0 10px 30px rgba(255, 235, 59, 0.4);
          cursor: pointer;
          transition: transform 0.2s, opacity 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-decoration: none;
        }
        
        .submit-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .submit-btn:hover:not(:disabled) {
            transform: scale(1.03);
        }

        .whatsapp-btn {
            background: linear-gradient(135deg, #25D366, #128C7E);
        }

        .divider {
            display: flex;
            align-items: center;
            text-align: center;
            color: #777;
            margin: 15px 0;
            font-size: 14px;
        }

        .divider::before,
        .divider::after {
            content: '';
            flex: 1;
            border-bottom: 1px solid #444;
        }

        .divider:not(:empty)::before {
            margin-right: .5em;
        }

        .divider:not(:empty)::after {
            margin-left: .5em;
        }

        input[type="tel"] {
          font-family: monospace;
          font-size: 20px;
          padding: 15px;
          height: 55px;
          width: 100%;
          text-align: center;
          background: #FFF;
          border: 2px solid #FFEB3B;
          border-radius: 16px;
          color: #000;
        }
        
        .privacy-container {
          margin-top: 15px;
          font-size: 11px;
          color: #999;
          text-align: left;
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }
        .privacy-container a {
          color: #FFEB3B;
          text-decoration: underline;
        }
        .privacy-container input[type="checkbox"] {
           width: 16px;
           height: 16px;
           margin-top: 2px;
           flex-shrink: 0;
        }

        @keyframes fadeIn {
            to { opacity: 1; }
        }
        @keyframes zoomIn {
            to { transform: scale(1); }
        }

        @media (min-width: 640px) {
          .modal-content {
            padding: 30px 25px;
          }
          .submit-btn {
            font-size: 20px;
            padding: 20px;
          }
          input[type="tel"] {
            font-size: 22px;
            padding: 18px;
            height: 60px;
          }
           .privacy-container {
             font-size: 12px;
          }
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
              <h2 className="text-xl sm:text-2xl">🚀 Мы перезвоним <span style={{ color: '#FFEB3B' }}>через 30 секунд</span></h2>
              <p style={{ fontSize: '16px', margin: '15px 0', color: '#FFF' }}>
                Оставьте телефон — специалист уже на линии!
              </p>

              <form id="callForm" onSubmit={handleSubmit}>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+7 (___) ___-__-__"
                  required
                  onChange={handlePhoneInput}
                />
                
                <button type="submit" className="submit-btn" disabled={isSubmitting || !isPrivacyChecked}>
                  {isSubmitting ? 'Отправка...' : '🔥 ПОЗВОНИТЕ МНЕ СРОЧНО!'}
                </button>
              </form>
              
              <div className="divider">ИЛИ</div>

              <button onClick={handleWhatsappSubmit} className="submit-btn whatsapp-btn" disabled={isWhatsappSubmitting || !isPrivacyChecked}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.433-9.89-9.89-9.89-5.451 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.847 6.062l-1.078 3.961 4.049-1.065z"/></svg>
                {isWhatsappSubmitting ? 'Отправка...' : 'Напишите в WhatsApp'}
              </button>

              <div className="privacy-container">
                  <input type="checkbox" id="modal_privacy_policy" name="privacy_policy" required defaultChecked={isPrivacyChecked} onChange={(e) => setIsPrivacyChecked(e.target.checked)} className="form-checkbox h-5 w-5 text-gray-600" />
                  <label htmlFor="modal_privacy_policy">
                      Я согласен с условиями <Link href="/privacy-policy" target="_blank">Политики обработки персональных данных</Link> и даю <Link href="/user-agreement" target="_blank">Согласие на обработку моих персональных данных</Link>
                  </label>
              </div>

              <div style={{ textAlign: 'center', marginTop: '15px', color: '#CCC', fontSize: '12px' }}>
                ⭐ 500+ клиентов в СПб · 100% конфиденциально
              </div>
              <button onClick={handleClose} style={{ background: 'none', color: '#FFEB3B', border: 'none', fontSize: '14px', cursor: 'pointer', marginTop: '10px' }}>
                Закрыть
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
