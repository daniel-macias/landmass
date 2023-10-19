import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Map from './components/Map';
import Settings from './components/Settings';
import seedrandom from 'seedrandom';
import { Grid, Paper, Container } from '@mui/material';

function App() {

  const [randomNumber, setRandomNumber] = useState(0);
  const [mapData, setMapData] = useState({
    boardSize: 400,
    squareSize: 1,
    seed: randomNumber,
    edgeCompressionAmount: 0.5,
    decreasingMultiplier: 0.5,
    increasingMultiplier: 0.5,
    decreasingOffset: 0.5,
    increasingOffset: 0.5,
    scale: 200,
  });
  

  useEffect(() => {
    const now = new Date();
    const rng = seedrandom(
      (now.getDate() + now.getMonth() * 32 + now.getFullYear() * 400).toString()
    );

    setRandomNumber(parseFloat(rng.toString()));


  }, []); 

  const generateMap = (formData: {
    boardSize: number;
    squareSize: number;
    seed: number;
    edgeCompressionAmount: number;
    decreasingMultiplier: number;
    increasingMultiplier: number;
    decreasingOffset: number;
    increasingOffset: number;
    scale: number;
  }) => {
    // Process the form data and generate the map
    console.log('Generating Map...');
    console.log(formData);
    setMapData(formData);
  };

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
        
      <h1 className="montserrat-title">Perlin Noise Landmass Generator v1</h1>

      {/* 'lg' here sets the maximum width to large screens, but you can adjust this based on your preference */}
      <Grid container spacing={2}>
        {/* For larger screens (1/3 and 2/3) */}
        
        <Grid item xs={12} sm={8}>
          {/* Content for the 2/3 column */}
          <Paper elevation={3} style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, minHeight: 0, alignItems: 'center' }}>
            <Map {...mapData} />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          {/* Content for the 1/3 column */}
          <Paper elevation={3} style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
            <Settings onSubmit={generateMap} />
          </Paper>
        </Grid>
      </Grid>
      </div>
    </Container>
      
      
    </div>
  );
}

export default App;
