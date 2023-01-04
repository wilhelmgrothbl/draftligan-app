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
                        <div className='row'>
                            <div className='paper-card'>
                        <Paper className='paper-teams' elevation={3}>
                            <div className='team-name-container'>
                            <span className='team-name'>{data.teamname} </span>   
                            <p className='team-name-profile'>{data.firstName} {data.lastName}</p>                                                                                       
                            </div>                                                                                                            
                            <div className='lineup'>
                                <span className='gk'><p>{data.lineup.goalkeeper}</p></span>
                                <span className='df'><p>{data.lineup.defender}</p></span>
                                <span className='mf'><p>{data.lineup.midfielder1}</p></span>
                                <span className='mf2'><p>{data.lineup.midfielder2}</p></span>
                                <span className='st'><p>{data.lineup.striker}</p></span>
                            </div>
                            <div className='bench'>
                                <p>Bänken:</p>
                                <span className='subs'>{data.lineup.subs}</span>

                            </div>
                        </Paper>
                            </div>
                        </div>
                    </div>
                );
            })}s
        </div>

    )
}

