import React, { useState, useEffect } from 'react';
//import axios from 'axios';
//import { useHistory } from 'react-router-dom';
import Logout from './Logout';
const Dashboard = () => {
  // const history = useHistory();
  // // const api = 'http://localhost:5000/api/auth';
  // useEffect(() => {
  //   if (!localStorage.getItem('token')) {
  //     props.history.push('/login');
  //     console.log('token not found!');
  //   }
  // }, []);
  // const handleChange = (e) => {
  //   e.preventDefault();
  //   const token = localStorage.getItem('data');
  //   axios
  //     .get(api, { headers: { Authorization: `Bearer ${token}` } })
  //     .then((res) => {
  //       alert('Welcome', res.data);
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       alert('Error', err.res.data);
  //     });

  //   console.log('Token', token);
  // };

  return (
    <div>
      <form>
        <h1>Hello Dashboard </h1>
        <Logout />
      </form>
    </div>
  );
};

export default Dashboard;
