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

    //THIS WILL BECOME PROPS
    const edgeCompressionAmount : number = 0.8;
    const decreasingMultiplier : number = 0.4;
    const increasingMultiplier : number = 0.7;
    const decreasingOffset : number = 0.3;
    const increasingOffset : number = 0.3;
    const scale : number = 100;
    let vectorSeedX : number = 0.4;
    let vectorSeedY : number = 0.4;

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

    //Increses the PNV (Perlin Noise Value) by using the same Perlin Noise generated
    //scaled to create bigger or smaller shapes on the terrain
    const incresePNV = (distFromEdge : number, x: number, y: number) => {
      return noise2D((x + vectorSeedX) / scale* increasingMultiplier, (y + vectorSeedY) / scale * increasingMultiplier) + increasingOffset;
    };

    //Decreses the PNV (Perlin Noise Value) by using the same Perlin Noise generated
    //scaled to create bigger or smaller shapes on the terrain
    const decresePNV = (distFromEdge : number, x: number, y: number) => {
      return noise2D((x + vectorSeedX) / scale * decreasingMultiplier, (y + vectorSeedY) / scale * decreasingMultiplier) - decreasingOffset;
    };

    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        const noiseValue = noise2D(i, j);

        vectorSeedY = seed + i;
        vectorSeedX = seed + j;

        //AAAAAAAAAAAAAAA
        //Finding the distance from the edge using the Eucledian distance function
        const distFromEdgeX = i / boardSize - 0.5;
        const distFromEdgeY = j / boardSize - 0.5;
        let distFromEdge = Math.sqrt(distFromEdgeX * distFromEdgeX + distFromEdgeY * distFromEdgeY) / Math.sqrt(0.5);
        
        let perlinNoiseValue = noise2D((j + vectorSeedX) / scale, (i + vectorSeedY) / scale);

        distFromEdge = Math.pow(distFromEdge, edgeCompressionAmount);
        perlinNoiseValue = (1 + perlinNoiseValue - distFromEdge) / 2;


        //Adding a second iteration of perlin-noise randomness to create sub-shapes in the terrain
        perlinNoiseValue = decresePNV(distFromEdge,j,i) + perlinNoiseValue * (incresePNV(distFromEdge, j, i) - decresePNV(distFromEdge, i, j));

        // Interpolate between black and white based on the noise value
        const lightness = Math.floor(perlinNoiseValue * 255);
        const squareColor = `rgb(${lightness}, ${lightness}, ${lightness})`;

        context.fillStyle = squareColor;
        context.fillRect(i * squareSize, j * squareSize, squareSize, squareSize);

      }
    }
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Map;
