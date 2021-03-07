import React from 'react';
import { getUser, removeUserSession } from './Utils/Common';
import Header from './Header';

export default function Dashboard(props) {
  const user = getUser();

  console.log("dashboard");
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }
  return(
    <div>
      <Header></Header>
      Welcome {user.data.username}!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>  );
}