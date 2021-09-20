import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
function getUser() {
  return localStorage.getItem('token');
}
function Logout() {
  const history = useHistory();
  const [user, setUser] = useState(getUser);
  const logoutHandler = () => {
    localStorage.removeItem('token');
    setUser(user);
    history.push('/');
  };
  return (
    <div>
      <ExitToAppIcon
        onClick={() => {
          logoutHandler();
        }}
      ></ExitToAppIcon>
    </div>
  );
}

export default Logout;
