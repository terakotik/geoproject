'use client';

import React, { useEffect, useRef } from 'react';

const ScrollProgressLine = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const maskRef = useRef<SVGPathElement>(null);
  const arrowRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const mask = maskRef.current;
    const arrow = arrowRef.current;

    if (!path || !mask || !arrow) {
      return;
    }

    let pathLength = 0;

    // The logic needs to be in a function to be callable
    const setupAnimation = () => {
      try {
        pathLength = path.getTotalLength();
        mask.setAttribute('stroke-dasharray', pathLength.toString());
        mask.style.strokeDashoffset = pathLength.toString();
      } catch (e) {
        console.error("Failed to get SVG path length:", e);
        // Fallback to a fixed length if getTotalLength fails
        pathLength = 1637;
        mask.setAttribute("stroke-dasharray", pathLength.toString());
        mask.style.strokeDashoffset = pathLength.toString();
      }
    };

    // Use a small timeout to ensure the SVG is rendered and measurable
    const timeoutId = setTimeout(setupAnimation, 100);

    const handleScroll = () => {
      if (!pathLength) return;

      const scrollPercent = (window.scrollY) / (document.documentElement.scrollHeight - window.innerHeight);
      
      // Clamp the scroll percentage between 0 and 1
      const clampedScrollPercent = Math.max(0, Math.min(1, scrollPercent));
      
      const draw = pathLength * clampedScrollPercent;
      mask.style.strokeDashoffset = (pathLength - draw).toString();

      if (clampedScrollPercent > 0.99) {
          const endPoint = path.getPointAtLength(pathLength);
          const lastPoint = path.getPointAtLength(pathLength * 0.99);
          const angle = Math.atan2(endPoint.y - lastPoint.y, endPoint.x - lastPoint.x) * 180 / Math.PI;

          arrow.setAttribute('transform', `translate(${endPoint.x}, ${endPoint.y}) rotate(${angle})`);
          arrow.style.display = 'block';
      } else {
          arrow.style.display = 'none';
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', setupAnimation); // Recalculate on resize

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', setupAnimation);
    };
  }, []);

  return (
    <div className="path-container hidden md:block">
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
