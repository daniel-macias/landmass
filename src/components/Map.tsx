import React, { useEffect, useRef, useState } from 'react';
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
}

interface RGBColor {
  red: number;
  green: number;
  blue: number;
}

const Map: React.FC<MapProps> = ({ squareSize, boardSize, seed, edgeCompressionAmount, decreasingMultiplier, increasingMultiplier,decreasingOffset, increasingOffset, scale }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  seed = Math.abs(seed);

  //List of colors for each level
  const colors: RGBColor[] = [
    { red:150, green:201, blue:240 },     //Water Deep
    { red: 172, green: 219 , blue: 251 },  //Water Mid Low  
    { red: 172, green: 219 , blue: 251 },  //Water Mid High  
    { red: 198 , green: 236 , blue: 255 },   //Water Shallow    

    { red: 148 , green: 191 , blue: 139 },  // Land 0  
    { red: 168 , green: 198 , blue: 143 },  // Land 1  
    { red: 189 , green: 204 , blue: 150 },  // Land 2   
    { red: 209 , green: 215 , blue: 171 },  // Land 3 
    { red: 225 , green: 228 , blue: 181 },  // Land 4  
    { red: 239 , green: 235 , blue: 192 },  // Land 5    
    // Add more colors as needed
  ];


  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    let vectorSeedX : number = 6;
    let vectorSeedY : number = 0.5;

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
      let noiseX = (x + vectorSeedX) / scale * increasingMultiplier;
      let noiseY = (y + vectorSeedY) / scale * increasingMultiplier;
      return ((noise2D(noiseX,noiseY) + 1) / 2) + increasingOffset;
    };

    //Decreses the PNV (Perlin Noise Value) by using the same Perlin Noise generated
    //scaled to create bigger or smaller shapes on the terrain
    const decresePNV = (distFromEdge : number, x: number, y: number) => {
      let noiseX = (x + vectorSeedX) / scale * decreasingMultiplier;
      let noiseY = (y + vectorSeedY) / scale * decreasingMultiplier;
      return ((noise2D(noiseX,noiseY) + 1) / 2) - decreasingOffset;
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
        
        let perlinNoiseValue = ((noise2D((j + vectorSeedX) / scale, (i + vectorSeedY) / scale)) + 1) / 2;

        distFromEdge = Math.pow(distFromEdge, edgeCompressionAmount);
        perlinNoiseValue = (1 + perlinNoiseValue - distFromEdge) / 2;


        //Adding a second iteration of perlin-noise randomness to create sub-shapes in the terrain
        perlinNoiseValue = decresePNV(distFromEdge,j,i) + perlinNoiseValue * (incresePNV(distFromEdge, j, i) - decresePNV(distFromEdge, i, j));
        perlinNoiseValue = Math.min(Math.max(perlinNoiseValue, 0), 1);
        

        // Interpolate between black and white based on the noise value
        const lightness = Math.floor(perlinNoiseValue * 255);
        let squareColor = `rgb(${lightness}, ${lightness}, ${lightness})`;

        if (perlinNoiseValue >= 0 && perlinNoiseValue < 0.1) {
          squareColor = `rgb(${colors[0].red}, ${colors[0].green}, ${colors[0].blue})`;
        } else if (perlinNoiseValue >= 0.1 && perlinNoiseValue < 0.2) {
          squareColor = `rgb(${colors[1].red}, ${colors[1].green}, ${colors[1].blue})`;
        } else if (perlinNoiseValue >= 0.2 && perlinNoiseValue < 0.3) {
          squareColor = `rgb(${colors[2].red}, ${colors[2].green}, ${colors[2].blue})`;
        } else if (perlinNoiseValue >= 0.3 && perlinNoiseValue < 0.4) {
          squareColor = `rgb(${colors[3].red}, ${colors[3].green}, ${colors[3].blue})`;
        } else if (perlinNoiseValue >= 0.4 && perlinNoiseValue < 0.5) {
          squareColor = `rgb(${colors[4].red}, ${colors[4].green}, ${colors[4].blue})`;
        } else if (perlinNoiseValue >= 0.5 && perlinNoiseValue < 0.6) {
          squareColor = `rgb(${colors[5].red}, ${colors[5].green}, ${colors[5].blue})`;
        } else if (perlinNoiseValue >= 0.6 && perlinNoiseValue < 0.7) {
          squareColor = `rgb(${colors[6].red}, ${colors[6].green}, ${colors[6].blue})`; 
        } else if (perlinNoiseValue >= 0.7 && perlinNoiseValue < 0.8) {
          squareColor = `rgb(${colors[7].red}, ${colors[7].green}, ${colors[7].blue})`; 
        } else if (perlinNoiseValue >= 0.8 && perlinNoiseValue < 0.9) {
          squareColor = `rgb(${colors[8].red}, ${colors[8].green}, ${colors[8].blue})`; 
        } else if (perlinNoiseValue >= 0.9 && perlinNoiseValue <= 1) {
          squareColor = `rgb(${colors[9].red}, ${colors[9].green}, ${colors[9].blue})`; 
        } else {
          // Action for values outside the specified ranges
          console.log('perlinNoiseValue is outside the specified ranges');
          console.log('perlinNoiseValue: ', perlinNoiseValue);
          console.log('noise: ', distFromEdge);
        }

        

        context.fillStyle = squareColor;
        context.fillRect(i * squareSize, j * squareSize, squareSize, squareSize);

      }
    }
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Map;
