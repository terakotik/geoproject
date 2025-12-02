
'use client';

import { useEffect } from 'react';
import { yandexReviews } from '@/lib/reviews';

const ICONS = {
    star: `<svg width="14" height="14" viewBox="0 0 24 24" fill="#ffcc00" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.62L12 2L9.19 8.62L2 9.24L7.45 13.97L5.82 21L12 17.27Z"/></svg>`,
    thumb: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1 21H5V9H1V21ZM23 10C23 8.9 22.1 8 21 8H14.68L15.64 3.43C15.66 3.29 15.66 3.15 15.66 3.03C15.66 2.48 15.44 1.97 15.07 1.6L14.07 0.59L7.54 7.12C7.19 7.47 7 7.96 7 8.5V19C7 20.1 7.9 21 9 21H18C18.83 21 19.54 20.5 19.84 19.78L22.86 12.73C22.95 12.5 23 12.26 23 12V10Z"/></svg>`,
    left: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`,
    right: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`
};

export function YandexReviews() {
    
    useEffect(() => {
        const initSlider = () => {
            const track = document.getElementById('ya-track');
            const prevBtn = document.getElementById('ya-btn-prev');
            const nextBtn = document.getElementById('ya-btn-next');
            const items = document.querySelectorAll('.ya-slide-item');

            if (!track || !prevBtn || !nextBtn || items.length === 0) return;
            
            let currentIndex = 0;
            let itemsPerView = 1;

            const updateLayout = () => {
                const width = window.innerWidth;
                if (width >= 900) itemsPerView = 3;
                else if (width >= 600) itemsPerView = 2;
                else itemsPerView = 1;
                
                moveSlider();
            }

            const moveSlider = () => {
                const totalItems = items.length;
                const maxIndex = Math.max(0, totalItems - itemsPerView);
                
                if (currentIndex < 0) currentIndex = 0;
                if (currentIndex > maxIndex) currentIndex = maxIndex;

                const percentage = (100 / itemsPerView) * currentIndex;
                (track as HTMLElement).style.transform = `translateX(-${percentage}%)`;

                if (currentIndex === 0) prevBtn.classList.add('hidden');
                else prevBtn.classList.remove('hidden');

                if (currentIndex >= maxIndex) nextBtn.classList.add('hidden');
                else nextBtn.classList.remove('hidden');
            }

            const handleNext = () => {
                currentIndex++;
                moveSlider();
            };
            const handlePrev = () => {
                currentIndex--;
                moveSlider();
            };

            nextBtn.addEventListener('click', handleNext);
            prevBtn.addEventListener('click', handlePrev);
            window.addEventListener('resize', updateLayout);
            
            updateLayout();

            return () => {
                nextBtn.removeEventListener('click', handleNext);
                prevBtn.removeEventListener('click', handlePrev);
                window.removeEventListener('resize', updateLayout);
            }
        }

        const cleanup = initSlider();

        return () => {
            if (cleanup) cleanup();
        }
    }, []);

    const starsHtml = Array(5).fill(ICONS.star).join('');
    
    const cardsHtml = yandexReviews.map(r => `
        <div class="ya-slide-item">
            <div class="ya-card">
                <div class="ya-card-top">
                    <div class="ya-author">${r.author}</div>
                    <div class="ya-stars">${starsHtml}</div>
                </div>
                <div class="ya-text">${r.text}</div>
                <div class="ya-date">${r.date}</div>
            </div>
        </div>
    `).join('');

    const widgetHtml = `
        <div class="ya-container">
            <div class="ya-header">
                <div>
                    <h2 class="ya-title">Отзывы на <span class="ya-brand-yandex">Я</span>ндекс</h2>
                    <a href="https://yandex.com/maps/org/geostroyproyekt/144539023058/reviews/" target="_blank" rel="noopener noreferrer" class="ya-rating-badge">
                        ${ICONS.thumb} 5.0
                    </a>
                </div>
                <a href="https://yandex.com/maps/org/geostroyproyekt/144539023058/add-review/" target="_blank" rel="noopener noreferrer" class="ya-btn-write">Оставить отзыв</a>
            </div>

            <div style="position: relative;">
                <button class="ya-nav-btn ya-prev" id="ya-btn-prev">${ICONS.left}</button>
                <button class="ya-nav-btn ya-next" id="ya-btn-next">${ICONS.right}</button>
                <div class="ya-viewport" id="ya-viewport">
                    <div class="ya-track" id="ya-track">
                        ${cardsHtml}
                    </div>
                </div>
            </div>
        </div>
    `;

    return (
        <>
            <style jsx global>{`
                #yandex-reviews-widget { box-sizing: border-box; width: 100%; margin: 0 auto; font-family: 'PT Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; }
                #yandex-reviews-widget * { box-sizing: border-box; }
                .ya-container { background: hsl(var(--card)); border: 1px solid hsl(var(--border)); padding: 30px; border-radius: 16px; position: relative; }
                .ya-header { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; margin-bottom: 20px; gap: 15px; }
                .ya-title { font-size: 24px; font-weight: 700; color: hsl(var(--foreground)); margin: 0; }
                .ya-title .ya-brand-yandex { color: #f00; }
                .ya-rating-badge { display: inline-flex; align-items: center; background: hsl(var(--accent) / 0.1); color: hsl(var(--accent)); padding: 5px 10px; border-radius: 6px; font-size: 14px; font-weight: 600; margin-top: 8px; text-decoration: none; }
                .ya-rating-badge svg { margin-right: 6px; }
                .ya-btn-write { background: hsl(var(--primary)); color: hsl(var(--primary-foreground)); text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; transition: 0.2s; text-align: center; }
                .ya-btn-write:hover { background: hsl(var(--primary) / 0.9); }
                .ya-viewport { overflow: hidden; position: relative; margin: 0 -10px; }
                .ya-track { display: flex; transition: transform 0.4s ease-in-out; width: 100%; }
                .ya-slide-item { flex-shrink: 0; padding: 0 10px; width: 100%; }
                @media (min-width: 640px) { .ya-slide-item { width: 50%; } }
                @media (min-width: 1024px) { .ya-slide-item { width: 33.333%; } }
                .ya-card { background: hsl(var(--background)); border: 1px solid hsl(var(--border)); border-radius: 12px; padding: 20px; height: 100%; display: flex; flex-direction: column; box-shadow: 0 2px 5px rgba(0,0,0,0.05); min-height: 220px; }
                .ya-card-top { margin-bottom: 12px; }
                .ya-author { font-weight: 700; font-size: 15px; margin-bottom: 4px; color: hsl(var(--foreground)); }
                .ya-stars { display: flex; gap: 2px; }
                .ya-text { font-size: 14px; line-height: 1.5; color: hsl(var(--muted-foreground)); flex-grow: 1; margin-bottom: 15px; }
                .ya-date { font-size: 12px; color: hsl(var(--muted-foreground) / 0.7); text-align: right; }
                .ya-nav-btn { position: absolute; top: 55%; transform: translateY(-50%); width: 44px; height: 44px; background: hsl(var(--card)); border: 1px solid hsl(var(--border)); border-radius: 50%; box-shadow: 0 4px 10px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; transition: opacity 0.3s, transform 0.2s; }
                .ya-nav-btn:hover { background: hsl(var(--muted)); transform: translateY(-50%) scale(1.05); }
                .ya-nav-btn:active { transform: translateY(-50%) scale(0.95); }
                .ya-nav-btn.hidden { opacity: 0; pointer-events: none; }
                .ya-prev { left: -15px; }
                .ya-next { right: -15px; }
                @media (max-width: 480px) { .ya-prev { left: 0; } .ya-next { right: 0; } .ya-container { padding: 20px 10px; } }
            `}</style>
            <div id="yandex-reviews-widget" dangerouslySetInnerHTML={{ __html: widgetHtml }} />
        </>
    );
}
