import History from './components/history/history'
import Board from './components/leaderboard/board'
import Navbar from './components/navbar/navbar'
import DeEfterkloka from './components/de-efterkloka/deEfterkloka';
import { Route, Routes } from 'react-router-dom'
import React from 'react';



function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/history" element={<History />} />
        <Route path="/board" element={<Board />} />
      </Routes>

    </React.Fragment>
        
  );
}

export default App;

