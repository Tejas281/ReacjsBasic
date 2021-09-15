import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import Logout from './Logout';
const Dashboard = () => {
  // const user = JSON.parse(localStorage.getItem('token'));
  const [users, setUsers] = useState([]);
  // const token = user.token.id;
  // const {
  //   email,
  //   password,
  //   firstName,
  //   lastName,
  //   date,
  //   gender,
  //   confirm_password,
  // } = users;
  // const token = localStorage.getItem('token');

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:5000/api/auth', {
  //       headers: { Authorization: `${token}` },
  //     })
  //     .then((res) => {
  //       //console.log(res.data.token);
  //       // console.log(res.data);
  //       setUsers(res.data);
  //     })
  //     .catch((err) => {
  //       console.log('user Not Found', err);
  //     });
  // }, []);

  console.log(users);
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
// //
// // useEffect(() => {
// //   axios.get('http://localhost:5000/api/auth/:id').then((res) => {});
// // });

// // const [users, setUsers] = useState([]);
// // useEffect(() => {
// //   if (localStorage.getItem('token')) {
// //     const fetchProduct = async () => {
// //       const { data } = await axios.get('http://localhost:5000/api/auth/:id');
// //       setUsers(data);
// //     };
// //     fetchProduct();
// //   } else {
// //     console.log('token is not fetch');
// //   }
// // // }, []);
// // const setToken = (key, value) => {
// //   return Promise.resolve().then(() => {
// //     console.log('setting token');
// //     localStorage.setItem(key, value);
// //     console.log('token set');
// //   });
// // };
// // const [users, setUsers] = useState({ email: '', password: '' });

// // //const token = sessionStorage.setItem('token', JSON.stringify(token));
// // const api = 'http://localhost:5000/api/auth';
// // //  const [users, setUsers] = useState([]);
// // const token = JSON.parse(localStorage.getItem('data'));
// //token = users.data.id;
// //const history = useHistory();
// // //  console.log('user', users);

// //
// const [users, setUsers] = useState();
// //const [tokens, setTokens] = useState();
// // const user = JSON.parse(sessionStorage.getItem('data'));
// // const token = user.data.id;
// //const { email, password } = users;

// const { id } = useParams;
// // const { ids } = users;
// const token = localStorage.getItem('token');

// useEffect(() => {
//   axios
//     .get('http://localhost:5000/api/auth', {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((res) => {
//       console.log('id is found', token);
//       console.log('user found', res.data);
//     })
//     .catch((err) => {
//       console.log('users not found', err);
//     });
// }, []);

//axios.get(`http://localhost:5000/api/users/${id}`);
