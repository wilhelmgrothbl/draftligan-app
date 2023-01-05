import React from 'react'
import { getTeams } from '../../assets/teams';
import './lineup.css'



export default function lineup() {
    return (
        <div className='container-flex'>

            {getTeams.map((data, key) => {
                return (
                    <div>
                        <div className='row-test'>
                            <div className='card-01'>
                                 <div className='check'>
                                    <img className='img' src={data.img} alt="no image"></img>
                                    <p className='team-name'>{data.teamname} </p>
                                    <p className='team-coach'>{data.firstName} {data.lastName}</p>
                                </div> 
                                <div className='lineup'>
                                    <span className='gk'>{data.lineup.goalkeeper}</span>
                                    <span className='df'><p>{data.lineup.defender}</p></span>
                                    <span className='df2'><p>{data.lineup.defender2}</p></span>
                                    <span className='mf'><p>{data.lineup.midfielder1}</p></span>
                                    <span className='mf2'><p>{data.lineup.midfielder2}</p></span>
                                    <span className='mf3'><p>{data.lineup.midfielder3}</p></span>
                                    <span className='st'><p>{data.lineup.striker}</p></span>
                                    <span className='st1'><p>{data.lineup.striker1}</p></span>
                                    <div className='bench'>
                                        <p className='bench-title'>Bänken</p>
                                        <span className='subs'>{data.lineup.subs}</span>
                                    </div>

                                </div>
                            
                            </div>

                        </div>
                    </div>
                );
            })}
        </div>

    )
}

