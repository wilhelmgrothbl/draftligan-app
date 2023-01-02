import Home from './components/home/home'
import Board from './components/leaderboard/board'
import Navbar from './components/navbar/navbar'
import Lineups from './components/lineups/lineups';
import { Route, Routes } from 'react-router-dom'
import React from 'react';



function App() {
  return (
        

    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/lineups" element={<Lineups />} />
        <Route path="/board" element={<Board />} />
      </Routes>

    </React.Fragment>
        
  );
}

export default App;

