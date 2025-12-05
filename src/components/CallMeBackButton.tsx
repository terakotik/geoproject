"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./CallMeBackButton.module.css";

const WHATSAPP_PHONE = "79108247848"; // Ваш номер
const SECONDS = 30;

export function CallMeBackButton() {
  const [phoneNumber, setPhoneNumber] = useState("+7 ");
  const [isFinal, setIsFinal] = useState(false);

  const widgetRef = useRef<HTMLDivElement>(null);
  const layerGreenRef = useRef<HTMLDivElement>(null);
  
  const viewInputsRef = useRef<HTMLDivElement[]>([]);
  const viewTimersRef = useRef<HTMLDivElement[]>([]);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  
  const timerDigitsAllRef = useRef<HTMLDivElement[]>([]);
  const statusTextAllRef = useRef<HTMLDivElement[]>([]);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cleanup interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith('+7')) {
        value = '+7 ' + value.replace(/^\+7\s?/, '');
    }
    setPhoneNumber(value);
  };
  
  const handleOkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (phoneNumber.length < 6) return;
    startProcess();
  };
  
  const startProcess = () => {
    viewInputsRef.current.forEach(el => el.classList.add(styles.hidden));
    viewTimersRef.current.forEach(el => el.classList.add(styles.visible));
    if(phoneInputRef.current) phoneInputRef.current.blur();

    let total = SECONDS * 100;
    let left = total;

    intervalRef.current = setInterval(() => {
        left--;
        let currentSec = left / 100;

        let percentHidden = (left / total) * 100;
        if(layerGreenRef.current) {
            layerGreenRef.current.style.clipPath = `inset(0 ${percentHidden}% 0 0)`;
        }

        let statusMsg = "";
        
        if (currentSec > 22) {
            statusMsg = "УВЕДОМЛЯЮ ВСЕХ<br>МЕНЕДЖЕРОВ О ЗВОНКЕ...";
        } else if (currentSec > 12) {
            statusMsg = "ПРИСВАИВАЮ НОМЕРУ<br>СТАТУС: «VIP — СРОЧНО»";
        } else if (currentSec > 0) {
            statusMsg = "ПОСТАВИЛ ПОМЕТКУ:<br>«ОБЯЗАТЕЛЬНО ПЕРЕЗВОНИТЬ»";
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
            activateFinal();
            return;
        }

        updateTexts(currentSec, statusMsg);

    }, 10);
  };

  const updateTexts = (sec: number, msg: string) => {
      let s = Math.floor(sec);
      let ms = Math.floor((sec - s) * 100);
      let timeStr = s + "." + (ms < 10 ? '0' : '') + ms;

      timerDigitsAllRef.current.forEach(el => { if(el) el.innerText = timeStr });
      statusTextAllRef.current.forEach(el => { if(el) el.innerHTML = msg });
  };
  
  const activateFinal = () => {
      setIsFinal(true);
      if(widgetRef.current) widgetRef.current.classList.add(styles['whatsapp-mode']);
      if(layerGreenRef.current) layerGreenRef.current.style.clipPath = `inset(0 0 0 0)`;

      timerDigitsAllRef.current.forEach(el => {
          if (el) {
            el.style.fontSize = "22px";
            el.innerText = "ДАВАЙТЕ УСКОРИМСЯ?";
          }
      });
      statusTextAllRef.current.forEach(el => {
        if (el) {
          el.innerHTML = "НАПИШИТЕ НАМ СЮДА -><br>МЫ СРАЗУ ОТВЕТИМ!";
        }
      });

      if(navigator.vibrate) navigator.vibrate([200, 100, 200]);
  };
  
  const handleWidgetClick = () => {
      if (isFinal) {
          const msg = `Номер: ${phoneNumber}. Ждал 30 сек. Система присвоила статус: ОБЯЗАТЕЛЬНО ПЕРЕЗВОНИТЬ (VIP). Жду связи!`;
          window.location.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
      }
  };

  const addToRef = (el: HTMLDivElement | null, refArray: React.MutableRefObject<HTMLDivElement[]>) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  return (
    <div className={styles.widgetWrapper} id="widget" ref={widgetRef} onClick={handleWidgetClick}>
      {/* СЛОЙ 1: ЖЕЛТЫЙ (НИЖНИЙ) */}
      <div className={`${styles.layer} ${styles.layerYellow}`}>
        {/* Ввод */}
        <div className={`${styles.viewInput} js-view-input`} ref={el => addToRef(el, viewInputsRef)}>
          <div className={styles.topLabel}>Введите номер - позвоним за 30с</div>
          <div className={styles.inputRow}>
            <input 
                type="tel" 
                className={styles.phoneField} 
                value={phoneNumber} 
                onChange={handlePhoneInputChange}
                onClick={(e) => e.stopPropagation()} 
                ref={phoneInputRef}
            />
            <button className={styles.btnOk} onClick={handleOkClick}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </button>
          </div>
        </div>
        {/* Таймер */}
        <div className={`${styles.viewTimer} js-view-timer`} ref={el => addToRef(el, viewTimersRef)}>
          <div className={`${styles.timerDigits} js-timer-digits`} ref={el => addToRef(el, timerDigitsAllRef)}>30.00</div>
          <div className={`${styles.statusText} js-status-text`} ref={el => addToRef(el, statusTextAllRef)}>Загрузка...</div>
        </div>
      </div>

      {/* СЛОЙ 2: ЗЕЛЕНЫЙ (ВЕРХНИЙ) */}
      <div className={`${styles.layer} ${styles.layerGreen}`} id="layer-green" ref={layerGreenRef}>
        {/* Пустышка для ввода */}
        <div className={`${styles.viewInput} js-view-input`} style={{ visibility: 'hidden' }} ref={el => addToRef(el, viewInputsRef)}></div>
        {/* Таймер */}
        <div className={`${styles.viewTimer} js-view-timer`} ref={el => addToRef(el, viewTimersRef)}>
          <div className={`${styles.timerDigits} js-timer-digits`} ref={el => addToRef(el, timerDigitsAllRef)}>30.00</div>
          <div className={`${styles.statusText} js-status-text`} ref={el => addToRef(el, statusTextAllRef)}>Загрузка...</div>
        </div>
      </div>
    </div>
  );
}