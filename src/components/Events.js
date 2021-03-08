import { getUser, removeUserSession } from './Utils/Common';
import Header from './Header';
import EventCard from './EventCard';
import React, { useState, useEffect } from 'react';
import './events.css';
import { Link } from 'react-router-dom';

export default function Events(props) {
    const user = getUser();
    const [eventdata, setEvent] = useState();
    const ismyevent=1;
    useEffect(function effectFunction() {
        fetch('http://localhost:8080/api/events/eventall', {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*',
                'Authorization': 'Basic YWRtaW46MTIzNA==',
                'X-API-KEY': 'EVENTAPP@123',
                'Content-Type': 'application/json; charset=utf-8'
            },
        })
            .then(response => response.json())
            .then(data => {
                data.ismyevent=0;
                setEvent(data)
            });
    }, []);

    return (
        <div>
            <Header></Header>
            {user.data.isAdmin == "1" && (
                <Link to="/createvent" className="btn-primary">
                    Create New Event</Link>
            )}
            {user.data.isAdmin == "0" && (
                <Link to="/myevents" className="btn-primary">
                    My Events</Link>
            )}
            <div>
                {eventdata?.map((object, index) => (
                    <EventCard events={object} ismyevent={1} key={index}></EventCard>
                ))}
            </div>
        </div>);
}