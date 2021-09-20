import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import Logout from './Logout';
import Navbar from '../Layout/Navbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@material-ui/core/Button';
import { ClassNames } from '@emotion/react';
import Update from '../Pages/Update';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  const {
    email,
    password,
    firstName,
    lastName,
    date,
    gender,
    confirm_password,
    profilefile,
  } = users;
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users', {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        //console.log(res.data.token);
        // console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log('user Not Found', err);
      });
  }, []); // console.log(users);

  return (
    <>
      <Navbar />
      <div>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            size='small'
            stickyHeader
            aria-label='sticky table'
          >
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Profile Pic</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Confirm Password</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {user.firstName}
                  </TableCell>
                  <TableCell>{user.profilefile}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.date}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>{user.confirm_password}</TableCell>
                  <TableCell>
                    {' '}
                    <Button variant='contained' size='small' color='primary'>
                      <Update />
                    </Button>
                  </TableCell>
                  <TableCell>
                    {' '}
                    <Button variant='contained' size='small' color='secondary'>
                      secondary
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
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
