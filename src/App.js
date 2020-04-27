import React from 'react';
import Landing from './Components/Landing';
import './App.css'

function App() {
  return (
    <div className = "main">
      <div className = "background-image" style={{backgroundImage: `url(table.jpg)`}}></div>
      <Landing />
    </div>
  );
}

export default App;
