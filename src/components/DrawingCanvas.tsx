'use client';

import React, { useRef, useState, useEffect } from 'react';

const DrawingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [{ isDrawing, lastPoint }, setDrawingState] = useState<{ isDrawing: boolean; lastPoint: { x: number; y: number } | null }>({ isDrawing: false, lastPoint: null });
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const getMousePos = (canvas: HTMLCanvasElement, evt: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw lines
    if (points.length > 1) {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.strokeStyle = '#4CAF50';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
    }
    
    // Draw cursor
    ctx.beginPath();
    ctx.arc(cursor.x, cursor.y, 8, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(76, 175, 80, 0.8)';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const handleResize = () => {
        const parent = canvas.parentElement;
        if(parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        }
    };
    
    handleResize();

    const handleMouseDown = (e: MouseEvent) => {
      const pos = getMousePos(canvas, e);
      setDrawingState({ isDrawing: true, lastPoint: pos });
      setPoints([pos]);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const pos = getMousePos(canvas, e);
      setCursor(pos);

      setDrawingState(prevState => {
        if (prevState.isDrawing) {
          setPoints(prevPoints => [...prevPoints, pos]);
          return { ...prevState, lastPoint: pos };
        }
        return prevState;
      });
    };

    const handleMouseUp = () => {
      setDrawingState({ isDrawing: false, lastPoint: null });
    };

    const handleMouseLeave = () => {
      // Keep the cursor visible at the last position
      // To hide it, you could set cursor to an off-screen position.
    }

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    draw(ctx);
  }, [points, cursor]);

  return (
    <div className="relative w-full h-full cursor-none">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center text-foreground z-10 p-2 bg-background/50 rounded-md">
            <h3 className="text-lg font-semibold">Нарисуйте ваш участок</h3>
        </div>
        <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default DrawingCanvas;
