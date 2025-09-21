'use client';

import React, { useEffect, useRef, useState } from 'react';

const ScrollProgressLine = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const maskRef = useRef<SVGPathElement>(null);
  const arrowRef = useRef<SVGGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [debugScroll, setDebugScroll] = useState(0);

  useEffect(() => {
    const path = pathRef.current;
    const mask = maskRef.current;
    const arrow = arrowRef.current;

    if (!path || !mask || !arrow) {
      return;
    }

    let pathLength = 0;
    let rafId: number;

    const setupAnimation = () => {
      setTimeout(() => {
        try {
          pathLength = path.getTotalLength();
          if (pathLength > 0) {
            mask.setAttribute('stroke-dasharray', pathLength.toString());
            mask.style.strokeDashoffset = pathLength.toString();
          } else {
            pathLength = 1637; 
            mask.setAttribute('stroke-dasharray', pathLength.toString());
            mask.style.strokeDashoffset = pathLength.toString();
          }
        } catch (e) {
          console.error("Failed to get SVG path length:", e);
          pathLength = 1637;
          mask.setAttribute("stroke-dasharray", pathLength.toString());
          mask.style.strokeDashoffset = pathLength.toString();
        }
      }, 100); 
    };

    setupAnimation();

    const handleScroll = () => {
      if (!pathLength) return;

      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      // Логика для остановки на 90%
      const animationEndScroll = docHeight * 0.9;
      let scrollPercent = animationEndScroll > 0 ? scrollY / animationEndScroll : 0;
      scrollPercent = Math.min(scrollPercent, 1); // Ограничиваем 100%

      setDebugScroll(scrollPercent); // Для теста

      const draw = pathLength * scrollPercent;
      
      mask.style.strokeDashoffset = (pathLength - draw).toString();

      if (scrollPercent >= 1 && pathLength > 0) {
        try {
          const endPoint = path.getPointAtLength(draw);
          const lastPoint = path.getPointAtLength(draw - 1);
          const angle = Math.atan2(endPoint.y - lastPoint.y, endPoint.x - lastPoint.x) * 180 / Math.PI;

          arrow.setAttribute('transform', `translate(${endPoint.x}, ${endPoint.y}) rotate(${angle})`);
          arrow.style.display = 'block';
        } catch(e) {
          arrow.style.display = 'none';
        }
      } else {
          arrow.style.display = 'none';
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', setupAnimation);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', setupAnimation);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} className="path-container hidden md:block">
      {/* Тестовый блок для проверки */}
      <div style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 100, backgroundColor: 'white', padding: '5px', border: '1px solid black', color: 'black' }}>
        Scroll Percent: {(debugScroll * 100).toFixed(2)}%
      </div>

      <svg width="198px" height="1458px" viewBox="0 0 198 1458">
          <defs>
              <linearGradient x1="50%" y1="7.06935325%" x2="50%" y2="100%" id="linearGradient-1">
                  <stop stopColor="#DE1652" offset="0%"></stop>
                  <stop stopColor="#F37121" offset="50.2239948%"></stop>
                  <stop stopColor="#FBAB26" offset="100%"></stop>
              </linearGradient>
              <mask id="theMask" maskUnits="userSpaceOnUse">
                  <path ref={maskRef} id="maskPath"
                      d="M702,266 C682,424 795.064639,474.307498 716,600 C599,786 769,821 688,988 C548.560405,1275.48657 822.815807,1223 840.843207,1373 C858.870608,1523 605.485477,1528 687.610302,1728"
                      fill="none"
                      fillRule="evenodd"
                      strokeDasharray="0"
                      transform="translate(-646.000000, -825.000000)"
                      strokeWidth="4"
                      stroke="#fff"/>
              </mask>
          </defs>
          <g id="content" mask="url(#theMask)">
              <path ref={pathRef} id="thePath"
                  d="M702,266 C682,424 795.064639,474.307498 716,600 C599,786 769,821 688,988 C548.560405,1275.48657 822.815807,1223 840.843207,1373 C858.870608,1523 605.485477,1528 687.610302,1728"
                  fill="none"
                  fillRule="evenodd"
                  strokeDasharray="12,16"
                  transform="translate(-646.000000, -825.000000)"
                  strokeWidth="4"
                  stroke="url(#linearGradient-1)"
              ></path>
          </g>
          <g ref={arrowRef} id="arrow" style={{ display: 'none' }}>
              <path d="M-10 -5 L0 0 L-10 5" stroke="red" strokeWidth="4" fill="none" />
          </g>
      </svg>
    </div>
  );
};

export { ScrollProgressLine };
