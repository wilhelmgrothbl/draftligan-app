import React from 'react'
import Paper from "@mui/material/Paper";
import { getTeams } from '../../assets/teams';
import './lineups.css'

export default function lineups() {



    return (
        <div className='image'>        
             {getTeams.map((data, key) => {
            return (
                <div className='container' key={key}>
                    <Paper className='paper-teams' elevation={3}>
                        <article>
                            <span className='team-name'>{data.teamname}</span>
                          
                                <p><strong>{data.firstName} {data.lastName}</strong></p>
                          
                            <div className='lineup'>
                                <span className='gk'><p>{data.lineup.goalkeeper}</p></span>
                                <span className='df'><p>{data.lineup.defender}</p></span>
                                <span className='mf'><p>{data.lineup.midfielder} </p></span>
                                <span className='st'><p>{data.lineup.striker}</p></span>
                                <br></br><br></br>
                                <p>Bänken:</p>
                            <span className='subs'>{data.lineup.subs}</span>
                            </div>
                        </article>
                    </Paper>
                </div>
            );
        })}
        </div>

    )
}

