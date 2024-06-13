import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Slider, Button, Typography, Container, Grid, Box, Popover } from '@mui/material';
import { ChromePicker } from 'react-color';

interface SettingsProps {
  onSubmit: (formData: {
    boardSize: number;
    seed: number;
    edgeCompressionAmount: number;
    decreasingMultiplier: number;
    increasingMultiplier: number;
    decreasingOffset: number;
    increasingOffset: number;
    scale: number;
    squareSize: number;
    colors: RGBColor[];
  }) => void;
}

interface RGBColor {
  red: number;
  green: number;
  blue: number;
}

const Settings = ({ onSubmit }: SettingsProps) => {
  // State variables for your settings
  const [boardSize, setBoardSize] = useState<number>(400);
  const [seed, setSeed] = useState<number>(0);
  const [edgeCompressionAmount, setEdgeCompressionAmount] = useState<number>(0.5);
  const [decreasingMultiplier, setDecreasingMultiplier] = useState<number>(0.5);
  const [increasingMultiplier, setIncreasingMultiplier] = useState<number>(0.5);
  const [decreasingOffset, setDecreasingOffset] = useState<number>(0.5);
  const [increasingOffset, setIncreasingOffset] = useState<number>(0.5);
  const [scale, setScale] = useState<number>(200);
  const [squareSize, setSquareSize] = useState<number>(1);

  // State variables for color pickers
  const [colors, setColors] = useState<RGBColor[]>([
    { red: 150, green: 201, blue: 240 }, // Water Deep
    { red: 172, green: 219, blue: 251 }, // Water Mid Low
    { red: 172, green: 219, blue: 251 }, // Water Mid High
    { red: 198, green: 236, blue: 255 }, // Water Shallow
    { red: 148, green: 191, blue: 139 }, // Land 0
    { red: 168, green: 198, blue: 143 }, // Land 1
    { red: 189, green: 204, blue: 150 }, // Land 2
    { red: 209, green: 215, blue: 171 }, // Land 3
    { red: 225, green: 228, blue: 181 }, // Land 4
    { red: 239, green: 235, blue: 192 }, // Land 5
  ]);

  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleColorChange = (color: any) => {
    if (selectedColor !== null) {
      const newColors = [...colors];
      newColors[selectedColor] = {
        red: color.rgb.r,
        green: color.rgb.g,
        blue: color.rgb.b,
      };
      setColors(newColors);
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    const formData = {
      boardSize,
      seed,
      edgeCompressionAmount,
      decreasingMultiplier,
      increasingMultiplier,
      decreasingOffset,
      increasingOffset,
      scale,
      squareSize,
      colors,
    };
    // Call the onSubmit function from the props and pass the form data
    onSubmit(formData);
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedColor(index);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'color-picker-popover' : undefined;

  const colorLabels = [
    'Deep Ocean',
    'Mid Low Ocean',
    'Mid High Ocean',
    'Shallow Ocean',
    'Land 0',
    'Land 1',
    'Land 2',
    'Land 3',
    'Land 4',
    'Land 5'
  ];

  return (
    <Container maxWidth="lg">
      <form style={{ margin: '16px 0' }}>
        <Typography id="decreasing-multiplier-slider-label" fontFamily={'Nunito Sans'}>Map Settings</Typography>
        <hr />
        <Grid container spacing={2} style={{ marginTop: '8px' }}>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Scale"
                  type="number"
                  value={scale.toString()}
                  onChange={(e) => setScale(parseInt(e.target.value, 10))}
                  fullWidth
                  InputProps={{ inputProps: { min: 0, max: 1000 } }}
                />
                <Typography fontFamily={'Nunito Sans'} id="decreasing-multiplier-slider-label" style={{ marginTop: '8px' }}>Subtract Multiplier</Typography>
                <Slider
                  size="small"
                  value={decreasingMultiplier}
                  onChange={(_, newValue) => setDecreasingMultiplier(newValue as number)}
                  valueLabelDisplay="auto"
                  step={0.01}
                  min={0}
                  max={1}
                  aria-labelledby="decreasing-multiplier-slider-label"
                />
                <Typography fontFamily={'Nunito Sans'} id="decreasing-offset-slider-label">Subtract Offset</Typography>
                <Slider
                  size="small"
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
                  label="Seed"
                  type="number"
                  value={seed.toString()}
                  onChange={(e) => setSeed(parseInt(e.target.value, 10))}
                  fullWidth
                />
                <Typography fontFamily={'Nunito Sans'} id="increasing-multiplier-slider-label" style={{ marginTop: '8px' }}>Increasing Multiplier</Typography>
                <Slider
                  size="small"
                  value={increasingMultiplier}
                  onChange={(_, newValue) => setIncreasingMultiplier(newValue as number)}
                  valueLabelDisplay="auto"
                  step={0.01}
                  min={0}
                  max={1}
                  aria-labelledby="increasing-multiplier-slider-label"
                />
                <Typography fontFamily={'Nunito Sans'} id="increasing-offset-slider-label">Incr. Offset</Typography>
                <Slider
                  size="small"
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
              <Typography fontFamily={'Nunito Sans'} id="decreasing-multiplier-slider-label" style={{ marginTop: '8px' }}>Edge Compression</Typography>
              <Slider
                size="small"
                value={edgeCompressionAmount}
                onChange={(_, newValue) => setEdgeCompressionAmount(newValue as number)}
                valueLabelDisplay="auto"
                step={0.01}
                min={0}
                max={1}
                aria-labelledby="decreasing-multiplier-slider-label"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} style={{ marginTop: '16px' }}>
            <Typography fontFamily={'Nunito Sans'}>Layer Colors</Typography>
            <Typography fontFamily={'Nunito Sans'}>Water</Typography>
            <Grid container spacing={1} style={{ marginTop: '8px' }}>
              {colors.slice(0, 4).map((color, index) => (
                <Grid item xs={6} key={index}>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})`,
                      color: 'white',
                      width: '60px',
                      height: '30px',
                      marginBottom: '8px',
                      fontSize: '10px'
                    }}
                    onClick={(event) => handleClick(event, index)}
                  >
                    {colorLabels[index].split(' ')[0]}
                  </Button>
                </Grid>
              ))}
            </Grid>
            <Typography fontFamily={'Nunito Sans'} style={{ marginTop: '8px' }}>Land</Typography>
            <Grid container spacing={1} style={{ marginTop: '8px' }}>
              {colors.slice(4).map((color, index) => (
                <Grid item xs={6} key={index + 4}>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})`,
                      color: 'white',
                      width: '60px',
                      height: '30px',
                      marginBottom: '8px',
                      fontSize: '10px'
                    }}
                    onClick={(event) => handleClick(event, index + 4)}
                  >
                    {colorLabels[index + 4].split(' ')[0]}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <ChromePicker color={selectedColor !== null ? `rgb(${colors[selectedColor].red}, ${colors[selectedColor].green}, ${colors[selectedColor].blue})` : '#fff'} onChange={handleColorChange} />
        </Popover>
        <Grid container spacing={2} style={{ marginTop: '16px' }}>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="success" onClick={handleSubmit} style={{ fontFamily: 'Nunito Sans' }}>
              Generate Map
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" onClick={openDialog} style={{ fontFamily: 'Nunito Sans' }}>
              How It Works
            </Button>
          </Grid>
        </Grid>
      </form>

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>How This Works</DialogTitle>
        <DialogContent>
          <p>Explaining how this was done in detail may take a long time, but in a nutshell: I used Perlin noise as a base. This noise is later altered using the Euclidean distance function to simulate actual land behavior. I did this twice over to increase coastline granularity.</p>
          <Grid container justifyContent="center" alignItems="center" spacing={2} paddingTop={2}>
            <Grid item>
              <img src="/images/perlin.png" alt="perlin noise" style={{ width: '120px', height: 'auto' }} />
              <p style={{ fontSize: '14px' }}>Perlin Noise</p>
            </Grid>
            <Grid item>
              <img src="/images/euclid.png" alt="euclid distance function" style={{ width: '140px', height: 'auto' }} />
              <p style={{ fontSize: '14px' }}>Euclid's Function</p>
            </Grid>
          </Grid>
          <p>This is an oversimplified explanation of how this works, but here is a short explanation of the variables the user can change:</p>
          <p><strong>Multiplier:</strong> Adjusts the granularity and complexity of landmasses along different axes.</p>
          <p><strong>Offset:</strong> Influences the properties of maximum and minimum altitude, allowing for tailored elevation characteristics.</p>
          <p><strong>Edge Compression:</strong> Alters the proportion of land surfaces to water, impacting the extent of landmasses.</p>
        </DialogContent>
        <DialogActions>
          <Button
            component="a"
            href="https://github.com/daniel-macias/landmass"
            target="_blank"
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
