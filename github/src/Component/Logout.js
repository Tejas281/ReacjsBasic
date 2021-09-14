import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

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
      <button
        onClick={() => {
          logoutHandler();
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
