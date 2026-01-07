"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./CallMeBackButton.module.css";
import { Phone, Send, Check, Loader2 } from "lucide-react";


const FORM_ID = "xlgrkbzl";
const FORM_URL = `https://formspree.io/f/${FORM_ID}`;

export default function CallMeBackButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState("+7 (");
  
  const widgetRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
        setIsExpanded(false);
        setPhone("+7 (");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    let formattedValue = '';

    if (!value.startsWith('7')) {
      value = '7' + value.substring(1);
    }
    
    if (value.length > 0) formattedValue = '+7';
    if (value.length > 1) formattedValue += ' (' + value.substring(1, 4);
    if (value.length >= 5) formattedValue += ') ' + value.substring(4, 7);
    if (value.length >= 8) formattedValue += '-' + value.substring(7, 9);
    if (value.length >= 10) formattedValue += '-' + value.substring(9, 11);

    setPhone(formattedValue);
    if(error) setError(null);
  };
  
  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && phone.replace(/\D/g, '').length <= 1) {
      e.preventDefault();
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (phone.replace(/\D/g, '').length < 11) {
      setError("Не хватает цифр в номере");
      widgetRef.current?.classList.add(styles.shake);
      setTimeout(() => {
        widgetRef.current?.classList.remove(styles.shake);
      }, 500);
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("source", "Floating Widget");

    try {
      const response = await fetch(FORM_URL, {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        setIsSuccess(true);
      } else {
        setError("Ошибка отправки. Попробуйте позже.");
      }
    } catch (err) {
      setError("Ошибка сети. Проверьте подключение.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInitialClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };
  
  const handleWrapperClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === 'widget-wrapper') {
       if (isExpanded) {
           setIsExpanded(false);
           setError(null);
       }
    }
  }

  return (
    <div 
        id="widget-wrapper"
        ref={widgetRef} 
        className={`${styles.widgetWrapper} ${isExpanded ? styles.expanded : ''}`} 
        onClick={handleInitialClick}
    >
        <div className={styles.widgetContent}>
            {isSuccess ? (
                <div className={styles.successView}>
                    <Check className="h-6 w-6 text-green-500" />
                    <span>Спасибо! Скоро позвоним.</span>
                </div>
            ) : (
                <>
                    <div className={`${styles.initialView} ${isExpanded ? styles.hidden : ''}`}>
                        <Phone className="h-6 w-6" />
                        <span>Заказать звонок</span>
                    </div>

                    <form onSubmit={handleSubmit} className={`${styles.formView} ${isExpanded ? '' : styles.hidden}`}>
                        <div className={styles.inputGroup}>
                            <Phone size={20} className={styles.inputIcon} />
                            <input
                                ref={inputRef}
                                type="tel"
                                value={phone}
                                onChange={handlePhoneInput}
                                onKeyDown={handlePhoneKeyDown}
                                onClick={(e) => e.stopPropagation()}
                                placeholder="+7 (___) ___-__-__"
                                className={styles.phoneInput}
                                disabled={isSubmitting}
                            />
                        </div>
                        <button type="submit" className={styles.submitButton} disabled={isSubmitting} onClick={(e) => e.stopPropagation()}>
                            {isSubmitting ? (
                                <Loader2 className="h-6 w-6 animate-spin" />
                            ) : (
                                <>
                                  <Send className="h-5 w-5" />
                                  <span>Жду звонка!</span>
                                </>
                            )}
                        </button>
                    </form>
                </>
            )}
        </div>
        {error && isExpanded && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
}