import HistoryNew from './components/historynew/historynew'
import Board from './components/leaderboard/board'
import Navbar from './components/navbar/navbar'
import Home from './components/home/home';
import { Route, Routes } from 'react-router-dom'
import React from 'react';



function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/historynew" element={<HistoryNew />} />
        <Route path="/board" element={<Board />} />
        <Route path="/home" element={<Home />} />
      </Routes>

    </React.Fragment>
        
  );
}

export default App;

