import React from 'react';
import { getUser, removeUserSession } from './Utils/Common';
import Header from './Header';
import logo from '../assets/image/loginscreen.svg'; // Tell webpack this JS file uses this image

export default function EventCard(props) {
    const user = getUser();

    console.log("events data props");
    console.log(props.events)
    return (
        // <div className="card" style={{width:'400px'}} >
        //     <img className="card-img-top" src={`/image/${props.events.picurl}`} alt="Card image" style={{width:'100%'}}/>
        //         <div className="card-body">
        //             <h4 className="card-title">{props.events.name}</h4>
        //             <p className="card-text">{props.events.description}</p>
        //             <a href="#" className="btn btn-primary">Participate</a>
        //         </div>
        // </div>

        <div className="col-lg-3 col-sm-6">

            <div className="card hovercard">
                <div className="cardheader">
                <img className="card-img-top" src={`/image/${props.events.picurl}`} alt="Card image" style={{width:'100%'}}/>
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
                    <button className="btn-primary">Participate</button>
                </div>
            </div>

        </div>

    );
}