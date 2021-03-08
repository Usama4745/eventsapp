import { getUser, removeUserSession } from './Utils/Common';
import Header from './Header';
import EventCard from './EventCard';
import React, { useState, useEffect } from 'react';
import './events.css';

export default function Events(props) {
    const user = getUser();
    const [eventdata, setEvent] = useState();



    console.log("events");

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
            console.log("indside user effects and fetch")
            });
    }, []);

    return (
        <div>
            <Header></Header>
            {eventdata?.map((object, index) => (
                <EventCard events={object} key={index}></EventCard>
            ))}
        </div>);
}