import React from 'react';
import { getUser, removeUserSession } from './Utils/Common';

export default function Users(props) {
    const user = getUser();

    const handleLogout = () => {
        console.log("user");
        console.log(user);
        removeUserSession();
        props.history.push('/login');
    }
    return (
        <div>

      Welcome to users!<br /><br />

        </div>);
}