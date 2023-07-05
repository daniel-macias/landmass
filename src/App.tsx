import React from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/Map';

function App() {
  return (
    <div className="App">
      <p>Landmass</p>
      <Map squareSize={1} boardSize={500} />
    </div>
  );
}

export default App;
