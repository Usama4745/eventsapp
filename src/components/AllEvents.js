import { getUser, removeUserSession } from './Utils/Common';
import Header from './Header';
import EventCard from './EventCard';
import React, { useState, useEffect } from 'react';
import './events.css';
import CreatEvent from './CreateEvent';
import MyEvents from './MyEvents';
import PastEvent from './PastEvent';
import NewEvents from './NewEvents';
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';

export default function AllEvents(props) {
    const user = getUser();
    const [eventdata, setEvent] = useState();
    const ismyevent = 1;
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
                data.ismyevent = 0;
                setEvent(data)
            });
    }, []);

    return (
        <div>
            <div >
                <div >
                    {eventdata?.map((object, index) => (
                        <EventCard events={object} ismyevent={1} ispastevent={1} isnewevent={1} key={index}></EventCard>
                    ))}
                </div>

            </div>
        </div>




    );
}