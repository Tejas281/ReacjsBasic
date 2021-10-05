import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from '../Store/Users';

const Dashboard = () => {
  const dispatch = useDispatch();
  
  const [auth, users] = useSelector((state) => [state.auth.user, state.users.users]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users", {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        dispatch(setUsers(res.data));
      })
      .catch((err) => {
        console.log("user Not Found", err);
      });
  }, []); 
  const handleSubmit = (userId) => {
    axios
      .delete(`http://localhost:5000/api/users/delete/${userId}`)
      .then((res) => {
        console.log("Data Remove", res.data);
        dispatch(setUsers(users.filter((single) => single._id !== userId)));
      })
      .catch((err) => {
        console.log("user Not Found", err);
      });
  };

  console.log({ auth });

  return (
    <>
      <Navbar />
      <div>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            size="small"
            stickyHeader
            aria-label="sticky table"
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
                <TableCell>Update</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users &&
                users?.map((user, i) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={i}
                  >
                    <TableCell component="th" scope="row">
                      {user.firstName}
                    </TableCell>
                    <TableCell>{user.profilefile}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.date}</TableCell>
                    <TableCell>{user.password}</TableCell>
                    <TableCell>
                      <div>
                        <Link
                          to={`/update/${user?._id}`}
                          className="col-sm d-flex btn"
                          key={i}
                          underline="hover"
                        >
                          {"Update"}
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell>
                      {" "}
                      {auth?._id !== user?._id && (
                        <Button
                          variant="contained"
                          onClick={() => handleSubmit(user._id)}
                          disabled={users?.token}
                        >
                          Delete
                        </Button>
                      )}
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
