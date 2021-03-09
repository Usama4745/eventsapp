import { getUser, removeUserSession } from './Utils/Common';
import Header from './Header';
import EventCard from './EventCard';
import React, { useState, useEffect } from 'react';
import './events.css';
import { Link } from 'react-router-dom';

export default function PastEvents(props) {
    const [eventdata, setEvent] = useState();
    const user = getUser();

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
                setEvent(data)
            });
    }, []);

    return (
        <div>
            <Header></Header>
            {user.data.isAdmin == "0" && (
                <Link to="/myevents" className="btn-primary margin">
                    My Events</Link>
            )}
            {user.data.isAdmin == "0" && (
                <Link to="/pastevents" className="btn-primary margin">
                    Past events</Link>
            )}
            {user.data.isAdmin == "0" && (
                <Link to="/newevents" className="btn-primary margin">
                    New events</Link>
            )}
            <div>
                {eventdata?.map((object, index) => (
                    <EventCard events={object} ismyevent={1} ispastevent={1} isnewevent={0} key={index}></EventCard>
                ))}
            </div>
        </div>);
}