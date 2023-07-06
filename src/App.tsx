import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/Map';
import seedrandom from 'seedrandom';
import { createNoise2D } from 'simplex-noise';

function App() {

  const [randomNumber, setRandomNumber] = useState(0);

  useEffect(() => {
    const now = new Date();
    const rng = seedrandom(
      (now.getDate() + now.getMonth() * 32 + now.getFullYear() * 400).toString()
    );

    setRandomNumber(parseFloat(rng.toString()));


  }, []); 

  return (
    <div className="App">
      <p>Landmass</p>
      <Map squareSize={1} boardSize={500} seed={randomNumber} />
      <p>{randomNumber}</p>
    </div>
  );
}

export default App;
