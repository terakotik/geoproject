'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const GRID_SIZE = 10;
const PLAYER = 'player';
const AI = 'ai';
type Player = 'player' | 'ai' | null;

const TerritoryGame = () => {
  const [grid, setGrid] = useState<Player[][]>(
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>(PLAYER);
  const [scores, setScores] = useState({ player: 0, ai: 0 });
  const [winner, setWinner] = useState<string | null>(null);

  const calculateScores = useCallback((currentGrid: Player[][]) => {
    let playerScore = 0;
    let aiScore = 0;
    currentGrid.forEach(row => {
      row.forEach(cell => {
        if (cell === PLAYER) playerScore++;
        if (cell === AI) aiScore++;
      });
    });
    return { player: playerScore, ai: aiScore };
  }, []);
  
  const checkWinner = useCallback((currentGrid: Player[][]) => {
    const emptyCells = currentGrid.flat().some(cell => cell === null);
    if (!emptyCells) {
      const finalScores = calculateScores(currentGrid);
      if (finalScores.player > finalScores.ai) {
        setWinner('Вы победили!');
      } else if (finalScores.ai > finalScores.player) {
        setWinner('Компьютер победил!');
      } else {
        setWinner('Ничья!');
      }
    }
  }, [calculateScores]);

  const handlePlayerMove = (row: number, col: number) => {
    if (grid[row][col] || winner || currentPlayer !== PLAYER) return;

    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = PLAYER;
    setGrid(newGrid);
    setScores(calculateScores(newGrid));
    
    const isBoardFull = !newGrid.flat().some(cell => cell === null);
    if (isBoardFull) {
        checkWinner(newGrid);
        return;
    }

    setCurrentPlayer(AI);

    // AI's turn
    setTimeout(() => {
      aiMove(newGrid);
    }, 300);
  };
  
  const aiMove = (currentGrid: Player[][]) => {
    if (winner) return;
    const availableCells: { row: number, col: number }[] = [];
    currentGrid.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell === null) {
          availableCells.push({ row: r, col: c });
        }
      });
    });

    if (availableCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableCells.length);
      const { row, col } = availableCells[randomIndex];
      
      const newGrid = currentGrid.map(r => [...r]);
      newGrid[row][col] = AI;
      setGrid(newGrid);
      setScores(calculateScores(newGrid));
      checkWinner(newGrid);
      setCurrentPlayer(PLAYER);
    } else {
       checkWinner(currentGrid);
    }
  };


  const resetGame = () => {
    setGrid(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null)));
    setCurrentPlayer(PLAYER);
    setScores({ player: 0, ai: 0 });
    setWinner(null);
  };
  
  useEffect(() => {
    checkWinner(grid);
  }, [grid, checkWinner]);


  return (
    <div className="relative w-full h-full p-4 flex flex-col items-center justify-center text-foreground font-sans">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-foreground">Игра: Захват Территории</h3>
        <p className="text-sm text-accent">Захватите больше ячеек, чем ваш оппонент</p>
      </div>
      <div className="flex items-center justify-between w-full max-w-xs mb-4 text-lg">
        <div className="text-accent font-bold">Вы: {scores.player}</div>
        <div className="text-muted-foreground font-bold">AI: {scores.ai}</div>
      </div>
      <div 
        className="grid gap-1 bg-card/10 backdrop-blur-sm p-2 rounded-md border border-border/20"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
        }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <motion.div
              key={`${r}-${c}`}
              onClick={() => handlePlayerMove(r, c)}
              className="w-8 h-8 md:w-10 md:h-10 rounded-sm cursor-pointer border border-border/30 transition-colors duration-200 hover:bg-accent/20"
              style={{ backgroundColor: cell === PLAYER ? 'hsl(var(--accent))' : cell === AI ? 'hsl(var(--foreground))' : 'transparent' }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          ))
        )}
      </div>
       <AnimatePresence>
        {winner && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center"
          >
            <h2 className="text-3xl font-bold text-accent mb-4">{winner}</h2>
            <Button onClick={resetGame}>Играть снова</Button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mt-4">
        <Button onClick={resetGame} variant="ghost" size="sm">Перезапустить</Button>
      </div>
    </div>
  );
};

export default TerritoryGame;
