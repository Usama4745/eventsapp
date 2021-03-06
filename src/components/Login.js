import logo from '../assets/image/loginscreen.svg'; // Tell webpack this JS file uses this image
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { removeUserSession, setUserSession } from './Utils/Common';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


function Login(props) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();


    const handleSubmit = async e => {
        e.preventDefault();
        return fetch('http://localhost:8080/api/authentication/login', {
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
                username,
                password
            })
        })
            .then(response => response.json())
            .then(data => {
                if(data.status==true){
                    setUserSession(data)
                    props.history.push('/');
                    toast("successfully logged in");
                }else{
                    toast(data.message);

                }

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
                    <div className="loginform col-lg-6">
                        <div className="card2 border-0 px-4 py-5">
                            <form onSubmit={handleSubmit}>
                                <div className="row px-3"> <label className="mb-1">
                                    <h6 className="mb-0 text-sm">Username</h6>
                                </label> <input className="mb-4" type="text" onChange={e => setUserName(e.target.value)} name="username" placeholder="Enter a valid username" /> </div>
                                <div className="row px-3"> <label className="mb-1">
                                    <h6 className="mb-0 text-sm">Password</h6>
                                </label> <input type="password" onChange={e => setPassword(e.target.value)} name="password" placeholder="Enter password" /> </div>
                                <div className="row mb-3 px-3">
                                    <button type="submit" className="btn btn-blue text-center loginbtn">Login</button>
                                </div>
                            </form>
                            <div className="row mb-3 px-3">
                                <Link to={'/register'} className="btn btn-blue text-center">
                                    Register
                                    </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />

        </div>
    );
}

export default Login;
