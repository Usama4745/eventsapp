import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Events from './components/Events';
import PrivateRoute from './components/Utils/PrivateRoute';
import PublicRoute from './components/Utils/PublicRoute';


import React, { useState } from 'react';
import {Link,BrowserRouter , Route, Switch } from 'react-router-dom';

function App() {

 
  return (
    <BrowserRouter>
    <div className="wrapper">
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/events" component={Events} />
          <Route path="/users" component={Users} />
          <PublicRoute path="/login" component={Login} />
          {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
        </Switch>
    </div>
    </BrowserRouter>

  );
}

export default App;
