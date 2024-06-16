import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { createNoise2D } from 'simplex-noise';
import seedrandom from 'seedrandom';

interface MapProps {
  squareSize: number;
  boardSize: number;
  seed: number;
  edgeCompressionAmount: number;
  decreasingMultiplier: number;
  increasingMultiplier: number;
  decreasingOffset: number;
  increasingOffset: number;
  scale: number;
  fractality: number;
  colors: RGBColor[];
}

interface RGBColor {
  red: number;
  green: number;
  blue: number;
}

const Map = forwardRef<HTMLCanvasElement, MapProps>(({
  squareSize,
  boardSize,
  seed,
  edgeCompressionAmount,
  decreasingMultiplier,
  increasingMultiplier,
  decreasingOffset,
  increasingOffset,
  scale,
  fractality,
  colors
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useImperativeHandle(ref, () => canvasRef.current!);

  // Ensure the seed is positive
  seed = Math.abs(seed);

  // Get the color corresponding to the given value
  const getColorForValue = (value: number): RGBColor => {
    const colorIndex = Math.floor(value * (colors.length - 1));
    return colors[colorIndex];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    let vectorSeedX: number = 6;
    let vectorSeedY: number = 0.5;

    // Initialize random number generator with a date-based seed
    const now = new Date();
    const rng = seedrandom(
      (now.getDate() + now.getMonth() * 32 + now.getFullYear() * 400).toString()
    );

    // Create 2D noise generator
    const noise2D = createNoise2D(rng);

    if (!canvas || !context) {
      return;
    }

    // Set canvas dimensions
    const canvasSize = squareSize * boardSize;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Increase Perlin Noise Value (PNV)
    const increasePNV = (distFromEdge: number, x: number, y: number) => {
      const noiseX = (x + vectorSeedX) / scale * increasingMultiplier;
      const noiseY = (y + vectorSeedY) / scale * increasingMultiplier;
      return (noise2D(noiseX, noiseY) + 1) / 2 + increasingOffset;
    };

    // Decrease Perlin Noise Value (PNV)
    const decreasePNV = (distFromEdge: number, x: number, y: number) => {
      const noiseX = (x + vectorSeedX) / scale * decreasingMultiplier;
      const noiseY = (y + vectorSeedY) / scale * decreasingMultiplier;
      return (noise2D(noiseX, noiseY) + 1) / 2 - decreasingOffset;
    };

    // Add more fractality by combining multiple noise layers
    const addFractality = (x: number, y: number, layers: number, persistence: number) => {
      let total = 0;
      let frequency = 1;
      let amplitude = 1;
      let maxValue = 0;

      for (let i = 0; i < layers; i++) {
        total += noise2D(x * frequency, y * frequency) * amplitude;
        maxValue += amplitude;
        amplitude *= persistence;
        frequency *= 2;
      }

      return total / maxValue;
    };

    // Draw the map using Perlin noise
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        vectorSeedY = seed + i;
        vectorSeedX = seed + j;

        // Calculate distance from the edge
        const distFromEdgeX = i / boardSize - 0.5;
        const distFromEdgeY = j / boardSize - 0.5;
        let distFromEdge = Math.sqrt(distFromEdgeX * distFromEdgeX + distFromEdgeY * distFromEdgeY) / Math.sqrt(0.5);

        // Base Perlin noise value
        let perlinNoiseValue = (noise2D((j + vectorSeedX) / scale, (i + vectorSeedY) / scale) + 1) / 2;
        distFromEdge = Math.pow(distFromEdge, edgeCompressionAmount);
        perlinNoiseValue = (1 + perlinNoiseValue - distFromEdge) / 2;

        // Apply fractal noise for more detail
        const fractalValue = addFractality((j + vectorSeedX) / scale, (i + vectorSeedY) / scale, fractality, 0.5);
        perlinNoiseValue = (perlinNoiseValue + fractalValue) / 2;

        // Adjust Perlin noise value based on edge distance
        perlinNoiseValue = decreasePNV(distFromEdge, j, i) + perlinNoiseValue * (increasePNV(distFromEdge, j, i) - decreasePNV(distFromEdge, i, j));
        perlinNoiseValue = Math.min(Math.max(perlinNoiseValue, 0), 1);

        // Get the color for the noise value and fill the rectangle
        const { red, green, blue } = getColorForValue(perlinNoiseValue);
        context.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        context.fillRect(i * squareSize, j * squareSize, squareSize, squareSize);
      }
    }
  }, [squareSize, boardSize, seed, edgeCompressionAmount, decreasingMultiplier, increasingMultiplier, decreasingOffset, increasingOffset, scale, fractality, colors]);

  return (
    <div style={{ maxWidth: '100%' }}>
      <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  );
});

export default Map;
