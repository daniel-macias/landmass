import React, { useEffect, useRef, useState } from 'react';
import { createNoise2D } from 'simplex-noise';
import seedrandom from 'seedrandom';

interface MapProps {
    squareSize: number;
    boardSize: number;
    seed: number;
  }

const Map: React.FC<MapProps> = ({ squareSize, boardSize, seed }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);


  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    const now = new Date();
    const rng = seedrandom(
      (now.getDate() + now.getMonth() * 32 + now.getFullYear() * 400).toString()
    );

    const noise2D = createNoise2D(rng);
    console.log(noise2D(500, 500));

    if (!canvas || !context) {
      return;
    }

    const canvasSize = squareSize * boardSize; // Size of the canvas in pixels

    canvas.width = canvasSize;
    canvas.height = canvasSize;

    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        const noiseValue = noise2D(i, j);

        // Interpolate between black and white based on the noise value
        const lightness = Math.floor(noiseValue * 255);
        const squareColor = `rgb(${lightness}, ${lightness}, ${lightness})`;

        context.fillStyle = squareColor;
        context.fillRect(i * squareSize, j * squareSize, squareSize, squareSize);
      }
    }
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Map;
