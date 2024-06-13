import React, { useEffect, useState } from 'react';
import './App.css';
import Map from './components/Map';
import Settings from './components/Settings';
import seedrandom from 'seedrandom';
import { Grid, Paper, Container } from '@mui/material';

interface RGBColor {
  red: number;
  green: number;
  blue: number;
}

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
    fractality: 5,
    colors: [
      { red: 150, green: 201, blue: 240 }, // Water Deep
      { red: 172, green: 219, blue: 251 }, // Water Mid Low
      { red: 172, green: 219, blue: 251 }, // Water Mid High
      { red: 198, green: 236, blue: 255 }, // Water Shallow
      { red: 148, green: 191, blue: 139 }, // Land 0
      { red: 168, green: 198, blue: 143 }, // Land 1
      { red: 189, green: 204, blue: 150 }, // Land 2
      { red: 209, green: 215, blue: 171 }, // Land 3
      { red: 225, green: 228, blue: 181 }, // Land 4
      { red: 239, green: 235, blue: 192 }  // Land 5
    ],
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
    fractality: number;
    colors: RGBColor[];
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

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, minHeight: 0, alignItems: 'center' }}>
                  <Map {...mapData} />
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
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
