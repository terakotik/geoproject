"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./CallMeBackButton.module.css";

const WHATSAPP_PHONE = "79108247848";
const SECONDS = 30;

export function CallMeBackButton() {
  const [isFinal, setIsFinal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+7 ");

  const widgetRef = useRef<HTMLDivElement>(null);
  const layerGreenRef = useRef<HTMLDivElement>(null);
  const viewInputsRef = useRef<HTMLDivElement[]>([]);
  const viewTimersRef = useRef<HTMLDivElement[]>([]);
  const timerDigitsAllRef = useRef<HTMLDivElement[]>([]);
  const statusTextAllRef = useRef<HTMLDivElement[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const updateTexts = useCallback((sec: number, msg: string) => {
    let s = Math.floor(sec);
    let ms = Math.floor((sec - s) * 100);
    let timeStr = `${s}.${ms < 10 ? '0' : ''}${ms}`;

    timerDigitsAllRef.current.forEach(el => el.innerText = timeStr);
    statusTextAllRef.current.forEach(el => el.innerHTML = msg);
  }, []);

  const activateFinal = useCallback(() => {
    setIsFinal(true);
    if (widgetRef.current) widgetRef.current.classList.add(styles.whatsappMode);
    if (layerGreenRef.current) layerGreenRef.current.style.clipPath = `inset(0 0 0 0)`;

    timerDigitsAllRef.current.forEach(el => {
      if (el) {
        el.style.fontSize = "20px";
        el.innerText = "О НЕТ!";
      }
    });
    statusTextAllRef.current.forEach(el => {
      if(el) el.innerHTML = "ПРЕДЛАГАЮ НАПИСАТЬ<br>СРАЗУ В WHATSAPP ->";
    });

    if(navigator.vibrate) navigator.vibrate([200, 100, 200]);
  }, []);

  const startProcess = useCallback(() => {
    viewInputsRef.current.forEach(el => el.classList.add(styles.hidden));
    viewTimersRef.current.forEach(el => el.classList.add(styles.visible));

    document.activeElement instanceof HTMLElement && document.activeElement.blur();

    let total = SECONDS * 100;
    let left = total;

    intervalRef.current = setInterval(() => {
      left--;
      let currentSec = left / 100;

      let percentHiddenFromRight = (left / total) * 100;
      if (layerGreenRef.current) {
        layerGreenRef.current.style.clipPath = `inset(0 ${percentHiddenFromRight}% 0 0)`;
      }

      let statusMsg = "";
      if (currentSec > 23) {
        statusMsg = "ОТПРАВЛЯЮ СООБЩЕНИЕ<br>ВСЕМ МЕНЕДЖЕРАМ...";
      } else if (currentSec > 15) {
        statusMsg = "СТАТУС НОМЕРА:<br>СРОЧНО ПЕРЕЗВОНИТЬ!";
      } else if (currentSec > 5) {
        statusMsg = "ТРЕБОВАНИЕ:<br>НАБРАТЬ КАК УВИДЯТ!";
      } else if (currentSec > 0) {
        statusMsg = "НЕ ЗВОНЯТ?<br>СЕЙЧАС ДАМ WHATSAPP...";
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        activateFinal();
        return;
      }
      updateTexts(currentSec, statusMsg);
    }, 10);
  }, [activateFinal, updateTexts]);


  const handleOkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (phoneNumber.length < 6) return;
    startProcess();
  };

  const handleWidgetClick = () => {
    if (isFinal) {
      const msg = `Номер: ${phoneNumber}. Ждал 30 сек, не перезвонили! Срочно ответьте.`;
      window.location.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
    }
  };

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith('+7')) {
      value = '+7 ' + value.replace(/^\+7\s?/, '');
    }
    setPhoneNumber(value);
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, []);
  
  const addToRef = (el: HTMLDivElement | null, refArray: React.MutableRefObject<HTMLDivElement[]>) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  return (
    <div className={styles.widgetWrapper} id="widget" ref={widgetRef} onClick={handleWidgetClick}>
      <div className={`${styles.layer} ${styles.layerYellow}`} id="layer-yellow">
        <div className={styles.viewInput} ref={el => addToRef(el, viewInputsRef)}>
          <div className={styles.topLabel}>Перезвоним или напишем за 30с</div>
          <div className={styles.inputRow}>
            <input type="tel" className={styles.phoneField} value={phoneNumber} onChange={handlePhoneInputChange} />
            <button className={styles.btnOk} onClick={handleOkClick}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </button>
          </div>
        </div>

        <div className={styles.viewTimer} ref={el => addToRef(el, viewTimersRef)}>
          <div className={styles.timerDigits} ref={el => addToRef(el, timerDigitsAllRef)}>30.00</div>
          <div className={styles.statusText} ref={el => addToRef(el, statusTextAllRef)}>Запускаю поиск...</div>
        </div>
      </div>

      <div className={`${styles.layer} ${styles.layerGreen}`} id="layer-green" ref={layerGreenRef}>
         <div className={styles.viewInput} style={{ visibility: 'hidden' }} ref={el => addToRef(el, viewInputsRef)}>
             {/* Dummy content for layout matching */}
             <div className={styles.topLabel}>Перезвоним или напишем за 30с</div>
             <div className={styles.inputRow}>
                 <input type="tel" className={styles.phoneField} value="+7 " readOnly/>
                 <button className={styles.btnOk}>
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                 </button>
             </div>
         </div>
        <div className={styles.viewTimer} ref={el => addToRef(el, viewTimersRef)}>
          <div className={styles.timerDigits} ref={el => addToRef(el, timerDigitsAllRef)}>30.00</div>
          <div className={styles.statusText} ref={el => addToRef(el, statusTextAllRef)}>Запускаю поиск...</div>
        </div>
      </div>
    </div>
  );
}
