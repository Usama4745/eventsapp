import React from 'react';
import { getUser, removeUserSession } from './Utils/Common';
import Header from './Header';
import logo from '../assets/image/loginscreen.svg'; // Tell webpack this JS file uses this image

export default function EventCard(props) {
    const user = getUser();
    const userid=user.data.id;
    const handleParticipate = async (id) => {
        return fetch('http://localhost:8080/api/events/updatereg', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*',
                'Authorization': 'Basic YWRtaW46MTIzNA==',
                'X-API-KEY': 'EVENTAPP@123',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                id,
                userid
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });
    }
    return (
       
        <div className="col-lg-3 col-sm-6">

            <div className="card hovercard">
                <div className="cardheader"
                style={{  
                    backgroundImage: `url(/image/${props.events.picurl})`,
                    backgroundSize: 'cover',
                    height: '135px'
                  }}
                >
                </div>

                <div className="info">
                    <div className="title">
                        <h4 className="card-title">{props.events.name}</h4>
                    </div>
                    <div className="desc">{props.events.description}</div>
                    <div className="desc">Location: {props.events.location}</div>
                    <div className="desc">Industry: {props.events.industry}</div>
                </div>
                <div >
                    
                {user.data.id!=props.events.user_id && (
                    <button onClick={handleParticipate(props.events.id)} className="btn-primary">Participate</button>
                    )}
                </div>
            </div>

        </div>

    );
}