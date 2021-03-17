import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Events from './components/Events';
import CreatEvent from './components/CreateEvent';
import MyEvents from './components/MyEvents';
import PastEvent from './components/PastEvent';
import NewEvents from './components/NewEvents';
import Header from './components/Header';
import PrivateRoute from './components/Utils/PrivateRoute';
import PublicRoute from './components/Utils/PublicRoute';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import React, { useState } from 'react';
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {


  return (
    <BrowserRouter>

      <div className="wrapper">

        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path="/register" component={Register} />
          <Route path="/events" component={Events} />
          {/* <Events>
            <Route component={({ match }) =>
              <div>
                <Route path='/myevents' component={MyEvents} />
                <Route path='/pastevents' component={PastEvent} />
                <Route path='/newevents' component={NewEvents} />
                <Route path='/createvent' component={CreatEvent} />
              </div>
            } />
          </Events> */}

          {/* <Route path="/pastevents" component={PastEvent} />
          <Route path="/newevents" component={NewEvents} /> */}
          <Route path="/users" component={Users} />
          <Route path="/login" component={Login} />
          {/* <Route path="/createvent" component={CreatEvent} />
          <Route path="/myevents" component={MyEvents} /> */}
          {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
