import React from 'react';
import { getUser, removeUserSession } from './Utils/Common';
import { Users } from './Users';
import { Link } from 'react-router-dom';
export default function Header(props) {
    const user = getUser();

    var isadmin=false;
    if(user.data.isAdmin=="1"){
        isadmin=true
    }
    return (
        <div className="container-fluid">
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>

                    <div className="collapse navbar-collapse" id="navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/">Home</Link></li>
                            { isadmin ? <li><Link to="/users">Users</Link></li> : null }
                        </ul>

                    </div>
                </div>
            </nav>

        </div>
    );
}






