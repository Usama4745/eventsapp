import logo from '../assets/image/loginscreen.svg'; // Tell webpack this JS file uses this image
import events from '../assets/image/events.svg'; // Tell webpack this JS file uses this image
import React, { useState,useEffect } from 'react';
import { getUser, removeUserSession } from './Utils/Common';
import PropTypes from 'prop-types';
import '../App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Header from './Header';
import { ToastContainer, toast } from 'react-toastify';

function CreatEvent(props) {
    const user = getUser();

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [picurl, setPicurl] = useState();
    const [industry, setIndustry] = useState();
    const [user_id, setUserid] = useState();
    const [location, setLocation] = useState();
    const [begin_date, setBegin_date] = useState();
    const [end_date, setEnd_date] = useState();
    const history = useHistory();

    useEffect(function effectFunction() {
        setPicurl("events.svg");
        setBegin_date("2021-04-15");
        setEnd_date("2021-04-16");
        setUserid(user.data.id);

    }, []);
    const handleSubmit = async e => {
        e.preventDefault();
        return fetch('http://localhost:8080/api/events/addevent', {
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
                name,
                description,
                picurl,
                industry,
                user_id,
                location,
                begin_date,
                end_date
            })
        })
            .then(response => response.json())
            .then(data => {
                if(data.status==true){
                    props.history.push('/events');

                }else{
                    toast(data.message);

                }
            });
    }
    return (
        <div >
            <Header></Header>
            <div className="wrap">
                <div className="floatleft">
                    <span className="helper"></span>

                    <img src={events} className="img-fluid loginimg" alt="" />
                </div>
                <div className="floatright">
                    <div className="loginform col-lg-6">
                        <div className="card2 border-0 px-4 py-5">
                            <form onSubmit={handleSubmit}>
                                <div className="row px-3"> <label className="mb-1">
                                    <h6 className="mb-0 text-sm">Name</h6>
                                </label> <input className="mb-4" type="text" onChange={e => setName(e.target.value)} name="name" placeholder="Enter name" /> </div>
                                <div className="row px-3">
                                    <label className="mb-1">
                                        <h6 className="mb-0 text-sm">Description</h6>
                                    </label>
                                    <input type="text" onChange={e => setDescription(e.target.value)} name="description" placeholder="Enter description" />
                                </div>
                                <div className="row px-3">
                                    <label className="mb-1">
                                        <h6 className="mb-0 text-sm">Industry</h6>
                                    </label>
                                    <input type="text" onChange={e => setIndustry(e.target.value)} name="industry" placeholder="Enter industry" />
                                </div>
                                <div className="row px-3">
                                    <label className="mb-1">
                                        <h6 className="mb-0 text-sm">Location</h6>
                                    </label>
                                    <input type="text" onChange={e => setLocation(e.target.value)} name="location" placeholder="Enter location" />
                                </div>

                                <div className="row mb-3 px-3">
                                    <button type="submit" className="btn btn-blue text-center loginbtn">Create Event</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
}

export default CreatEvent;
