"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./CallMeBackButton.module.css";
import { useContactDialog } from "@/hooks/use-contact-dialog";


const WHATSAPP_PHONE = "79522764940";
const SECONDS = 30;

export default function CallMeBackButton() {
  const { onOpen } = useContactDialog();

  // Элементы
  const widgetRef = useRef<HTMLDivElement>(null);
  const layerGreenRef = useRef<HTMLDivElement>(null);
  
  const viewInputsRef = useRef<(HTMLDivElement | null)[]>([]);
  const viewTimersRef = useRef<(HTMLDivElement | null)[]>([]);
  const phoneInputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const btnsOkRef = useRef<(HTMLButtonElement | null)[]>([]);
  const timerDigitsAllRef = useRef<(HTMLDivElement | null)[]>([]);
  const statusTextAllRef = useRef<(HTMLDivElement | null)[]>([]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isFinal, setIsFinal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const mainInput = phoneInputsRef.current[0];
    if (mainInput) {
      const handleInput = () => {
        if (!mainInput.value.startsWith('+7')) {
            mainInput.value = '+7 ' + mainInput.value.replace(/^\+7\s?/, '');
        }
      };
      mainInput.addEventListener('input', handleInput);

      return () => mainInput.removeEventListener('input', handleInput);
    }
  }, []);

  useEffect(() => {
      // Cleanup on unmount
      return () => {
          if (intervalRef.current) {
              clearInterval(intervalRef.current);
          }
      };
  }, []);


  const startProcess = () => {
      viewInputsRef.current.forEach(el => el && el.classList.add(styles.hidden));
      viewTimersRef.current.forEach(el => el && el.classList.add(styles.visible));
      if (phoneInputsRef.current[0]) {
        phoneInputsRef.current[0].blur();
      }

      let total = SECONDS * 100;
      let left = total;

      intervalRef.current = setInterval(() => {
          left--;
          let currentSec = left / 100;

          let percentHidden = (left / total) * 100;
          if (layerGreenRef.current) {
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
      let ms_val = Math.floor((sec - s) * 100);
      let ms = ms_val < 10 ? '0' + ms_val : ms_val.toString();
      let timeStr = s + "." + ms;

      timerDigitsAllRef.current.forEach(el => { if (el) el.innerText = timeStr });
      statusTextAllRef.current.forEach(el => { if (el) el.innerHTML = msg });
  };

  const activateFinal = () => {
      setIsFinal(true);
      if (widgetRef.current) {
        widgetRef.current.classList.add(styles.whatsappMode);
      }
      if (layerGreenRef.current) {
        layerGreenRef.current.style.clipPath = `inset(0 0 0 0)`;
      }
      
      timerDigitsAllRef.current.forEach(el => {
          if (el) {
            el.style.fontSize = "22px";
            el.innerText = "ДАВАЙТЕ УСКОРИМСЯ?";
          }
      });
      statusTextAllRef.current.forEach(el => {
        if (el) el.innerHTML = "НАПИШИТЕ НАМ СЮДА -><br>МЫ СРАЗУ ОТВЕТИМ!";
      });

      if(typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate([200, 100, 200]);
  };

  const handleOkClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      const mainInput = phoneInputsRef.current[0];
      if (!mainInput || mainInput.value.length < 11 || submitting) return;

      setSubmitting(true);

      const formData = new FormData();
      formData.append("phone", mainInput.value);
      formData.append("source", "CallMeBackButton Widget");

      try {
        const response = await fetch("https://formspree.io/f/mjknobdj", {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        if (response.ok) {
            startProcess();
        } else {
            // Handle error silently or show a message if UI is updated
            console.error("Formspree submission failed");
            // Optionally, still start the process to not block the user
            startProcess();
        }
      } catch (error) {
          console.error("Failed to submit form", error);
          // Optionally, still start the process
          startProcess();
      } finally {
          setSubmitting(false);
      }
  };

  const handleWidgetClick = () => {
    if (isFinal) {
        const msg = "Здравствуйте, у меня вопрос";
        window.location.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
    }
  };

  return (
      <div className={styles.widgetWrapper} id="widget" ref={widgetRef} onClick={handleWidgetClick}>
        
        <div className={`${styles.layer} ${styles.layerYellow}`}>
            
            <div className={`${styles.viewInput} js-view-input`} ref={el => viewInputsRef.current[0] = el}>
                <div className={styles.topLabel}>Введите номер - позвоним за 30с</div>
                <div className={styles.inputRow}>
                    <input type="tel" className={`${styles.phoneField} js-phone-input`} defaultValue="+7 " ref={el => phoneInputsRef.current[0] = el} disabled={submitting}/>
                    <button className={`${styles.btnOk} js-btn-ok`} onClick={handleOkClick} ref={el => btnsOkRef.current[0] = el} disabled={submitting}>
                        {submitting ? 
                            <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <path d="M12 4V2M12 22v-2M4 12H2M22 12h-2M6.34 6.34l-1.42-1.42M19.07 19.07l-1.42-1.42M6.34 17.66l-1.42 1.42M19.07 4.93l-1.42 1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            : 
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        }
                    </button>
                </div>
            </div>

            <div className={`${styles.viewTimer} js-view-timer`} ref={el => viewTimersRef.current[0] = el}>
                <div className={`${styles.timerDigits} js-timer-digits`} ref={el => timerDigitsAllRef.current[0] = el}>30.00</div>
                <div className={`${styles.statusText} js-status-text`} ref={el => statusTextAllRef.current[0] = el}>Загрузка...</div>
            </div>
        </div>

        <div className={`${styles.layer} ${styles.layerGreen}`} id="layer-green" ref={layerGreenRef}>
            
            <div className={`${styles.viewInput} js-view-input`} style={{visibility: 'hidden'}} ref={el => viewInputsRef.current[1] = el}>
                 {/* Пустышка */}
            </div>

            <div className={`${styles.viewTimer} js-view-timer`} ref={el => viewTimersRef.current[1] = el}>
                <div className={`${styles.timerDigits} js-timer-digits`} ref={el => timerDigitsAllRef.current[1] = el}>30.00</div>
                <div className={`${styles.statusText} js-status-text`} ref={el => statusTextAllRef.current[1] = el}>Загрузка...</div>
            </div>
        </div>

      </div>
  );
}
