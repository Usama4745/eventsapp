import React from 'react';
import { getUser, removeUserSession } from './Utils/Common';
import Header from './Header';
import logo from '../assets/image/loginscreen.svg'; // Tell webpack this JS file uses this image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function EventCard(props) {
    const user = getUser();
    const userid = user.data.id;
    var isToggle = true;
    console.log("props eventcard");
    console.log(props);
    if (props.events.registered_users != null) {
        console.log(Object.values(JSON.parse(props.events.registered_users)).indexOf(user.data.id));
    }
    console.log(new Date(props.events.end_date))

    if (new Date(props.events.end_date) > new Date()) {
        console.log("true");
        console.log(new Date(props.events.end_date))
    }
    async function handleParticipate(event,id) {
        console.log(event.target.style);
        event.target.style.display='none';
        isToggle = false;
        fetch('http://localhost:8080/api/events/updatereg', {
            method: 'PUT',
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
        <div className="row">
            {props.ismyevent == 1 && props.ispastevent == 1 && props.isnewevent == 1 && (
                <div >

                    <div className="card hovercard cardcontainer cardtext">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="cardheader"
                                    style={{
                                        background: `url(/image/${props.events.picurl}) no-repeat`,
                                        backgroundSize: 'contain',
                                        height: '135px',
                                        float: 'left',
                                        width: '135px'
                                    }}
                                >
                                </div>
                            </div>
                            <div className="col-md-9"
                                style={{
                                    float: 'right',
                                    textAlign: 'justify'
                                }}
                            >
                                <div >
                                    <h4 >{props.events.name}</h4>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div><i class="fa fa-calendar" style={{ margin: '5px' }}></i>
                                            {new Date(props.events.begin_date).toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div ><i class="fa fa-map-marker" style={{ margin: '5px' }}></i>{props.events.industry}</div>
                                    </div>
                                </div>
                                <div >{props.events.description}</div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div ><i class="fa fa-map-marker" style={{ margin: '5px' }}></i> {props.events.location}</div>
                                        {/* <div >end date: {props.events.end_date}</div> */}
                                    </div>
                                    <div className="col-md-6">

                                        {user.data.id == props.events.user_id && (
                                            <div >registered users: {props.events.registered_users == null ? 0 : Object.values(JSON.parse(props.events.registered_users)).length}</div>
                                        )}
                                        <div >

                                            {isToggle && user.data.id != props.events.user_id && (new Date(props.events.end_date)) > (new Date()) &&
                                                (props.events.registered_users != null ? Object.values(JSON.parse(props.events.registered_users)).indexOf(user.data.id) == -1 : true)
                                                && (
                                                    <button style={{display: isToggle ? 'block': 'none'}}
                                                    
                                                    onClick={(event) => handleParticipate(event,props.events.id)} className="btn-primary">Participate</button>
                                                )}
                                            {props.events.registered_users != null && Object.values(JSON.parse(props.events.registered_users)).indexOf(user.data.id) > -1 && (
                                                <div >Participated!!</div>
                                            )}
                                            {(new Date(props.events.end_date)) < (new Date()) && (
                                                <div >Event Passed!!</div>

                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            )}
            {props.ismyevent == 0 && props.ispastevent == 1 && props.isnewevent == 1 && props.events.registered_users != null && Object.values(JSON.parse(props.events.registered_users)).indexOf(user.data.id) > -1 && (
                <div>

                    <div className="card hovercard cardcontainer cardtext">
                        <div className="row">

                            <div className="col-md-3">

                                <div className="cardheader"
                                    style={{
                                        backgroundImage: `url(/image/${props.events.picurl})`,
                                        backgroundSize: 'cover',
                                        height: '135px'
                                    }}
                                >
                                </div>
                            </div>
                            <div className="col-md-9"
                                style={{
                                    float: 'right',
                                    textAlign: 'justify'
                                }}>
                                <div>
                                    <h4 >{props.events.name}</h4>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div><i class="fa fa-calendar" style={{ margin: '5px' }}></i>
                                            {new Date(props.events.begin_date).toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div ><i class="fa fa-map-marker" style={{ margin: '5px' }}></i>{props.events.industry}</div>
                                    </div>
                                </div>

                                <div >{props.events.description}</div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div ><i class="fa fa-map-marker" style={{ margin: '5px' }}></i> {props.events.location}</div>
                                        {/* <div >end date: {props.events.end_date}</div> */}
                                    </div>
                                    <div className="col-md-6">


                                        {props.events.registered_users != null && Object.values(JSON.parse(props.events.registered_users)).indexOf(user.data.id) > -1 && (
                                            <div >Participated!!</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}
            {(new Date(props.events.end_date)) < (new Date()) && props.ismyevent == 1 && props.ispastevent == 0 && props.isnewevent == 1 && (
                <div>

                    <div className="card hovercard cardcontainer cardtext" >
                        <div className="row">
                            <div className="col-md-3">

                                <div className="cardheader"
                                    style={{
                                        backgroundImage: `url(/image/${props.events.picurl})`,
                                        backgroundSize: 'cover',
                                        height: '135px'
                                    }}
                                >
                                </div>
                            </div>

                            <div className="col-md-9"
                                style={{
                                    float: 'right',
                                    textAlign: 'justify'
                                }}>
                                <div>
                                    <h4 >{props.events.name}</h4>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div><i class="fa fa-calendar" style={{ margin: '5px' }}></i>
                                            {new Date(props.events.begin_date).toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div ><i class="fa fa-map-marker" style={{ margin: '5px' }}></i>{props.events.industry}</div>
                                    </div>
                                </div>

                                <div>{props.events.description}</div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div ><i class="fa fa-map-marker" style={{ margin: '5px' }}></i> {props.events.location}</div>
                                        {/* <div >end date: {props.events.end_date}</div> */}
                                    </div>
                                    <div className="col-md-6">


                                        {props.events.registered_users != null && Object.values(JSON.parse(props.events.registered_users)).indexOf(user.data.id) > -1 && (
                                            <div >Participated!!</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            )}
            {(new Date(props.events.begin_date)) > (new Date()) && props.ismyevent == 1 && props.ispastevent == 1 && props.isnewevent == 0 && (
                <div>

                    <div className="card hovercard cardcontainer cardtext">
                        <div className="row">
                            <div className="col-md-3">

                                <div className="cardheader"
                                    style={{
                                        backgroundImage: `url(/image/${props.events.picurl})`,
                                        backgroundSize: 'cover',
                                        height: '135px'
                                    }}
                                >
                                </div>
                            </div>
                            <div className="col-md-9"
                                style={{
                                    float: 'right',
                                    textAlign: 'justify'
                                }}>
                                <div >
                                    <h4 >{props.events.name}</h4>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div><i class="fa fa-calendar" style={{ margin: '5px' }}></i>
                                            {new Date(props.events.begin_date).toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div ><i class="fa fa-map-marker" style={{ margin: '5px' }}></i>{props.events.industry}</div>
                                    </div>
                                </div>

                                <div>{props.events.description}</div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div ><i class="fa fa-map-marker" style={{ margin: '5px' }}></i> {props.events.location}</div>
                                        {/* <div >end date: {props.events.end_date}</div> */}
                                    </div>
                                    <div className="col-md-6">

                                        {user.data.id != props.events.user_id &&
                                            (props.events.registered_users != null ? Object.values(JSON.parse(props.events.registered_users)).indexOf(user.data.id) == -1 : true)
                                            && (
                                                <button           style={{display: isToggle ? 'block': 'none'}}
                                                onClick={() => handleParticipate(props.events.id)} className="btn-primary">Participate</button>
                                            )}
                                        {props.events.registered_users != null && Object.values(JSON.parse(props.events.registered_users)).indexOf(user.data.id) > -1 && (
                                            <div >Participated!!</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}