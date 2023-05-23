import React, { useState } from 'react';
import Profiles from './profiles';
import { Standings } from '../../assets/database';
import { gameweek } from '../../assets/database';

export default function Leaderboard() {
  const [period] = useState(0);

  function between(data, between) {
    const today = new Date();
    const previous = new Date(today);
    previous.setDate(previous.getDate() - (between + 1));

    let filter = data.filter(val => {
      let userDate = new Date(val.dt);
      if (between === 0) return val;
      return previous <= userDate && today >= userDate;
    });

    return filter.sort((a, b) => b.score - a.score); // Uppdaterad sorteringslogik
  }

  return (
    <div className="bg-gradient-to-r from-indigo-900 to-red-500 min-h-screen">
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-center text-white text-3xl p-5 sm:p-10">Totalställning efter omgång {gameweek.gw}</h1>
      <Profiles Standings={between(Standings, period)}></Profiles>
      <div className="flex justify-center">
        <img className="h-32 sm:h-52" src="./././efterkloka.png" alt="här var det en ko" />
      </div>
    </div>
  </div>
  );
}
