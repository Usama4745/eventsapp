import logo from '../assets/image/registerscreen.svg'; // Tell webpack this JS file uses this image
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { Link } from 'react-router-dom';

async function registerUser(credentials) {
    console.log("credentials")
    console.log(credentials)
    console.log(JSON.stringify(credentials))
    return fetch('http://localhost:8080/api/authentication/registration', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*',
            'Authorization': 'Basic YWRtaW46MTIzNA==',
            'X-API-KEY': 'EVENTAPP@123',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json(), function (data) {
            console.log(data);
        })
}

function Register() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [address, setAddress] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await registerUser({
            username,
            password,
            name,
            address
        });
    }
    return (
        <div >
            <div className="wrap">
                <div className="floatleft">
                    <span className="helper"></span>

                    <img src={logo} className="img-fluid loginimg" alt="" />
                </div>
                <div className="floatright">
                    <div className="col-lg-6">
                        <div className="card2 card border-0 px-4 py-5">
                            <form onSubmit={handleSubmit}>

                                <div className="row px-3">
                                    <label className="mb-1">
                                        <h6 className="mb-0 text-sm">Name</h6>
                                    </label>
                                    <input className="mb-4" type="text" onChange={e => setName(e.target.value)} name="name" placeholder="Enter a valid name" />
                                </div>
                                <div className="row px-3">
                                    <label className="mb-1">
                                        <h6 className="mb-0 text-sm">Username</h6>
                                    </label>
                                    <input className="mb-4" type="text" onChange={e => setUserName(e.target.value)} name="username" placeholder="Enter a valid username" />
                                </div>
                                <div className="row px-3">
                                    <label className="mb-1">
                                        <h6 className="mb-0 text-sm">Address</h6>
                                    </label>
                                    <input className="mb-4" type="text" onChange={e => setAddress(e.target.value)} name="username" placeholder="Enter a valid username" />
                                </div>
                                <div className="row px-3">
                                    <label className="mb-1">
                                        <h6 className="mb-0 text-sm">Password</h6>
                                    </label> <input type="password" onChange={e => setPassword(e.target.value)} name="password" placeholder="Enter password" /> </div>
                                <div className="row mb-3 px-3">
                                    <button type="submit" className="btn btn-blue text-center loginbtn">Register</button>
                                </div>
                                <div className="row mb-3 px-3">
                                    <Link to={'/login'} className="btn btn-blue text-center">

                                        Login
                                        </Link>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
