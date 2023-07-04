import React, { useEffect, useRef } from 'react';

const Map: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) {
      return;
    }

    const squareSize = 1; // Size of each square in pixels
    const boardSize = 500; // Size of the entire map in squares
    const canvasSize = squareSize * boardSize; // Size of the canvas in pixels

    canvas.width = canvasSize;
    canvas.height = canvasSize;

    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        const isEvenRow = i % 2 === 0;
        const isEvenColumn = j % 2 === 0;
        const isEvenSquare = (isEvenRow && isEvenColumn) || (!isEvenRow && !isEvenColumn);

        const squareColor = isEvenSquare ? 'white' : 'black';

        context.fillStyle = squareColor;
        context.fillRect(i * squareSize, j * squareSize, squareSize, squareSize);
      }
    }
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Map;
