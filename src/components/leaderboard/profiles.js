import React from 'react'
import './leaderboard.css';


export default function profiles({ Standings }) {
  return (
    <div className='App' id="main">
        <div id='profile'>
            {Item(Standings)}
        </div>
        </div>
  )
}

function Item(data){
    return (

        <>
            {
                data.map((value, index) => (
                    <div className="flex"  key={index}>
                        <div className="item">
                            <img src={value.img} alt="här var det en ko" />
            
                            <div className="info-profile">
                                <p className='name-title'>{value.name}</p>    
                                <span className='team-lower-title'>{value.team}</span>
                            </div>                
                        </div>
                        <div className="item">
                            <span >{value.score}</span>
                        </div>
                    </div>
                    )
                )
                
            }
        </>

        
    )
}