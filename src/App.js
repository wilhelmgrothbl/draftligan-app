import HistoryNew from './components/historynew/historynew'
import Board from './components/leaderboard/board'
import Navbar from './components/navbar/navbar'
import Home from './components/home/home';
import Merch from './components/merch/merch';
import { Route, Routes } from 'react-router-dom'
import React, { useEffect } from 'react';
import { initHotjar } from './hotjar';
import EditTeamPage from './components/edit-team-page/edit-team-page';
import TipsAndTricks from './components/tipsanstricks/tipsanstricks';



function App() {
  useEffect(() => {
    initHotjar();
  }, []);
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/historynew" element={<HistoryNew />} />
        <Route path="/board" element={<Board />} />
        <Route path="/home" element={<Home />} />
        <Route path="/merch" element={<Merch />} />
        <Route path="/edit-team" element={<EditTeamPage />} />
        {/* <Route path="/tips-and-tricks" element={<TipsAndTricks />} /> */}
      </Routes>

    </React.Fragment>
        
  );
}

export default App;

