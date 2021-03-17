import { getUser, removeUserSession } from './Utils/Common';
import Header from './Header';
import EventCard from './EventCard';
import React, { useState, useEffect } from 'react';
import './events.css';
import CreatEvent from './CreateEvent';
import MyEvents from './MyEvents';
import PastEvent from './PastEvent';
import NewEvents from './NewEvents';
import AllEvents from './AllEvents';
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';

export default function Events(props) {
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
                props.history.push('/events/allevents');

            });
    }, []);

    return (
        <div>
            <Header></Header>
            <div className="row">
                <div className="col-md-4">

                    <nav class="navbar navbar-light bg-light ">
                        <ul class="nav pillsnavs">
                            <li class="nav-item pillsnavs">
                                {user.data.isAdmin == "1" && (
                                    <Link to="/events/createevents" className="nav-link">
                                        Create New Event</Link>
                                )}
                            </li>
                            <li class="nav-item">
                                <Link to="/events/allevents" className="sidenavs nav-link active">
                                    Events</Link>

                            </li>
                            <li class="nav-item">
                                {user.data.isAdmin == "0" && (
                                    <Link to="/events/myevents" className="sidenavs nav-link">
                                        My Events</Link>
                                )}
                            </li>
                            <li class="nav-item">
                                {user.data.isAdmin == "0" && (
                                    <Link to="/events/pastevents" className="sidenavs nav-link">
                                        Past events</Link>
                                )}
                            </li>
                            <li class="nav-item">
                                {user.data.isAdmin == "0" && (
                                    <Link to="/events/newevents" className="sidenavs nav-link">
                                        New events</Link>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="col-md-6">
                    {/* {eventdata?.map((object, index) => (
                        <EventCard events={object} ismyevent={1} ispastevent={1} isnewevent={1} key={index}></EventCard>
                    ))} */}
                    <Switch>
                        <Route exact path="/events" />
                        <Route exact path="/events/newevents" component={NewEvents} />
                        <Route exact path="/events/createevents" component={CreatEvent} />
                        <Route exact path="/events/pastevents" component={PastEvent} />
                        <Route exact path="/events/myevents" component={MyEvents} />
                        <Route exact path="/events/allevents" component={AllEvents} />
                    </Switch>
                </div>

            </div>
        </div>




    );
}