import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/Map';
import Settings from './components/Settings';
import seedrandom from 'seedrandom';
import { Grid, Paper, Container } from '@mui/material';
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
      <Container maxWidth="lg">
      <div
        style={{
          minHeight: '100vh', // Set a minimum height to fill the entire viewport
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center the content horizontally
          overflowY: 'auto', // Enable vertical scrolling when needed
        }}
      >
        
      <p>Landmass</p>

      {/* 'lg' here sets the maximum width to large screens, but you can adjust this based on your preference */}
      <Grid container spacing={2}>
        {/* For larger screens (1/3 and 2/3) */}
        
        <Grid item xs={12} sm={8}>
          {/* Content for the 2/3 column */}
          <Paper elevation={3} style={{ minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, overflow: 'auto' }}>
            <Map squareSize={1} boardSize={500} seed={randomNumber} edgeCompressionAmount={0.1} decreasingMultiplier={0.4} increasingMultiplier={0.4} decreasingOffset={0.4} increasingOffset={0.7} scale={200} />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          {/* Content for the 1/3 column */}
          <Paper elevation={3} style={{ minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
            <Settings />
          </Paper>
        </Grid>
      </Grid>
      </div>
    </Container>
      
      
    </div>
  );
}

export default App;
