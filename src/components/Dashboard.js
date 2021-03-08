import React from 'react';
import { getUser, removeUserSession } from './Utils/Common';
import Header from './Header';
import event from '../assets/image/events.svg'; // Tell webpack this JS file uses this image
import user from '../assets/image/user.svg'; // Tell webpack this JS file uses this image
import { Link } from 'react-router-dom';
import './dashboard.css';

export default function Dashboard(props) {
  const user = getUser();

  console.log("dashboard");
  if (user == null) {
    console.log("inside null")
    props.history.push('/login');
    return (<div>
    </div>);
  }
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }
  return (
    <div>
      <Header></Header>
      {user.data.isAdmin == "1" && (
        <div>

          <h1>Event Overview - Admin</h1>
          <h2>This is the event overview. You are logged in as an admin</h2>
        </div>

      )}
      {user.data.isAdmin == "0" && (
        <div>

          <h1>Event Overview - User</h1>
          <h2>This is the event overview. You are logged in as a user</h2>
        </div>

      )}


      <Link to="/events">
        <div className="col-lg-3 col-sm-6">

          <div className="card hovercard">
            <div className="cardheader"
              style={{
                backgroundImage: `url(/image/events.svg)`,
                backgroundSize: 'cover',
                height: '135px'
              }}
            >
            </div>

            <div className="info">
              <div className="title">
                <h4 className="card-title">Events</h4>
              </div>
            </div>
            <div >

            </div>
          </div>

        </div>
      </Link>
      {user.data.isAdmin == "1" && (

        <div className="col-lg-3 col-sm-6">

          <div className="card hovercard">
            <div className="cardheader"
              style={{
                backgroundImage: `url(/image/user.svg)`,
                backgroundSize: 'cover',
                height: '135px'
              }}
            >
            </div>

            <div className="info">
              <div className="title">
                <h4 className="card-title">User</h4>
              </div>
            </div>
            <div >

            </div>
          </div>

        </div>

      )}


      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}