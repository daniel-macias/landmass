import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, TextField, Slider, Button, Typography, Container, Grid } from '@mui/material';


const Settings = () => {
  // State variables for your settings
  const [boardSize, setBoardSize] = useState<number>(500);
  const [seed, setSeed] = useState<number>(0);
  const [edgeCompressionAmount, setEdgeCompressionAmount] = useState<number>(0.5);
  const [decreasingMultiplier, setDecreasingMultiplier] = useState<number>(0.5);
  const [increasingMultiplier, setIncreasingMultiplier] = useState<number>(0.5);
  const [decreasingOffset, setDecreasingOffset] = useState<number>(0.5);
  const [increasingOffset, setIncreasingOffset] = useState<number>(0.5);
  const [scale, setScale] = useState<number>(200);

  const [isDialogOpen, setIsDialogOpen] = useState(false);


  // Function to handle form submission
  const handleSubmit = () => {
    // Process form data and generate the map
    // You can add your map generation logic here
    console.log('Generating Map...');
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };
  
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Container maxWidth="lg">
      <form style={{ margin: '16px 0' }}>
      <Typography id="decreasing-multiplier-slider-label">Map Settings</Typography>
      <hr />
        <Grid container spacing={2} style={{ marginTop: '8px' }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Board Size"
              type="number"
              value={boardSize.toString()}
              onChange={(e) => setBoardSize(parseInt(e.target.value, 10))}
              fullWidth
              InputProps={{ inputProps: { min: 0, max: 1000 } }}
            />
            <Typography id="decreasing-multiplier-slider-label" style={{ marginTop: '8px' }}>Decreasing Multiplier</Typography>
            <Slider
              value={decreasingMultiplier}
              onChange={(_, newValue) => setDecreasingMultiplier(newValue as number)}
              valueLabelDisplay="auto"
              step={0.01}
              min={0}
              max={1}
              aria-labelledby="decreasing-multiplier-slider-label"
            />
            <Typography id="decreasing-offset-slider-label">Decreasing Offset</Typography>
            <Slider
              value={decreasingOffset}
              onChange={(_, newValue) => setDecreasingOffset(newValue as number)}
              valueLabelDisplay="auto"
              step={0.01}
              min={0}
              max={1}
              aria-labelledby="decreasing-offset-slider-label"
            />

            
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
            label="Scale"
            type="number"
            value={scale.toString()}
            onChange={(e) => setScale(parseInt(e.target.value, 10))}
            fullWidth
            InputProps={{ inputProps: { min: 0, max: 1000 } }}
          />
            <Typography id="increasing-multiplier-slider-label" style={{ marginTop: '8px' }}>Increasing Multiplier</Typography>
            <Slider
              value={increasingMultiplier}
              onChange={(_, newValue) => setIncreasingMultiplier(newValue as number)}
              valueLabelDisplay="auto"
              step={0.01}
              min={0}
              max={1}
              aria-labelledby="increasing-multiplier-slider-label"
            />
            
            <Typography id="increasing-offset-slider-label">Increasing Offset</Typography>
            <Slider
              value={increasingOffset}
              onChange={(_, newValue) => setIncreasingOffset(newValue as number)}
              valueLabelDisplay="auto"
              step={0.01}
              min={0}
              max={1}
              aria-labelledby="increasing-offset-slider-label"
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
        <Typography id="decreasing-multiplier-slider-label" style={{ marginTop: '8px' }}>Edge Compression</Typography>
            <Slider
              value={edgeCompressionAmount}
              onChange={(_, newValue) => setEdgeCompressionAmount(newValue as number)}
              valueLabelDisplay="auto"
              step={0.01}
              min={0}
              max={1}
              aria-labelledby="decreasing-multiplier-slider-label"
            />
          <TextField style={{ marginTop: '8px' }}
              label="Seed"
              type="number"
              value={seed.toString()}
              onChange={(e) => setSeed(parseInt(e.target.value, 10))}
              fullWidth
            />
            
        </Grid>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Generate Map
          </Button>
        </Box>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={openDialog}>
            How This Works
          </Button>
        </Box>
      </form>

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>How This Works</DialogTitle>
        <DialogContent>
            This is an example of how this works.
        </DialogContent>
        <DialogActions>
            <Button
            component="a" // Use component="a" for a link
            href="https://github.com/your-repository-url" // Replace with your GitHub repository URL
            target="_blank" // Open the link in a new tab
            color="primary"
            >
            Open GitHub Repository
            </Button>
            <Button onClick={closeDialog} color="warning">
            Close
            </Button>
        </DialogActions>
    </Dialog>

    </Container>
  );
};

export default Settings;
