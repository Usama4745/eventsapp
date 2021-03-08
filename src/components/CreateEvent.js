import logo from '../assets/image/loginscreen.svg'; // Tell webpack this JS file uses this image
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { removeUserSession, setUserSession } from './Utils/Common';
import { useHistory } from "react-router-dom";
import { Header } from './Header'

function Createvent(props) {
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [picurl, setPicurl] = useState();
    const [industry, setIndustry] = useState();
    const [userid, setUserid] = useState();
    const [location, setLocation] = useState();
    const [begin_date, setBegin_date] = useState();
    const [end_date, setEnd_date] = useState();
    const history = useHistory();


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
                userid,
                location,
                begin_date,
                end_date
            })
        })
            .then(response => response.json())
            .then(data => {
                props.history.push('/events');
            });
    }
    return (
        <div >
            <Header></Header>
            <div className="wrap">
                <div className="floatleft">
                    <span className="helper"></span>

                    <img src={logo} className="img-fluid loginimg" alt="" />
                </div>
                <div className="floatright">
                    <div className="col-lg-6">
                        <div className="card2 card border-0 px-4 py-5">
                            <form onSubmit={handleSubmit}>
                                <div className="row px-3"> <label className="mb-1">
                                    <h6 className="mb-0 text-sm">Username</h6>
                                </label> <input className="mb-4" type="text" onChange={e => setName(e.target.value)} name="username" placeholder="Enter a valid username" /> </div>
                                <div className="row px-3">
                                    <label className="mb-1">
                                        <h6 className="mb-0 text-sm">Password</h6>
                                    </label>
                                    <input type="text" onChange={e => setDescription(e.target.value)} name="description" placeholder="Enter password" />
                                </div>
                                <div className="row px-3">
                                    <label className="mb-1">
                                        <h6 className="mb-0 text-sm">Password</h6>
                                    </label>
                                    <input type="text" onChange={e => setIndustry(e.target.value)} name="password" placeholder="Enter password" />
                                </div>
                                <div className="row px-3">
                                    <label className="mb-1">
                                        <h6 className="mb-0 text-sm">Password</h6>
                                    </label>
                                    <input type="text" onChange={e => setLocation(e.target.value)} name="password" placeholder="Enter password" />
                                </div>
                                <div className="row px-3">
                                    <label className="mb-1">
                                        <h6 className="mb-0 text-sm">Password</h6>
                                    </label>
                                    <input type="text" onChange={e => setPassword(e.target.value)} name="password" placeholder="Enter password" />
                                </div>
                                <div className="row px-3">
                                    <label className="mb-1">
                                        <h6 className="mb-0 text-sm">Password</h6>
                                    </label>
                                    <input type="text" onChange={e => setPassword(e.target.value)} name="password" placeholder="Enter password" />
                                </div>
                                <div className="row mb-3 px-3">
                                    <button type="submit" className="btn btn-blue text-center loginbtn">Create Event</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
