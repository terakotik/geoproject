"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./CallMeBackButton.module.css";
import { useContactDialog } from '@/hooks/use-contact-dialog';

const WHATSAPP_PHONE = "79108247848"; // ВАШ НОМЕР БЕЗ +
const START_SECONDS = 26;

export function CallMeBackButton() {
  const { onOpen } = useContactDialog();
  const [state, setState] = useState("idle"); // 'idle', 'counting', 'panic'
  
  const wrapperRef = useRef<HTMLDivElement>(null);
  const greenLayerRef = useRef<HTMLDivElement>(null);
  const yellowLayerRef = useRef<HTMLDivElement>(null);
  
  const mainTextRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const subTextRefs = useRef<(HTMLSpanElement | null)[]>([]);
  
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (state === "idle") {
      startCountdown();
    } else if (state === "panic") {
      window.location.href = `https://wa.me/${WHATSAPP_PHONE}?text=Здравствуйте,%20я%20не%20дождался%20звонка,%20срочно%20ответьте!`;
    }
  };

  const startCountdown = () => {
    setState("counting");
    onOpen(); 

    if (yellowLayerRef.current) yellowLayerRef.current.classList.add(styles.timerActive);
    if (greenLayerRef.current) greenLayerRef.current.classList.add(styles.timerActive);

    let totalTime = START_SECONDS * 100;
    let timeLeft = totalTime;

    updateTexts(`${START_SECONDS}.00 сек`, "Ищем менеджера...");

    timerIntervalRef.current = setInterval(() => {
      timeLeft--;

      const percentLeft = (timeLeft / totalTime) * 100;
      if (greenLayerRef.current) {
        greenLayerRef.current.style.clipPath = `inset(0 0 0 ${percentLeft}%)`;
      }

      if (timeLeft <= 0) {
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        activatePanicMode();
        return;
      }

      const seconds = Math.floor(timeLeft / 100);
      let ms = timeLeft % 100;
      
      updateTexts(`${seconds}.${ms < 10 ? `0${ms}` : ms} сек`, "Ищем менеджера...");
    }, 10);
  };

  const activatePanicMode = () => {
    setState("panic");

    if (yellowLayerRef.current) yellowLayerRef.current.classList.remove(styles.timerActive);
    if (greenLayerRef.current) greenLayerRef.current.classList.remove(styles.timerActive);

    if (wrapperRef.current) wrapperRef.current.classList.add(styles.whatsappMode);
    if (greenLayerRef.current) greenLayerRef.current.style.clipPath = "inset(0 0 0 0%)";

    updateTexts("О НЕТ! ВСЕ ЗАНЯТЫ?", "Нажмите для WhatsApp");

    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 500]);
    }
  };

  const updateTexts = (main: string, sub: string) => {
    mainTextRefs.current.forEach((el) => {
      if (el) el.innerText = main;
    });
    subTextRefs.current.forEach((el) => {
      if (el) el.innerText = sub;
    });
  };

  const renderContent = (layerName: "yellow" | "green") => (
    <div className={styles.btnContent}>
      <div className={styles.phoneIcon}>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.37C21 15.83 20.55 15.38 20.01 15.38Z" />
        </svg>
      </div>
      <div className={styles.textGroup}>
        <span
          className={styles.mainText}
          ref={(el) => {
            if (layerName === "yellow") mainTextRefs.current[0] = el;
            else mainTextRefs.current[1] = el;
          }}
        >
          ЗАКАЗАТЬ ЗВОНОК
        </span>
        <span
          className={styles.subText}
          ref={(el) => {
            if (layerName === "yellow") subTextRefs.current[0] = el;
            else subTextRefs.current[1] = el;
          }}
        >
          Перезвоним за 26 секунд
        </span>
      </div>
    </div>
  );

  return (
    <div 
      className={styles.widgetWrapper} 
      ref={wrapperRef} 
      onClick={handleClick}
    >
      <div className={`${styles.btnLayer} ${styles.layerYellow}`} ref={yellowLayerRef}>
        {renderContent("yellow")}
      </div>
      <div className={`${styles.btnLayer} ${styles.layerGreen}`} ref={greenLayerRef}>
        {renderContent("green")}
      </div>
    </div>
  );
}
