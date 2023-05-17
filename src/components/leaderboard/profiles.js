import React from 'react'



export default function Profiles({ Standings }) {
  return (
    <div className="App" id="main">
      <div id="profile">
        {Standings.map((value, index) => (
          <div className="flex" key={index}>
            <div className="item">
              <img src={value.img} alt="här var det en ko" />

              <div className="info-profile">
                <p className="name-title">{value.name}</p>
                <span className="team-lower-title">{value.team}</span>
              </div>
            </div>
            <div className="item text-white">
              <span>{value.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
